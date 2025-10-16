import { ChevronDown } from "lucide-react";
import {
    StyledLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    ActiveCategoryIndicator
} from "../styles";
import { MENU_ITEMS } from "../navbarConfig";

const NavbarMenu = ({
    language,
    t,
    activeCategory,
    isMobile,
    closeMenu,
    activeDropdown,
    setActiveDropdown,
}) => (
    <>
        {MENU_ITEMS.map((section) => {
            const isActive = activeCategory === section.key;
            const isOpen = activeDropdown === section.key;

            const toggleDropdown = () =>
                isMobile
                    ? setActiveDropdown(isOpen ? null : section.key)
                    : setActiveDropdown(section.key);

            return (
                <Dropdown
                    key={section.key}
                    onMouseEnter={() => !isMobile && setActiveDropdown(section.key)}
                    onMouseLeave={() => !isMobile && setActiveDropdown(null)}
                >
                    <DropdownToggle onClick={toggleDropdown} $active={isActive}>
                        {t(section.label)} <ChevronDown size={16} />
                        {isActive && <ActiveCategoryIndicator />}
                    </DropdownToggle>

                    <DropdownMenu className={isOpen ? "show" : ""}>
                        {section.items.map((item) => (
                            <li key={item.path}>
                                <StyledLink to={`${item.path}/${language}`} onClick={closeMenu}>
                                    {t(item.label)}
                                </StyledLink>
                            </li>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            );
        })}
    </>
);

export default NavbarMenu;