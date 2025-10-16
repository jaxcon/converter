import {
    PageSelectorWrapper,
    PageSelectorInfo,
    PageSelectorButtons,
    PageButton,
    ActionButton,
} from "./styles";

export default function PageSelector({
    fileObj,
    selectedPages,
    handlePageSelection,
    t,
}) {
    const totalPages = fileObj.pages || 0;
    const selected = selectedPages[fileObj.id] || [];

    const togglePage = (pageNumber) => {
        const newSelected = selected.includes(pageNumber)
            ? selected.filter((p) => p !== pageNumber)
            : [...selected, pageNumber];
        handlePageSelection(fileObj.id, newSelected);
    };

    const selectAll = () => {
        handlePageSelection(
            fileObj.id,
            Array.from({ length: totalPages }, (_, i) => i + 1)
        );
    };

    const selectNone = () => {
        handlePageSelection(fileObj.id, []);
    };

    if (totalPages === 0) return <div>{t("loading")}</div>;

    return (
        <PageSelectorWrapper>
            <PageSelectorInfo>
                {t("selectPagesShort")}
                {selected.length} {t("from")} {totalPages}
            </PageSelectorInfo>

            <PageSelectorButtons>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PageButton
                        key={page}
                        $selected={selected.includes(page)}
                        onClick={() => togglePage(page)}
                    >
                        {page}
                    </PageButton>
                ))}
            </PageSelectorButtons>

            <div>
                <ActionButton onClick={selectAll}>{t("all")}</ActionButton>
                <ActionButton onClick={selectNone}>{t("NoPages")}</ActionButton>
            </div>
        </PageSelectorWrapper>
    );
}