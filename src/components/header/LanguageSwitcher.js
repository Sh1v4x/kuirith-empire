import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "../../hooks/useTranslation";
export default function LanguageSwitcher({ className = "" }) {
    const { language, cycleLanguage, t } = useTranslation();
    return (_jsxs("button", { onClick: cycleLanguage, className: `p-2 rounded-full flex items-center gap-1 transition-all duration-300 ${className}`, "aria-label": t("language.select"), title: t("language.select"), children: [_jsx(FaGlobe, {}), _jsx("span", { className: "text-xs", children: language.toUpperCase() })] }));
}
