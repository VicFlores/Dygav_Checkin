'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiUserCheck } from 'react-icons/pi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { TbLockOpen2 } from 'react-icons/tb';
import styles from './Home.module.css';
import { findReservationById } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface FormValues {
  reservationCode: string;
}

export const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await findReservationById(data.reservationCode);

      setMessage('Reserva encontrada.');

      setTimeout(() => {
        setMessage('Redirigiendo a la pagina de check-in...');
        router.push(`/checkin?reservationCode=${res.data.reservationId}`);
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setMessage('Reservation not found.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.workspace}>
      <div className={styles.container}>
        <h1 className={styles.homeTitle}>
          Bienvenido al check-In
          <br />
          electronico de Dygav
        </h1>

        <p className={styles.homeSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span>
              <PiUserCheck className={styles.icon} />
            </span>
            <p>Facil</p>
          </div>

          <div className={styles.feature}>
            <span>
              <BsSpeedometer2 className={styles.icon} />
            </span>
            <p>Rapido</p>
          </div>

          <div className={styles.feature}>
            <span>
              <TbLockOpen2 className={styles.icon} />
            </span>
            <p>Seguro</p>
          </div>
        </div>

        <div className={styles.reservationCode}>
          <h2>Codigo unico de reserva</h2>

          <p>Ingresa tu numero de reserva</p>

          <form
            className={styles.reservationCodeForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type='text'
              placeholder='Ingresa tu codigo unico de reserva'
              {...register('reservationCode', {
                required: 'Reservation code is required',
              })}
            />

            {errors.reservationCode && (
              <p className={styles.error}>{errors.reservationCode.message}</p>
            )}

            <button type='submit' disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar Reserva'}
            </button>
          </form>

          {message && (
            <p className={styles.reservationCodeMessage}>{message}</p>
          )}
        </div>
      </div>
    </section>
  );
};
