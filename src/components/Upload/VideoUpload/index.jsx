import BaseUpload from "../BaseUpload";

export default function VideoUpload({ setFiles, multiple = true, disabled = false }) {
    return (
        <BaseUpload
            type="video"
            setFiles={setFiles}
            multiple={multiple}
            disabled={disabled}
        />
    );
}