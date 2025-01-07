'use client';

import { StepProps } from '@/interfaces';
import React from 'react';
import styles from './StepTwo.module.css';
import Image from 'next/image';

export const StepTwo = ({ validate }: StepProps) => {
  const handleValidation = () => {
    // Perform validation logic here

    const isValid = true; // Replace with actual validation logic

    validate(isValid);
  };

  return (
    <section>
      <form className={styles.stepContainer}>
        <div className={styles.stepCards}>
          <div className={styles.stepCard}>
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
              <input type='file' />
            </label>
          </div>

          <div className={styles.stepCard}>
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
              <input type='file' />
            </label>
          </div>
        </div>

        <button
          type='submit'
          className={styles.validateButton}
          onClick={handleValidation}
        >
          Comprobar y saltar al siguiente paso
        </button>
      </form>
    </section>
  );
};
