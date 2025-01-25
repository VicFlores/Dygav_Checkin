'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StepProps } from '@/interfaces';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './CreateAccountStep.module.css';
import { useSearchParams } from 'next/navigation';
import { insertGuest } from '@/utils/helpers';

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const CreateAccountStep = ({ validate }: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const handleContinueWithoutAccount = async () => {
    try {
      await insertGuest(searchParams.get('reservationCode') as string);

      setErrorMessage('Validacion exitosa');
      validate(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      validate(false);
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
        ¿Deseas crear una cuenta de Dygav?
      </h2>

      <p className={styles.stepOneDescription}>
        Si creas una cuenta de Dygav obtendras los siguientes beneficios
      </p>

      <div className={styles.stepOneFeatures}>
        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>Seguimiento de tu reserva</p>
        </div>

        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>Panel de control de detalles</p>
        </div>

        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>Acceso a tu llave electronica</p>
        </div>
        <div>
          <span>
            <FaRegCheckCircle className={styles.stepOneIcon} />
          </span>

          <p>Atencion personalizada</p>
        </div>
      </div>

      <form className={styles.stepOneForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.stepOneFormInputs}>
          <div>
            <label>Nombres</label>
            <input
              type='text'
              placeholder='Escribe tus nombres'
              {...register('firstName', { required: 'Nombres es requerido' })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          <div>
            <label>Apellidos</label>
            <input
              type='text'
              placeholder='Escribe tus apellidos'
              {...register('lastName', { required: 'Apellidos es requerido' })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>

          <div>
            <label>Correo electronico</label>
            <input
              type='email'
              placeholder='Escribe tu correo electronico'
              {...register('email', {
                required: 'Correo electronico es requerido',
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type='password'
              placeholder='Escribe tu contraseña'
              {...register('password', { required: 'Contraseña es requerido' })}
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
            Continuar sin cuenta
          </button>

          <button
            type='button'
            className={styles.googleLoginButton}
            onClick={handleGoogleLogin}
          >
            <FcGoogle className={styles.googleButtonIcon} /> Continuar y
            registrar con google
          </button>

          <button type='submit' className={styles.createAccountButton}>
            Crear cuenta y continuar
          </button>
        </div>
      </form>

      <h2 className={styles.stepOneTitle}>
        Si ya tienes cuenta de Dygav Inicia Sesion
      </h2>

      <p className={styles.stepOneDescription}>
        Recuerda siempre iniciar sesion en tu cuenta de Dygav
      </p>

      <div className={styles.stepOneFormButtons}>
        <button
          type='button'
          className={styles.googleLoginButton}
          onClick={handleGoogleLogin}
        >
          <FcGoogle className={styles.googleButtonIcon} /> Continuar e iniciar
          sesion con google
        </button>

        <button
          type='button'
          onClick={handleLoginWithDygav}
          className={styles.createAccountButton}
        >
          Iniciar Sesion y continuar
        </button>
      </div>
    </section>
  );
};
