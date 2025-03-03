'use client';

import React, { Suspense, FC } from 'react';
import styles from './Checkin.module.css';
import { CreateAccountStep } from './Stepper/CreateAccountStep/CreateAccountStep';
import { CheckinStepper } from '@/interfaces/CheckinStepper';
import { PiUserCheck } from 'react-icons/pi';
import { ElectronicSignatureStep } from './Stepper/ElectronicSignatureStep/ElectronicSignatureStep';
import { TravellersRegisterStep } from './Stepper/TravellersRegisterStep/TravellersRegisterStep';
import { IdentifyVerificationStep } from './Stepper/IdentifyVerificationStep/IdentifyVerificationStep';
import { useGuestAndTracking } from '@/hooks';
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

export const Checkin: FC = () => {
  const { currentStep, setCurrentStep, guestId, setGuestId } =
    useGuestAndTracking(steps);

  const validateStep = async (
    isValid: boolean,
    newGuestId?: number
  ): Promise<void> => {
    if (isValid) {
      steps[currentStep].completed = true; // Mark the current step as completed

      if (newGuestId) {
        setGuestId(newGuestId);
      }

      if (newGuestId || guestId) {
        await checkinAPI.put(
          `/tracking?guest_id=${newGuestId || guestId}&step_id=${
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
      <h1 className={styles.checkinTitle}>Registro electrónico de viajeros</h1>

      <p className={styles.checkinDescription}>
        Reserva identificada! Ahora solo completa los siguientes pasos y te
        enviaremos toda la información para que puedas acceder al alojamiento.
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
