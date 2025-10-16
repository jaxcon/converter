import BaseUpload from "../BaseUpload";

export default function AudioUpload({ setFiles, multiple = true, disabled = false }) {
    return (
        <BaseUpload
            type="audio"
            setFiles={setFiles}
            multiple={multiple}
            disabled={disabled}
        />
    );
}