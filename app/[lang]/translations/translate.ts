'use server';

// Define a type for the supported languages
type SupportedLanguage = 'es' | 'en';

// Define the structure of your translations
type TranslationDictionary = {
  [key: string]: string;
};

const dictionaries = {
  es: () =>
    import('./es.json').then(
      (module) => module.default as TranslationDictionary
    ),
  en: () =>
    import('./en.json').then(
      (module) => module.default as TranslationDictionary
    ),
};

export async function getTranslations(lang: SupportedLanguage) {
  const dictionary = await dictionaries[lang]();

  function t(key: string, defaultValue = ''): string {
    return dictionary[key] || defaultValue;
  }

  return { t };
}
