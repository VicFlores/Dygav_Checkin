'use client';

import { StepProps } from '@/interfaces';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './StepTwo.module.css';
import Image from 'next/image';
import { findReservationById, insertGuest } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

interface FormData {
  idCard: FileList;
  profilePic: FileList;
}

export const StepTwo = ({ validate }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const searchParams = useSearchParams();

  const onSubmit = async () => {
    setErrorMessage(null);
    setIsMatch(null);

    try {
      // await facialRecognition(data.idCard[0], data.profilePic[0]);

      const reservationInfo = await findReservationById(
        searchParams.get('reservationCode') as string
      );

      await insertGuest({
        facial_photo: 'facial_photo',
        id_reservation: reservationInfo.data.reservationId,
        identify_document_photo: 'identify_document_photo',
        lastnames: reservationInfo.data.lastnames,
        names: reservationInfo.data.firstnames,
        phone_email: reservationInfo.data.travellerEmail,
      });

      setErrorMessage('Validacion exitosa');
      setIsMatch(true);
      validate(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        setErrorMessage('Las fotos no coinciden. Por favor, intenta de nuevo.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      setIsMatch(false);
      validate(false);
    }
  };

  return (
    <section>
      <form className={styles.stepContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.stepCards}>
          <div
            className={`${styles.stepCard} ${
              isMatch === false
                ? styles.error
                : isMatch === true
                ? styles.success
                : ''
            }`}
          >
            <figure className={styles.figureImage}>
              <Image
                src='tempImages/ID Card-rafiki.svg'
                alt='ID Card'
                layout='fill'
              />
            </figure>

            <h3>
              Subir tu Documento unico de <br />
              identidad
            </h3>

            <label className={styles.customFileUpload}>
              Subir foto
              <input type='file' {...register('idCard', { required: true })} />
            </label>

            {errors.idCard && <span>Este campo es obligatorio</span>}
          </div>

          <div
            className={`${styles.stepCard} ${
              isMatch === false
                ? styles.error
                : isMatch === true
                ? styles.success
                : ''
            }`}
          >
            <figure className={styles.figureImage}>
              <Image
                src='tempImages/Profile pic-rafiki.svg'
                alt='Profile Pic'
                layout='fill'
              />
            </figure>

            <h3>
              Sube una foto solamente de tu <br /> rostro
            </h3>

            <label className={styles.customFileUpload}>
              Subir foto
              <input
                type='file'
                {...register('profilePic', { required: true })}
              />
            </label>

            {errors.profilePic && <span>Este campo es obligatorio</span>}
          </div>
        </div>

        {errorMessage && (
          <p
            className={
              isMatch === false ? styles.errorMessage : styles.successMessage
            }
          >
            {errorMessage}
          </p>
        )}

        <button type='submit' className={styles.validateButton}>
          Comprobar y saltar al siguiente paso
        </button>
      </form>
    </section>
  );
};
