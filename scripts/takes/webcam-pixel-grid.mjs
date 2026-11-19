// Webcam pixel grid: the camera feed drives the cells; moving parts of the frame lift in 3D. No cursor.
// Needs the recorder's Chrome to run with --use-fake-ui-for-media-stream --use-fake-device-for-media-stream
export default async (film) => {
  film.hideCursor();
  await film.hold(1800);
  film.mark("hero");
  await film.hold(3000);
};
