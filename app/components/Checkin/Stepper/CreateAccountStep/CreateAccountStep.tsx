'use client';

import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StepProps } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './CreateAccountStep.module.css';
import { insertGuest, findGuestByReservation } from '@/utils/helpers';
import checkinAPI from '@/utils/config/axiosConfig';
import { steps } from '../../Checkin';

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const CreateAccountStep: FC<StepProps> = ({ validate, dictionary }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const reservationCode = searchParams.get('reservationCode') as string;

  const handleContinueWithoutAccount = async () => {
    try {
      setIsLoading(true);

      // First check if a guest already exists for this reservation
      const existingGuest = await findGuestByReservation(reservationCode);

      let guestId: number;

      if (existingGuest) {
        // Guest already exists, use the existing guest's ID
        guestId = existingGuest[0].id;
      } else {
        // No existing guest found, create a new one
        const response = await insertGuest(reservationCode);
        guestId = response.guest_id;

        // Create tracking entries for all steps only for new guests
        const trackingPromises = steps.map((_, index) =>
          checkinAPI.post('/tracking', {
            completed: false,
            guest_id: guestId,
            is_repeated: false,
            step_id: index + 1,
          })
        );
        await Promise.all(trackingPromises);
      }

      setErrorMessage(null);
      validate(true, guestId); // Pass guestId to validate function
    } catch (error) {
      setErrorMessage('Error creating guest or tracking');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login');
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Handle create account logic here
    console.log('Create account', data);
  };

  const handleLoginWithDygav = () => {
    // Handle login with Dygav logic here
    console.log('Login with Dygav');
  };

  return (
    <section className={styles.stepContainer}>
      <h2 className={styles.stepOneTitle}>
        {dictionary['createAccountTitle']}
      </h2>

      <p className={styles.stepOneDescription}>
        {dictionary['createAccountSubtitle']}
      </p>

      <div className={styles.stepOneFeatures}>
        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>{dictionary['createAccountTrackingBookingFeature']}</p>
        </div>

        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>{dictionary['createAccountControlPanelFeature']}</p>
        </div>

        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>{dictionary['createAccountAccessElectronicKey']}</p>
        </div>
        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>{dictionary['createAccountPersonalizedAttention']}</p>
        </div>
      </div>

      <form className={styles.stepOneForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.stepOneFormInputs}>
          <div>
            <label>{dictionary['namesLabel']}</label>
            <input
              type='text'
              placeholder={dictionary['namesPlaceholder']}
              {...register('firstName', {
                required: `${dictionary['namesRequired']}}`,
              })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          <div>
            <label>{dictionary['lastNamesLabel']}</label>
            <input
              type='text'
              placeholder={dictionary['lastNamesPlaceholder']}
              {...register('lastName', {
                required: `${dictionary['lastNamesRequired']}`,
              })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>

          <div>
            <label>{dictionary['emailLabel']}</label>
            <input
              type='email'
              placeholder={dictionary['emailPlaceholder']}
              {...register('email', {
                required: `${dictionary['emailRequired']}`,
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label>{dictionary['passwordLabel']}</label>
            <input
              type='password'
              placeholder={dictionary['passwordPlaceholder']}
              {...register('password', {
                required: `${dictionary['passwordRequired']}`,
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </div>

        <div className={styles.stepOneFormButtons}>
          <button
            type='button'
            className={styles.withoutLoginButton}
            onClick={handleContinueWithoutAccount}
          >
            {dictionary['createAccountContinueWithoutAccountButton']}
          </button>

          <button
            type='button'
            className={styles.googleLoginButton}
            onClick={handleGoogleLogin}
          >
            <FcGoogle className={styles.googleButtonIcon} />
            {dictionary['createAccountRegisterWithGoogleButton']}
          </button>

          <button type='submit' className={styles.createAccountButton}>
            {dictionary['createAccountCreateAccountAndContinueButton']}
          </button>
        </div>
      </form>

      {isLoading && (
        <p className={styles.loadingMessage}>
          {dictionary['createAccountLoadingMessage']}
        </p>
      )}

      <h2 className={styles.stepOneTitle}>
        {dictionary['createAccountAlreadyHaveAnAccount']}
      </h2>

      <p className={styles.stepOneDescription}>
        {dictionary['createAccountRememberLogin']}
      </p>

      <div className={styles.stepOneFormButtons}>
        <button
          type='button'
          className={styles.googleLoginButton}
          onClick={handleGoogleLogin}
        >
          <FcGoogle className={styles.googleButtonIcon} />
          {dictionary['createAccountContinueAndLoginWithGoogle']}
        </button>

        <button
          type='button'
          onClick={handleLoginWithDygav}
          className={styles.createAccountButton}
        >
          {dictionary['createAccountLoginAndContinueButton']}
        </button>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </section>
  );
};
