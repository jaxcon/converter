import { TimeDisplay } from "../styles";
import { formatTime } from "../../../../utils/audioUtils";

export default function SelectionInfo({ selection, t }) {
    const { start, end } = selection;

    return (
        <TimeDisplay>
            <div>
                <strong>{t("start")}:</strong> {formatTime(start)}
            </div>
            <div>
                <strong>{t("end")}:</strong> {formatTime(end)}
            </div>
            <div>
                <strong>{t("duration")}:</strong> {formatTime(end - start)}
            </div>
        </TimeDisplay>
    );
}