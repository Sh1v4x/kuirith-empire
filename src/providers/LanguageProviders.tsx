import React, { useState, useEffect, ReactNode } from "react";

import translations from "../locales";
import {
  LanguageContext,
  LanguageContextType,
  TranslationParams,
} from "../context/LanguageContext";

type AvailableLanguage = LanguageContextType["availableLanguages"][number];

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const availableLanguages: AvailableLanguage[] = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("language");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    )
      return savedLanguage;

    const browserLang = navigator.language.split("-")[0];
    return translations[browserLang as keyof typeof translations]
      ? browserLang
      : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string, params: TranslationParams = {}) => {
    const keys = key.split(".");
    let translation: any = translations[language as keyof typeof translations];

    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) break;
    }

    if (!translation) {
      let fallback: any = translations["en"];
      for (const k of keys) {
        fallback = fallback?.[k];
        if (!fallback) break;
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

  const changeLanguage = (lang: string) => {
    if (availableLanguages.some((l) => l.code === lang)) {
      setLanguage(lang);
    }
  };

  const cycleLanguage = () => {
    const currentIndex = availableLanguages.findIndex(
      (l) => l.code === language
    );
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    setLanguage(availableLanguages[nextIndex].code);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        changeLanguage,
        cycleLanguage,
        t,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
