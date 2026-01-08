import { Tree, Folder, File } from "@/registry/inspira-react/file-tree";

export default function FileTreeDemo() {
  return (
    <div className="w-80 rounded-xl border p-4">
      <Tree
        initialSelectedId="index-ts"
        initialExpandedItems={["src", "components"]}
      >
        <Folder id="src" name="src">
          <Folder id="components" name="components">
            <File id="button-tsx" name="Button.tsx" />
            <File id="card-tsx" name="Card.tsx" />
            <File id="modal-tsx" name="Modal.tsx" />
          </Folder>
          <Folder id="lib" name="lib">
            <File id="utils-ts" name="utils.ts" />
          </Folder>
          <File id="index-ts" name="index.ts" />
        </Folder>
        <File id="readme" name="README.md" />
        <File id="package-json" name="package.json" />
      </Tree>
    </div>
  );
}
