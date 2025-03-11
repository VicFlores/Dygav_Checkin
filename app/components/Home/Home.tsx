'use client';

import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiUserCheck } from 'react-icons/pi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { TbLockOpen2 } from 'react-icons/tb';
import styles from './Home.module.css';
import { findReservationById } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { TranslationDictionary } from '@/interfaces';

interface FormValues {
  reservationCode: string;
}

export const Home: FC<{ dictionary: TranslationDictionary }> = ({
  dictionary,
}) => {
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

      setMessage(`${dictionary['bookingFound']}`);

      setTimeout(() => {
        setMessage('Redirigiendo a la pagina de check-in...');
        router.push(`/checkin?reservationCode=${res.id}`);
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
        <h1 className={styles.homeTitle}>{dictionary['welcome']}</h1>

        <p className={styles.homeSubtitle}>{dictionary['description']}</p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span>
              <PiUserCheck className={styles.icon} />
            </span>
            <p>{dictionary['easyFeature']}</p>
          </div>

          <div className={styles.feature}>
            <span>
              <BsSpeedometer2 className={styles.icon} />
            </span>
            <p>{dictionary['fastFeature']}</p>
          </div>

          <div className={styles.feature}>
            <span>
              <TbLockOpen2 className={styles.icon} />
            </span>
            <p>{dictionary['secureFeature']}</p>
          </div>
        </div>

        <div className={styles.reservationCode}>
          <h2>{dictionary['uniqueCode']}</h2>

          <p>{dictionary['bookingId']}</p>

          <form
            className={styles.reservationCodeForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type='text'
              placeholder={dictionary['bookingIdPlaceholder']}
              {...register('reservationCode', {
                required: `${dictionary['bookingIdRequired']}`,
              })}
            />

            {errors.reservationCode && (
              <p className={styles.error}>{errors.reservationCode.message}</p>
            )}

            <button type='submit' disabled={loading}>
              {loading
                ? `${dictionary['loadingSubmit']}`
                : `${dictionary['searchSubmit']}`}
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
