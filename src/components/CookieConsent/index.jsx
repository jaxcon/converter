import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CookieAlert,
    CookieContent,
    CookieText,
    CookieButton
} from './styles';


const shouldShowConsent = () => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (consentGiven) return false;

    const lastShown = localStorage.getItem("cookieLastShown");
    const now = Date.now();

    return !lastShown || now - parseInt(lastShown, 10) > 24 * 60 * 60 * 1000;
};

export default function CookieConsent() {
    const [showAlert, setShowAlert] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (shouldShowConsent()) {
            setShowAlert(true);
            localStorage.setItem("cookieLastShown", Date.now().toString());
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowAlert(false);
    };

    const texts = {
        desc: t("cookiesDesc"),
        accept: t("cookiesAccept"),
    };

    if (!showAlert) return null;

    return (
        <CookieAlert>
            <CookieContent>
                <CookieText>{texts.desc}</CookieText>
                <CookieButton
                    aria-label={t("cookiesAccept")}
                    onClick={handleAccept}
                >
                    {texts.accept}
                </CookieButton>
            </CookieContent>
        </CookieAlert>
    );
};