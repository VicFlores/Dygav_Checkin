'use client';

import { StepProps } from '@/interfaces';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './IdentifyVerificationStep.module.css';

import { facialRecognition, findGuestByReservation } from '@/utils/helpers';
import { IdentifyVerificationCard } from '../IdentifyVerificationCard/IdentifyVerificationCard';
import { useSearchParams } from 'next/navigation';

interface FormData {
  idCard: FileList;
  profilePic: FileList;
}

export const IdentifyVerificationStep = ({ validate }: StepProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [idCardUploaded, setIdCardUploaded] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const reservationCode = searchParams.get('reservationCode') as string;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const idCard = watch('idCard');

  useEffect(() => {
    setIdCardUploaded(idCard && idCard.length > 0);
  }, [idCard]);

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null);
    setIsMatch(null);
    setIsLoading(true);

    try {
      const mainGuest = await findGuestByReservation(reservationCode);

      await facialRecognition(
        data.idCard[0],
        data.idCard[0],
        mainGuest.guest_id
      );

      setErrorMessage('Validacion exitosa');
      setIsMatch(true);
      validate(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setIsMatch(false);
      }
      validate(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form className={styles.stepContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.stepCards}>
          <IdentifyVerificationCard
            title='Sube tu documento de identificación oficial'
            imageSrc='tempImages/ID Card-rafiki.svg'
            imageAlt='ID Card'
            registerProps={register('idCard', { required: true })}
            uploaded={idCardUploaded}
            error={!!errors.idCard}
          />
        </div>

        {isLoading && (
          <p className={styles.loadingMessage}>Procesando imágenes...</p>
        )}

        {errorMessage && (
          <p
            className={
              isMatch === false ? styles.errorMessage : styles.successMessage
            }
          >
            {errorMessage}
          </p>
        )}

        <button
          type='submit'
          className={styles.validateButton}
          disabled={isLoading}
        >
          Comprobar y saltar al siguiente paso
        </button>
      </form>
    </section>
  );
};
