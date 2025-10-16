import { MainContainer, Content } from './styles';
import CookieConsent from '../CookieConsent';
import Seo from './Seo';

const MainLayout = ({ children, pageKey }) => {
    return (
        <>
            <Seo pageKey={pageKey} />

            <MainContainer>
                <Content>{children}</Content>
                <CookieConsent />
            </MainContainer>
        </>
    );
};

export default MainLayout;