import { JSX } from 'react';
import { TranslationDictionary } from './ITranslations';

export interface CheckinStepper {
  title: string;
  subtitle: string;
  content: (
    validate: (isValid: boolean, guestId?: number) => Promise<void>,
    dictionary: TranslationDictionary
  ) => JSX.Element;
  completed: boolean;
}

export interface StepProps {
  validate: (isValid: boolean, guestId?: number) => Promise<void>;
  dictionary: TranslationDictionary;
}
