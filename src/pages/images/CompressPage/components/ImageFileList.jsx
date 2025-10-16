import { memo } from "react";
import { FileGrid } from "../../../commonStyles";
import ImageFileTile from "../../../../components/ImageFileTile";

function ImageFileList({ files, compressionProgress, loading, onRemove, t }) {
    return (
        <FileGrid>
            {files.map((fileObj) => {
                const progress = compressionProgress.get(fileObj.id) || 0;
                const isProcessingFile = progress > 0 && progress < 100;

                return (
                    <ImageFileTile
                        key={fileObj.id}
                        fileObj={fileObj}
                        progress={progress}
                        isProcessing={isProcessingFile}
                        loading={loading}
                        onRemove={() => onRemove(fileObj.id)}
                        t={t}
                    />
                );
            })}
        </FileGrid>
    );
}

export default memo(ImageFileList);