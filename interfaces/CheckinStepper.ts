import { JSX } from 'react';

export interface CheckinStepper {
  title: string;
  subtitle: string;
  content: (
    validate: (isValid: boolean, guestId?: number) => Promise<void>
  ) => JSX.Element;
  completed: boolean;
}

export interface StepProps {
  validate: (isValid: boolean, guestId?: number) => Promise<void>;
}
