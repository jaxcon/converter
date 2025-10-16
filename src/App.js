import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import RouterTracker from "./components/RouterTracker";
import YandexMetrika from "./components/YandexMetrika";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import './App.css';
import "./i18n";
import { routes } from "./routesConfig";
import NotFoundPage from "./pages/info/NotFoundPage";

function LangWrapper({ children }) {
    const { lng } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (lng && i18n.language !== lng) {
            i18n.changeLanguage(lng);
        }
    }, [lng, i18n]);

    return children;
}

function LangRedirect() {
    const { i18n } = useTranslation();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (i18n.language) {
            setReady(true);
        }
    }, [i18n.language]);

    if (!ready) return null;
    return <Navigate to={`/${i18n.language}`} replace />;
}

function App() {
    return (
        <Router>
            <YandexMetrika />
            <RouterTracker />
            <Navbar />

            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<LangRedirect />} />

                    {Object.entries(routes).map(([key, { path, component: Component, pageKey }]) => (
                        <Route
                            key={key}
                            path={path}
                            element={
                                <LangWrapper>
                                    <Component pageKey={pageKey} />
                                </LangWrapper>
                            }
                        />
                    ))}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;