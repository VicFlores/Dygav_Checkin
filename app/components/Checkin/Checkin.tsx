'use client';

import React, { useState, Suspense } from 'react';
import styles from './Checkin.module.css';
import { CreateAccountStep } from './Stepper/CreateAccountStep/CreateAccountStep';
import { CheckinStepper } from '@/interfaces/CheckinStepper';
import { PiUserCheck } from 'react-icons/pi';
import { ElectronicSignatureStep } from './Stepper/ElectronicSignatureStep/ElectronicSignatureStep';
import { TravellersRegisterStep } from './Stepper/TravellersRegisterStep/TravellersRegisterStep';
import { IdentifyVerificationStep } from './Stepper/IdentifyVerificationStep/IdentifyVerificationStep';
import checkinAPI from '@/utils/config/axiosConfig';

export const steps: CheckinStepper[] = [
  {
    title: 'Paso 1',
    subtitle: 'Crear cuenta Dygav',
    content: (validate) => <CreateAccountStep validate={validate} />,
    completed: false,
  },
  {
    title: 'Paso 2',
    subtitle: 'Verificacion de identidad',
    content: (validate) => <IdentifyVerificationStep validate={validate} />,
    completed: false,
  },
  {
    title: 'Paso 3',
    subtitle: 'Registro de viajeros',
    content: (validate) => <TravellersRegisterStep validate={validate} />,
    completed: false,
  },
  {
    title: 'Paso 4',
    subtitle: 'Firma electronica',
    content: (validate) => <ElectronicSignatureStep validate={validate} />,
    completed: false,
  },
];

export const Checkin: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [guestId, setGuestId] = useState<number | null>(null);

  const validateStep = async (
    isValid: boolean,
    newGuestId?: number
  ): Promise<void> => {
    if (isValid) {
      steps[currentStep].completed = true; // Mark the current step as completed

      if (newGuestId) {
        setGuestId(newGuestId);
      }

      console.log('guestId in validateStep', newGuestId || guestId); // Add this line

      if (newGuestId || guestId) {
        await checkinAPI.put(
          `/tracking?guest_id=${newGuestId || guestId}&step_number=${
            currentStep + 1
          }`,
          {
            completed: true,
            is_repeated: false,
          }
        );
      }

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

      <Suspense fallback={<div>Loading...</div>}>
        <div className={`${styles.stepContent} ${styles.active}`}>
          {steps[currentStep].content((isValid, newGuestId) =>
            validateStep(isValid, newGuestId)
          )}
        </div>
      </Suspense>
    </section>
  );
};
