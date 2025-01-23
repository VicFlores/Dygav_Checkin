import { StepProps } from '@/interfaces';
import React from 'react';

export const GuestRegisterStep = ({ validate }: StepProps) => {
  const handleValidation = () => {
    // Perform validation logic here

    const isValid = true; // Replace with actual validation logic

    validate(isValid);
  };

  return (
    <div>
      GuestRegisterStep
      <button onClick={handleValidation}>Validate Step One</button>
    </div>
  );
};
