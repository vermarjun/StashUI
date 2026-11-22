"use client";

import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileIcon,
  CommitFileInfo,
  CommitFilePath,
  CommitFileStatus,
  CommitFiles,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from "./commit";

const hash = "a3f9c21e8b7d4f0a6c2e1b9d8f7a6c5e4d3b2a10";

const files = [
  { path: "src/lib/session.ts", status: "modified", additions: 42, deletions: 18 },
  { path: "src/app/api/auth/refresh/route.ts", status: "added", additions: 87, deletions: 0 },
  { path: "src/middleware.ts", status: "modified", additions: 12, deletions: 5 },
  { path: "src/lib/legacy-token.ts", status: "deleted", additions: 0, deletions: 64 },
  { path: "docs/auth.md → docs/authentication.md", status: "renamed", additions: 6, deletions: 2 },
] as const;

const twoHoursAgo = new Date(Date.now() - 1000 * 60 * 60 * 2);

export default function CommitDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <Commit className="w-full max-w-xl" defaultOpen>
        <CommitHeader>
          <CommitAuthor>
            <CommitAuthorAvatar initials="MC" />
          </CommitAuthor>
          <CommitInfo>
            <CommitMessage>feat(auth): rotate refresh tokens on every request</CommitMessage>
            <CommitMetadata>
              <CommitHash>{hash.slice(0, 7)}</CommitHash>
              <CommitSeparator />
              <span>Maya Chen</span>
              <CommitSeparator />
              <CommitTimestamp date={twoHoursAgo}>2 hours ago</CommitTimestamp>
            </CommitMetadata>
          </CommitInfo>
          <CommitActions>
            <CommitCopyButton hash={hash} />
          </CommitActions>
        </CommitHeader>
        <CommitContent>
          <CommitFiles>
            {files.map((file) => (
              <CommitFile key={file.path}>
                <CommitFileInfo>
                  <CommitFileStatus status={file.status} />
                  <CommitFileIcon />
                  <CommitFilePath>{file.path}</CommitFilePath>
                </CommitFileInfo>
                <CommitFileChanges>
                  <CommitFileAdditions count={file.additions} />
                  <CommitFileDeletions count={file.deletions} />
                </CommitFileChanges>
              </CommitFile>
            ))}
          </CommitFiles>
        </CommitContent>
      </Commit>
    </div>
  );
}
