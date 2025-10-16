import { TimeDisplay } from "../styles";

export default function CropInfo({ selection, t, formatTime }) {
    return (
        <TimeDisplay>
            <div><strong>{t("start")}:</strong> {formatTime(selection.start)}</div>
            <div><strong>{t("end")}:</strong> {formatTime(selection.end)}</div>
            <div><strong>{t("duration")}:</strong> {formatTime(selection.end - selection.start)}</div>
        </TimeDisplay>
    );
}