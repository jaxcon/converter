import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { FileGrid } from "../../../commonStyles";
import SortableFileTile from "./SortableFileTile";
import ImageFileTile from "../../../../components/ImageFileTile";

export default function FilesGrid({ files, merging, progressMap, handleDragEnd, handleRemoveFile, t }) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
        >
            <SortableContext items={files.map((f) => f.id)}>
                <FileGrid>
                    {files.map((fileObj) => {
                        const progress = progressMap.get(fileObj.id) || 0;
                        const isProcessingFile = progress > 0 && progress < 100;

                        return (
                            <SortableFileTile key={fileObj.id} fileObj={fileObj}>
                                <ImageFileTile
                                    fileObj={fileObj}
                                    progress={progress}
                                    isProcessing={isProcessingFile}
                                    loading={merging}
                                    onRemove={() => handleRemoveFile(fileObj.id)}
                                    t={t}
                                    icon="pdf"
                                    pages={fileObj.pages}
                                />
                            </SortableFileTile>
                        );
                    })}
                </FileGrid>
            </SortableContext>
        </DndContext>
    );
}