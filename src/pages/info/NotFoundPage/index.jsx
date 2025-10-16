import { useTranslation } from "react-i18next";
import { PageContainer, Card } from "../../commonStyles";
import {
    Title,
    Subtitle,
    HomeButton
} from "./styles";

export default function NotFoundPage() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language || "en";

    return (
        <PageContainer>
            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
                <Title>404</Title>
                <Subtitle>{t("pageNotFound", "Page not found")}</Subtitle>
                <HomeButton to={`/${lang}`}>
                    {t("goHome", "Go to homepage")}
                </HomeButton>
            </Card>
        </PageContainer>
    );
}