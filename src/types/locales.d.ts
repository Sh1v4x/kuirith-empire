declare module "../locales" {
  interface Translations {
    [key: string]: string | Translations;
  }

  const locales: {
    [languageCode: string]: Translations;
  };

  export default locales;
}
