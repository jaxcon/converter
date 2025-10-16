import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Title,
    Section,
    SectionTitle,
    Paragraph,
    FeaturesGrid,
    FeatureCard,
    FeatureTitle,
    List,
    ListItem,
    CtaButton,
} from "./styles";

export default function AboutPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const features = [
        { title: t("about.whyChoose.confidentiality"), color: "#27ae60" },
        { title: t("about.whyChoose.free"), color: "#e74c3c" },
        { title: t("about.whyChoose.fast"), color: "#3498db" },
        { title: t("about.whyChoose.available"), color: "#9b59b6" },
    ];

    return (
        <Container>
            <Helmet>
                <title>{t("about.pageTitle")}</title>
                <meta name="description" content={t("about.metaDescription")} />
                <link rel="canonical" href="https://easyconvert.space/about" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": t("about.schemaName"),
                        "description": t("about.schemaDescription"),
                        "publisher": {
                            "@type": "Organization",
                            "name": "EasyConvert",
                        },
                    })}
                </script>
            </Helmet>

            <Title>{t("about.title")}</Title>

            <Section>
                <SectionTitle>{t("about.mission.title")}</SectionTitle>
                <Paragraph>{t("about.mission.text")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("about.whyChoose.title")}</SectionTitle>
                <FeaturesGrid>
                    {features.map((f, idx) => (
                        <FeatureCard key={idx}>
                            <FeatureTitle color={f.color}>{f.title}</FeatureTitle>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>
            </Section>

            <Section>
                <SectionTitle>{t("about.howWeWork.title")}</SectionTitle>
                <Paragraph>{t("about.howWeWork.text")}</Paragraph>
                <List>
                    <ListItem>{t("about.howWeWork.points.point1")}</ListItem>
                    <ListItem>{t("about.howWeWork.points.point2")}</ListItem>
                    <ListItem>{t("about.howWeWork.points.point3")}</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>{t("about.cta.title")}</SectionTitle>
                <Paragraph>{t("about.cta.text")}</Paragraph>
                <CtaButton onClick={() => navigate("/")}>
                    {t("about.cta.button")}
                </CtaButton>
            </Section>

            <Section>
                <SectionTitle>{t("about.contact.title")}</SectionTitle>
                <Paragraph>{t("about.contact.text")}</Paragraph>
                <Paragraph>Email: support@easyconvert.space</Paragraph>
            </Section>
        </Container>
    );
}