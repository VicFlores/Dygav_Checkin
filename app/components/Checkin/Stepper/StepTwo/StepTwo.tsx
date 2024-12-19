'use client';

import { StepProps } from '@/interfaces';
import React, { useState } from 'react';
import styles from './StepTwo.module.css';
import Image from 'next/image';
import axios from 'axios';

export const StepTwo = ({ validate }: StepProps) => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage1(e.target.files[0]);
    }
  };

  const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage2(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(''); // Clear the result message

    const formData = new FormData();
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/facial/recognition',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResult(response.data.message);
      if (response.data.message === 'The faces match!') {
        validate(true);
      } else {
        validate(false);
        setResult(
          'Los rostros no coinciden. Por favor, inténtalo con otras imágenes.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while processing the images.');
      validate(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form className={styles.stepContainer} onSubmit={handleSubmit}>
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
              <input type='file' onChange={handleImage1Change} />
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
              <input type='file' onChange={handleImage2Change} />
            </label>
          </div>
        </div>

        {loading && <p className={styles.textResult}>Procesando imágenes...</p>}
        {result && <p className={styles.textResult}>{result}</p>}

        <button type='submit' className={styles.validateButton}>
          Comprobar y saltar al siguiente paso
        </button>
      </form>
    </section>
  );
};
