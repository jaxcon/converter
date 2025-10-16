import BaseUpload from "../BaseUpload";

export default function PDFUpload({ setFiles, multiple = true, disabled = false }) {
    return (
        <BaseUpload
            type="pdf"
            setFiles={setFiles}
            multiple={multiple}
            disabled={disabled}
        />
    );
}