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

export default function TermsOfUsePage() {
    const { t } = useTranslation();

    return (
        <Container>
            <Helmet>
                <title>{t("terms.pageTitle")}</title>
                <meta name="description" content={t("terms.metaDescription")} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: t("terms.schemaName"),
                        description: t("terms.schemaDescription"),
                        publisher: {
                            "@type": "Organization",
                            name: "EasyConvert",
                        },
                    })}
                </script>
            </Helmet>

            <Title>{t("terms.title")}</Title>

            <Section>
                <Paragraph>{t("terms.noticeText")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("terms.section1.title")}</SectionTitle>
                <Paragraph>{t("terms.section1.text")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("terms.section2.title")}</SectionTitle>
                <Paragraph>{t("terms.section2.text")}</Paragraph>
                <List>
                    <ListItem>{t("terms.section2.items.item1")}</ListItem>
                    <ListItem>{t("terms.section2.items.item2")}</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>{t("terms.section3.title")}</SectionTitle>
                <Paragraph>{t("terms.section3.text1")}</Paragraph>
                <Paragraph>{t("terms.section3.text2")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("terms.section4.title")}</SectionTitle>
                <Paragraph>{t("terms.section4.text")}</Paragraph>
                <List>
                    <ListItem>{t("terms.section4.items.item1")}</ListItem>
                    <ListItem>{t("terms.section4.items.item2")}</ListItem>
                    <ListItem>{t("terms.section4.items.item3")}</ListItem>
                    <ListItem>{t("terms.section4.items.item4")}</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>{t("terms.section5.title")}</SectionTitle>
                <Paragraph>{t("terms.section5.text1")}</Paragraph>
                <Paragraph>{t("terms.section5.text2")}</Paragraph>
            </Section>

            <Section>
                <SectionTitle>{t("terms.important.title")}</SectionTitle>
                <Paragraph>{t("terms.important.text")}</Paragraph>
            </Section>

            <Footer>
                <p>
                    {t("terms.footer.updated")} {new Date().toLocaleDateString()}
                </p>
                <p>
                    © {new Date().getFullYear()} EasyConvert. {t("terms.footer.rights")}
                </p>
            </Footer>
        </Container>
    );
}