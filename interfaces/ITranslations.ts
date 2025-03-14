// Define a type for the supported languages
export enum SupportedLanguage {
  es = 'es',
  en = 'en',
}

// Define the structure of your translations
export interface TranslationDictionary {
  [key: string]: string;
}

export interface TranslationResult {
  t: (key: string, defaultValue?: string) => Promise<string>;
}
