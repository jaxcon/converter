import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Seo = ({ pageKey }) => {
    const { t, i18n: { language } } = useTranslation();

    const title = t(`seo.${pageKey}.title`, { defaultValue: t("seo.defaultSeoTitle") });
    const description = t(`seo.${pageKey}.description`, { defaultValue: t("seo.defaultSeoDesc") });
    const canonical = t(`seo.${pageKey}.canonical`, { defaultValue: `https://easyconvert.space/${language}` });

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <link rel="alternate" href="https://easyconvert.space/ru/" hrefLang="ru" />
            <link rel="alternate" href="https://easyconvert.space/en/" hrefLang="en" />
        </Helmet>
    );
};

export default Seo;