import { useTranslation } from "react-i18next";
import { universalIcons, manualIcons } from './iconsConfig';
import {
    ManualContainer,
    Title,
    Subtitle,
    StepsList,
    StepItem
} from "./styles";

export default function Manual({ pageKey }) {
    const { t } = useTranslation();

    const title = t(`manual.${pageKey}.title`);
    const steps = t(`manual.${pageKey}.steps`, { returnObjects: true });

    return (
        <ManualContainer>
            <Title>{title}</Title>
            <Subtitle>{t(`manual.subtitle`)}</Subtitle>
            <StepsList>
                {steps.map((step, idx) => {
                    const iconsMap = [...universalIcons, ...manualIcons[pageKey]];
                    const Icon = iconsMap[idx % iconsMap.length];
                    return (
                        <StepItem key={idx} >
                            <Icon />
                            {step}
                        </StepItem>
                    );
                })}
            </StepsList>
        </ManualContainer>
    );
}
