import { FileUpload, FileUploadGrid } from "@/registry/inspira-react/file-upload";

export default function FileUploadDemo() {
  return (
    <div className="w-full max-w-xl p-8">
      <FileUpload
        onChange={(files) => console.log("Files:", files)}
      >
        <FileUploadGrid />
      </FileUpload>
    </div>
  );
}
