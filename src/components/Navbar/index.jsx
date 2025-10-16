import { useState, useEffect } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    GlobalContainer,
    Nav,
    LogoWrapper,
    LogoText,
    Logo,
    SubLogo,
    Menu,
    BurgerButton,
    GradientLogo,
    MenuBackdrop,
    LogoLink
} from "./styles";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { language } = i18n;

    const getActiveCategory = () => {
        const path = location.pathname;
        const categories = [
            { key: "images", match: "/images/" },
            { key: "video", match: "/video/" },
            { key: "pdf", match: "/pdf/" },
            { key: "audio", match: "/audio/" },
            { key: "info", match: ["/about", "/privacy", "/terms"] },
        ];

        return (
            categories.find(({ match }) =>
                Array.isArray(match)
                    ? match.some((m) => path.includes(m))
                    : path.includes(match)
            )?.key || null
        );
    };

    const activeCategory = getActiveCategory();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const closeMenu = () => {
        setOpen(false);
        setActiveDropdown(null);
    };

    return (
        <GlobalContainer>
            <Nav>
                <LogoLink
                    to={`/${language}`}
                    onClick={closeMenu}
                    aria-label={t("goToHomePage")}
                >
                    <LogoWrapper>
                        <GradientLogo>EC</GradientLogo>
                        <LogoText>
                            <Logo>EasyConvert</Logo>
                            <SubLogo>{t(activeCategory || "home")}</SubLogo>
                        </LogoText>
                    </LogoWrapper>
                </LogoLink>

                <BurgerButton
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? t("closeMenu") : t("openMenu")}
                    aria-expanded={open}
                    aria-controls="main-menu"
                >
                    {open ? <X size={28} /> : <MenuIcon size={28} />}
                </BurgerButton>

                <Menu
                    className={open ? "open" : ""}
                    id="main-menu"
                    role="navigation"
                    aria-label={t("mainNavigation")}
                >
                    <NavbarMenu
                        language={language}
                        t={t}
                        activeCategory={activeCategory}
                        isMobile={isMobile}
                        closeMenu={closeMenu}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                    />
                </Menu>
            </Nav>
            {open && <MenuBackdrop onClick={closeMenu} />}
        </GlobalContainer>
    );
};

export default Navbar;