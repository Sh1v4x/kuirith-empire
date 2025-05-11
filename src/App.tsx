import "./App.css";

import { LanguageProvider } from "./providers/LanguageProviders";
import AppRoute from "./shared/router";

import { useEffect } from "react";
import axios from "axios"

function App() {

  useEffect(() => {
    const response = axios.get(``)
    console.log(response.data)
  }, []);

  return (
    <LanguageProvider>
      <AppRoute />
    </LanguageProvider>
  );
}

export default App;
