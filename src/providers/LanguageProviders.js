import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import translations from "../locales";
import { LanguageContext, } from "../context/LanguageContext";
export const LanguageProvider = ({ children, }) => {
    const availableLanguages = [
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
    ];
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage &&
            translations[savedLanguage])
            return savedLanguage;
        const browserLang = navigator.language.split("-")[0];
        return translations[browserLang]
            ? browserLang
            : "en";
    });
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);
    const t = (key, params = {}) => {
        const keys = key.split(".");
        let translation = translations[language];
        for (const k of keys) {
            translation = translation?.[k];
            if (!translation)
                break;
        }
        if (!translation) {
            let fallback = translations["en"];
            for (const k of keys) {
                fallback = fallback?.[k];
                if (!fallback)
                    break;
            }
            translation = fallback || key;
        }
        if (typeof translation === "string") {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                translation = translation.replace(`{{${paramKey}}}`, paramValue);
            });
        }
        return translation;
    };
    const changeLanguage = (lang) => {
        if (availableLanguages.some((l) => l.code === lang)) {
            setLanguage(lang);
        }
    };
    const cycleLanguage = () => {
        const currentIndex = availableLanguages.findIndex((l) => l.code === language);
        const nextIndex = (currentIndex + 1) % availableLanguages.length;
        setLanguage(availableLanguages[nextIndex].code);
    };
    return (_jsx(LanguageContext.Provider, { value: {
            language,
            setLanguage,
            changeLanguage,
            cycleLanguage,
            t,
            availableLanguages,
        }, children: children }));
};
