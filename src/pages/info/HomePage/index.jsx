import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ImageDown, Crop, Expand, ArrowLeftRight, SlidersHorizontal, Video, Type, Film, Scissors, FileMusic, Music2, Merge, Split } from "lucide-react";
import MainLayout from "../../../components/MainLayout";
import { MainContainer, Content, PageContainer } from "./styles";
import ToolsSection from "./components/ToolsSection";

export default function HomePage() {
    const { t, i18n: { language } } = useTranslation();

    const imageTools = useMemo(() => [
        { name: t("compressTitle"), path: `/images/compress/${language}`, color: "#1976d2", icon: ImageDown, desc: t("compressDesc") },
        { name: t("clipTitle"), path: `/images/clip/${language}`, color: "#388e3c", icon: Crop, desc: t("clipDesc") },
        { name: t("resizeTitle"), path: `/images/resize/${language}`, color: "#f57c00", icon: Expand, desc: t("resizeDesc") },
        { name: t("convertTitle"), path: `/images/convert/${language}`, color: "#7b1fa2", icon: ArrowLeftRight, desc: t("convertDesc") },
        { name: t("filtersTitle"), path: `/images/filter/${language}`, color: "#d32f2f", icon: SlidersHorizontal, desc: t("filtersDesc") },
        { name: t("webglFilters"), path: `/images/enhance/${language}`, color: "#512da8", icon: Type, desc: t("webglFiltersDesc") },
        { name: t("watermark"), path: `/images/watermark/${language}`, color: "#0288d1", icon: Type, desc: t("watermarkPageDesc") },
    ], [t, language]);

    const videoTools = useMemo(() => [
        { name: t("compressTitle"), path: `/video/compress/${language}`, color: "#1976d2", icon: Video, desc: t("compressVideoDesc") },
        { name: t("clipTitle"), path: `/video/clip/${language}`, color: "#388e3c", icon: Crop, desc: t("clipVideoDesc") },
        { name: t("convertTitle"), path: `/video/convert/${language}`, color: "#7b1fa2", icon: ArrowLeftRight, desc: t("convertVideoDesc") },
        { name: t("thumbnail"), path: `/video/thumbnail/${language}`, color: "#fbc02d", icon: Film, desc: t("thumbnailDesc") },
    ], [t, language]);

    const audioTools = useMemo(() => [
        { name: t("clipTitle"), path: `/audio/clip/${language}`, color: "#0097a7", icon: Scissors, desc: t("clipAudio") },
        { name: t("compressTitle"), path: `/audio/compress/${language}`, color: "#c2185b", icon: FileMusic, desc: t("compressAudioDesc") },
        { name: t("convertTitle"), path: `/audio/convert/${language}`, color: "#512da8", icon: Music2, desc: t("convertAudioDesc") },
    ], [t, language]);

    const pdfTools = useMemo(() => [
        { name: t("merge"), path: `/pdf/merge/${language}`, color: "#1976d2", icon: Merge, desc: t("mergePdfDesc") },
        { name: t("split"), path: `/pdf/split/${language}`, color: "#388e3c", icon: Split, desc: t("splitPdfDesc") },
        { name: t("convertTitle"), path: `/pdf/convert/${language}`, color: "#7b1fa2", icon: ArrowLeftRight, desc: t("convertPdfDesc") },
    ], [t, language]);

    return (
        <MainLayout pageKey="home">
            <MainContainer>
                <Content>
                    <PageContainer>
                        <ToolsSection title={t("images")} tools={imageTools} />
                        <ToolsSection title={t("video")} tools={videoTools} />
                        <ToolsSection title={t("Pdf")} tools={pdfTools} />
                        <ToolsSection title={t("audio")} tools={audioTools} />
                    </PageContainer>
                </Content>
            </MainContainer>
        </MainLayout>
    );
}