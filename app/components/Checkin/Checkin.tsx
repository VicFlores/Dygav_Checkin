'use client';

import React, { useState } from 'react';
import styles from './Checkin.module.css';
import { StepOne } from './Stepper/StepOne/StepOne';
import { CheckinStepper } from '@/interfaces/CheckinStepper';
import { PiUserCheck } from 'react-icons/pi';
import { StepFour } from './Stepper/StepFour/StepFour';
import { StepThree } from './Stepper/StepThree/StepThree';
import { StepTwo } from './Stepper/StepTwo/StepTwo';

const steps: CheckinStepper[] = [
  {
    title: 'Paso 1',
    subtitle: 'Crear cuenta Dygav',
    content: (validate) => <StepOne validate={validate} />,
    completed: false,
  },
  {
    title: 'Paso 2',
    subtitle: 'Registrar informacion',
    content: (validate) => <StepTwo validate={validate} />,
    completed: false,
  },
  {
    title: 'Paso 3',
    subtitle: 'Informacion de viajeros',
    content: (validate) => <StepThree validate={validate} />,
    completed: false,
  },
  {
    title: 'Paso 4',
    subtitle: 'Firma electronica',
    content: (validate) => <StepFour validate={validate} />,
    completed: false,
  },
];

export const Checkin: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const validateStep = (isValid: boolean): void => {
    if (isValid) {
      steps[currentStep].completed = true; // Mark the current step as completed

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1); // Move to the next step
      }
    }
  };

  return (
    <section className={styles.checkinContainer}>
      <h1 className={styles.checkinTitle}>Check-In Electronico Dygav</h1>

      <p className={styles.checkinDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex{' '}
        <br /> ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit <br /> anim id est laborum.
      </p>

      <div className={styles.stepContainer}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              currentStep === index ? styles.active : ''
            } ${step.completed ? styles.completed : ''}`}
          >
            <figure className={styles.figureContainer}>
              <span>
                <PiUserCheck className={styles.figureIcon} />
              </span>
            </figure>

            <h3 className={styles.stepTitle}>{step.title}</h3>

            <p className={styles.stepSubtitle}>{step.subtitle}</p>

            <p className={styles.stepStatus}>
              {step.completed
                ? 'Completado'
                : currentStep === index
                ? 'Activo'
                : 'Pendiente'}
            </p>
          </div>
        ))}
      </div>

      <div className={`${styles.stepContent} ${styles.active}`}>
        {steps[currentStep].content(validateStep)}
      </div>
    </section>
  );
};
