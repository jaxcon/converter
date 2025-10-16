import { FileGrid } from "../../../commonStyles";
import ImageFileTile from "../../../../components/ImageFileTile";

export default function PdfFileGrid({
    files,
    progressMap,
    converting,
    onRemove,
    t,
}) {
    if (!files?.length) return null;

    return (
        <FileGrid>
            {files.map((fileObj) => {
                const progress = progressMap.get(fileObj.id) || 0;
                const isProcessing = progress > 0 && progress < 100;

                return (
                    <ImageFileTile
                        key={fileObj.id}
                        fileObj={fileObj}
                        progress={progress}
                        isProcessing={isProcessing}
                        loading={converting}
                        onRemove={() => onRemove(fileObj.id)}
                        t={t}
                        icon="pdf"
                    />
                );
            })}
        </FileGrid>
    );
}