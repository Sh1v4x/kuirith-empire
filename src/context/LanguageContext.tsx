import { createContext } from "react";

type AvailableLanguage = {
  code: string;
  label: string;
};

export type TranslationParams = Record<string, string>;

export interface LanguageContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  changeLanguage: (lang: string) => void;
  cycleLanguage: () => void;
  t: (key: string, params?: TranslationParams) => string;
  availableLanguages: AvailableLanguage[];
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  changeLanguage: () => {},
  cycleLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ],
});
