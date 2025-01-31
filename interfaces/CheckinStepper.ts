import { JSX } from 'react';

export interface CheckinStepper {
  title: string;
  subtitle: string;
  content: (validate: (isValid: boolean) => void) => JSX.Element;
  completed: boolean;
}

export interface StepProps {
  validate: (isValid: boolean) => void;
  setGuestId?: React.Dispatch<React.SetStateAction<string | null>>;
}
