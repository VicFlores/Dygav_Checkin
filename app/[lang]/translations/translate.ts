'use server';

import { SupportedLanguage, TranslationDictionary } from '@/interfaces';

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
