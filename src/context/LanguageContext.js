import { createContext } from "react";
export const LanguageContext = createContext({
    language: "en",
    setLanguage: () => { },
    changeLanguage: () => { },
    cycleLanguage: () => { },
    t: (key) => key,
    availableLanguages: [
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
    ],
});
