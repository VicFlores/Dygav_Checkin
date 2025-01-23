import { StepProps } from '@/interfaces';
import React from 'react';

export const ContractStep = ({ validate }: StepProps) => {
  const handleValidation = () => {
    // Perform validation logic here

    const isValid = true; // Replace with actual validation logic

    validate(isValid);
  };

  return (
    <div>
      StepFive
      <button onClick={handleValidation}>Validate Step One</button>
    </div>
  );
};
