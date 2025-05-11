import { jsx as _jsx } from "react/jsx-runtime";
import "./App.css";
import { LanguageProvider } from "./providers/LanguageProviders";
import AppRoute from "./shared/router";
import { useEffect } from "react";
import axios from "axios";
function App() {
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(``);
            console.log(response.data);
        }
        fetchData();
    }, []);
    return (_jsx(LanguageProvider, { children: _jsx(AppRoute, {}) }));
}
export default App;
