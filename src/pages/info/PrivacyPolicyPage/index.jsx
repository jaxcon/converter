import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
    Container,
    Title,
    Section,
    SectionTitle,
    Paragraph,
    List,
    ListItem,
    Footer
} from "../commonStyles";

export default function PrivacyPolicyPage() {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    return (
        <Container>
            <Helmet>
                <title>{t("privacy.metaTitle")}</title>
                <meta name="description" content={t("privacy.metaDescription")} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: t("privacy.schemaName"),
                        description: t("privacy.schemaDescription"),
                        publisher: {
                            "@type": "Organization",
                            name: "EasyConvert",
                            address: {
                                "@type": "PostalAddress",
                                addressCountry: "RU",
                            },
                        },
                    })}
                </script>
            </Helmet>

            <Title>{t("privacy.title")}</Title>

            <Section>
                <Paragraph>{t("privacy.banner")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.principlesTitle")}</SectionTitle>
                <Paragraph>{t("privacy.principlesText")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.cookiesTitle")}</SectionTitle>
                <Paragraph>{t("privacy.cookiesIntro")}</Paragraph>
                <List>
                    <ListItem>{t("privacy.cookiesList1")}</ListItem>
                    <ListItem>{t("privacy.cookiesList2")}</ListItem>
                </List>
                <Paragraph>{t("privacy.cookiesOutro")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.filesTitle")}</SectionTitle>
                <Paragraph>{t("privacy.filesText1")}</Paragraph>
                <Paragraph>{t("privacy.filesText2")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.statsTitle")}</SectionTitle>
                <Paragraph>{t("privacy.statsIntro")}</Paragraph>
                <List>
                    <ListItem>{t("privacy.statsList1")}</ListItem>
                    <ListItem>{t("privacy.statsList2")}</ListItem>
                    <ListItem>{t("privacy.statsList3")}</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.cookieManageTitle")}</SectionTitle>
                <Paragraph>{t("privacy.cookieManageText")}</Paragraph>
                <List>
                    <ListItem>{t("privacy.cookieManageList1")}</ListItem>
                    <ListItem>{t("privacy.cookieManageList2")}</ListItem>
                    <ListItem>{t("privacy.cookieManageList3")}</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.thirdTitle")}</SectionTitle>
                <Paragraph>{t("privacy.thirdText1")}</Paragraph>
                <Paragraph>{t("privacy.thirdText2")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("privacy.rightsTitle")}</SectionTitle>
                <Paragraph>{t("privacy.rightsText")}</Paragraph>
            </Section>

            <Footer>
                <p>
                    {t("privacy.lastUpdated")} {new Date().toLocaleDateString(language)}
                </p>
                <p>
                    © {new Date().getFullYear()} EasyConvert. {t("privacy.allRightsReserved")}
                </p>
            </Footer>
        </Container>
    );
}