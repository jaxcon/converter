import { useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { PageContainer, Card } from "../../commonStyles";
import {
    CanvasContainer,
    Canvas,
    FiltersGrid,
    FilterButton,
    CustomControls,
    ControlLabel,
    RangeInput,
    ActionsRow,
    ResetButton,
    SaveButton,
    ValueDisplay,
} from "./styles";

import MainLayout from "../../../components/MainLayout";
import ImageUpload from "../../../components/Upload/ImageUpload";
import PageManual from "../../../components/PageManual";

import { FILTERS, CUSTOM_FILTER, DEFAULT_CUSTOM } from "./filtersConfig";
import { useCanvasFilter } from "../../../hooks/image/useCanvasFilter";
import { getUniqueName } from "../../../utils/uniqueIdGenerator";

export default function FilterPage({ pageKey }) {
    const [files, setFiles] = useState([]);
    const [filter, setFilter] = useState("none");
    const [custom, setCustom] = useState(DEFAULT_CUSTOM);
    const { t } = useTranslation();
    const canvasRef = useRef(null);

    useCanvasFilter(files, filter, custom, canvasRef);

    const saveImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !files.length) return;

        const link = document.createElement("a");
        link.download = getUniqueName(files[0].file.name, 'filtered');
        link.href = canvas.toDataURL("image/png");
        link.click();
    }, [files]);

    return (
        <MainLayout pageKey={pageKey} >
            <PageContainer>

                <Card>
                    <ImageUpload multiple={false} setFiles={setFiles} />

                    {(files.length > 0) ? (
                        <CanvasContainer>
                            <Canvas
                                ref={canvasRef}
                            />

                            <FiltersGrid>
                                {Object.keys(FILTERS).map((key) => (
                                    <FilterButton
                                        key={key}
                                        onClick={() => setFilter(FILTERS[key])}
                                        $active={filter === FILTERS[key]}
                                    >
                                        {t(key)}
                                    </FilterButton>
                                ))}
                            </FiltersGrid>

                            {filter === "custom" && (
                                <CustomControls>
                                    {CUSTOM_FILTER.map(({ key, min, max, unit }) => (
                                        <ControlLabel key={key}>
                                            {`${t(key)}:`}
                                            <ValueDisplay>{custom[key]}{unit}</ValueDisplay>
                                            <RangeInput
                                                type="range"
                                                min={min}
                                                max={max}
                                                value={custom[key]}
                                                onChange={(e) =>
                                                    setCustom(prev => ({ ...prev, [key]: Number(e.target.value) }))
                                                }
                                            />
                                        </ControlLabel>
                                    ))}
                                </CustomControls>
                            )}
                            <ActionsRow>
                                {filter === "custom" && (
                                    <ResetButton
                                        onClick={() => setCustom(DEFAULT_CUSTOM)}
                                    >
                                        {t("reset")}
                                    </ResetButton>)}
                                < SaveButton onClick={saveImage}>
                                    {t("save")}
                                </SaveButton>
                            </ActionsRow>
                        </CanvasContainer>
                    ) : <PageManual pageKey={pageKey} />}
                </Card>
            </PageContainer>
        </MainLayout >
    );
}