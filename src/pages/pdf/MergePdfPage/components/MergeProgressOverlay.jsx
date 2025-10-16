import {
    ProcessingOverlay as ProcessingGlobalOverlay,
    ProgressBar as ProgressGlobalBar,
    ProgressText as ProgressGlobalText,
} from "../../../progressBar";

export default function MergeProgressOverlay({ t, globalProgress, completedFiles, totalFiles }) {
    return (
        <ProcessingGlobalOverlay>
            <div style={{ textAlign: "center", padding: "40px" }}>
                <h3>{t("converting")}</h3>
                <ProgressGlobalBar>
                    <div
                        style={{
                            width: `${globalProgress}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #007bff, #0056b3)",
                            borderRadius: "4px",
                            transition: "width 0.3s ease",
                        }}
                    />
                </ProgressGlobalBar>
                <ProgressGlobalText>
                    {Math.round(globalProgress)}% ({completedFiles}/{totalFiles})
                </ProgressGlobalText>
            </div>
        </ProcessingGlobalOverlay>
    );
}