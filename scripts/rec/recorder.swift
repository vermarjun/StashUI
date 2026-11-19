import Foundation
import AppKit
import ScreenCaptureKit
import AVFoundation

// Records one window (by CGWindowID) with the real pointer, no audio.
// usage: recorder --list <titleFragment>
//        recorder <windowID> <out.mp4>     (stops on a newline on stdin)

final class RecordingDelegate: NSObject, SCRecordingOutputDelegate, SCStreamDelegate, @unchecked Sendable {
    var finished = false
    var failed = false
    func recordingOutputDidStartRecording(_ r: SCRecordingOutput) { print("RECORDING"); fflush(stdout) }
    func recordingOutput(_ r: SCRecordingOutput, didFailWithError error: Error) { failed = true; finished = true; print("FAILED \(error.localizedDescription)"); fflush(stdout) }
    func recordingOutputDidFinishRecording(_ r: SCRecordingOutput) { finished = true; print("FINISHED"); fflush(stdout) }
    func stream(_ s: SCStream, didStopWithError error: Error) { failed = true; print("STREAM_ERROR \(error.localizedDescription)"); fflush(stdout) }
}

@main struct Recorder {
    static func main() async {
        do {
            let content = try await SCShareableContent.excludingDesktopWindows(true, onScreenWindowsOnly: false)
            let args = CommandLine.arguments
            if args.count == 3 && args[1] == "--list" {
                for w in content.windows where (w.title ?? "").contains(args[2]) {
                    print("WINDOW \(w.windowID) \(w.owningApplication?.bundleIdentifier ?? "?") \(Int(w.frame.origin.x)),\(Int(w.frame.origin.y)) \(Int(w.frame.width))x\(Int(w.frame.height)) \(w.title ?? "")")
                }
                return
            }
            guard args.count == 3, let id = UInt32(args[1]), let window = content.windows.first(where: { $0.windowID == id }) else {
                throw NSError(domain: "capture", code: 1, userInfo: [NSLocalizedDescriptionKey: "window not found"])
            }
            guard !FileManager.default.fileExists(atPath: args[2]) else {
                throw NSError(domain: "capture", code: 2, userInfo: [NSLocalizedDescriptionKey: "refusing to overwrite"])
            }
            let scale = NSScreen.main?.backingScaleFactor ?? 2
            let config = SCStreamConfiguration()
            config.width = Int(window.frame.width * scale) / 2 * 2
            config.height = Int(window.frame.height * scale) / 2 * 2
            config.minimumFrameInterval = CMTime(value: 1, timescale: 60)
            config.queueDepth = 6
            config.showsCursor = false  // the page draws its own cursor
            config.capturesAudio = false
            config.ignoreShadowsSingleWindow = true
            config.captureResolution = .best
            let delegate = RecordingDelegate()
            let stream = SCStream(filter: SCContentFilter(desktopIndependentWindow: window), configuration: config, delegate: delegate)
            let out = SCRecordingOutputConfiguration()
            out.outputURL = URL(fileURLWithPath: args[2])
            out.outputFileType = .mp4
            out.videoCodecType = .h264
            try stream.addRecordingOutput(SCRecordingOutput(configuration: out, delegate: delegate))
            print("WINDOW \(id) NATIVE \(config.width)x\(config.height)"); fflush(stdout)
            try await stream.startCapture()
            // Stop on: a newline on stdin (normal), SIGTERM/SIGINT, or the parent
            // process dying. Always stop the stream cleanly: a capture session
            // that is never stopped stays alive inside replayd and, once enough
            // pile up, no new recording can start until replayd restarts.
            let parent = getppid()
            signal(SIGTERM, SIG_IGN)
            signal(SIGINT, SIG_IGN)
            let stop = AsyncStream<Void> { cont in
                Task.detached { _ = readLine(); cont.yield() }
                for sig in [SIGTERM, SIGINT] {
                    let src = DispatchSource.makeSignalSource(signal: sig, queue: .main)
                    src.setEventHandler { cont.yield() }
                    src.resume()
                    _ = Unmanaged.passRetained(src)
                }
                Task.detached {
                    while true {
                        try? await Task.sleep(for: .milliseconds(500))
                        if getppid() != parent { cont.yield(); break }
                    }
                }
            }
            for await _ in stop { break }
            try await stream.stopCapture()
            for _ in 0..<100 where !delegate.finished { try await Task.sleep(for: .milliseconds(100)) }
            if !delegate.finished || delegate.failed { exit(1) }
        } catch { print("FAILED \(error.localizedDescription)"); fflush(stdout); exit(1) }
    }
}
