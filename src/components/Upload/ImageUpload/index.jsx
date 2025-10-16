import BaseUpload from "../BaseUpload";

export default function ImageUpload({ setFiles, multiple = true, disabled = false }) {
    return (
        <BaseUpload
            type="image"
            setFiles={setFiles}
            multiple={multiple}
            disabled={disabled}
        />
    );
}