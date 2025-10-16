import { Select } from "../styles";

export default function AspectSelect({ value, onChange, t }) {
    return (
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="free">{t("freeAspect")}</option>
            <option value="16:9">16:9</option>
            <option value="4:3">4:3</option>
            <option value="1:1">1:1</option>
            <option value="21:9">21:9</option>
        </Select>
    );
}
