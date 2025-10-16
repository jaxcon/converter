import { useMemo, useCallback } from "react";
import { FileGrid } from "../../../commonStyles";
import ImageFileTile from "../../../../components/ImageFileTile";

export default function FilesList({ files, progressMap, converting, onRemove, t }) {
  const handleRemove = useCallback(
    (id) => () => onRemove(id),
    [onRemove]
  );

  const tiles = useMemo(() => {
    return files.map((fileObj) => {
      const progress = progressMap.get(fileObj.id) || 0;
      const isProcessingFile = progress > 0 && progress < 100;

      return (
        <ImageFileTile
          key={fileObj.id}
          fileObj={fileObj}
          progress={progress}
          isProcessing={isProcessingFile}
          loading={converting}
          onRemove={handleRemove(fileObj.id)}
          t={t}
        />
      );
    });
  }, [files, progressMap, converting, handleRemove, t]);

  return <FileGrid>{tiles}</FileGrid>;
}
