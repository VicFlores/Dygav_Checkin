import { StepProps } from '@/interfaces';
import React from 'react';

export const StepFour = ({ validate }: StepProps) => {
  const handleValidation = () => {
    // Perform validation logic here

    const isValid = true; // Replace with actual validation logic

    validate(isValid);
  };

  return (
    <div>
      StepFour
      <button onClick={handleValidation}>Validate Step One</button>
    </div>
  );
};
