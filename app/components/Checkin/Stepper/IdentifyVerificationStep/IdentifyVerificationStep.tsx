'use client';

import { StepProps } from '@/interfaces';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './IdentifyVerificationStep.module.css';

import { facialRecognition, insertGuest } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import { IdentifyVerificationCard } from '../IdentifyVerificationCard/IdentifyVerificationCard';

interface FormData {
  idCard: FileList;
  profilePic: FileList;
}

export const IdentifyVerificationStep = ({ validate }: StepProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [idCardUploaded, setIdCardUploaded] = useState<boolean>(false);
  const [profilePicUploaded, setProfilePicUploaded] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const idCard = watch('idCard');
  const profilePic = watch('profilePic');

  useEffect(() => {
    setIdCardUploaded(idCard && idCard.length > 0);
  }, [idCard]);

  useEffect(() => {
    setProfilePicUploaded(profilePic && profilePic.length > 0);
  }, [profilePic]);

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null);
    setIsMatch(null);

    try {
      await facialRecognition(data.idCard[0], data.profilePic[0]);

      await insertGuest(
        'facial_photo',
        'identify_document_photo',
        searchParams.get('reservationCode') as string
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
    }
  };

  return (
    <section>
      <form className={styles.stepContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.stepCards}>
          <IdentifyVerificationCard
            title='Subir tu Documento unico de identidad'
            imageSrc='tempImages/ID Card-rafiki.svg'
            imageAlt='ID Card'
            registerProps={register('idCard', { required: true })}
            uploaded={idCardUploaded}
            error={!!errors.idCard}
          />

          <IdentifyVerificationCard
            title='Sube una foto solamente de tu rostro'
            imageSrc='tempImages/Profile pic-rafiki.svg'
            imageAlt='Profile Pic'
            registerProps={register('profilePic', { required: true })}
            uploaded={profilePicUploaded}
            error={!!errors.profilePic}
          />
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
