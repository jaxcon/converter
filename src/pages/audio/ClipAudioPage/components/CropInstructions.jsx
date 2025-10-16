import { Instructions } from "../styles";

export default function CropInstructions({ t }) {
    return (
        <Instructions>
            <p>{t("cropHint1")}</p>
            <p>{t("cropHint2")}</p>
        </Instructions>
    );
}