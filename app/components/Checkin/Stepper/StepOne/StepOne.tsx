'use client';

import React from 'react';
import { StepProps } from '@/interfaces';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import styles from './StepOne.module.css';

export const StepOne = ({ validate }: StepProps) => {
  const handleValidation = () => {
    // Perform validation logic here

    const isValid = true; // Replace with actual validation logic

    validate(isValid);
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

      <form className={styles.stepOneForm}>
        <div className={styles.stepOneFormInputs}>
          <div>
            <label>Nombres</label>
            <input type='text' placeholder='Escribe tus nombres' />
          </div>

          <div>
            <label>Apellidos</label>
            <input type='text' placeholder='Escribe tus apellidos' />
          </div>

          <div>
            <label>Correo electronico</label>
            <input type='email' placeholder='Escribe tu correo electronico' />
          </div>

          <div>
            <label>Contraseña</label>
            <input type='password' placeholder='Escribe tu contraseña' />
          </div>
        </div>

        <div className={styles.stepOneFormButtons}>
          <button
            type='button'
            onClick={handleValidation}
            className={styles.withoutLoginButton}
          >
            Continuar sin cuenta
          </button>

          <button
            type='button'
            onClick={handleValidation}
            className={styles.googleLoginButton}
          >
            <FcGoogle className={styles.googleButtonIcon} /> Continuar y
            registrar con google
          </button>

          <button
            type='button'
            onClick={handleValidation}
            className={styles.createAccountButton}
          >
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
          onClick={handleValidation}
          className={styles.googleLoginButton}
        >
          <FcGoogle className={styles.googleButtonIcon} /> Continuar y registrar
          con google
        </button>

        <button
          type='button'
          onClick={handleValidation}
          className={styles.createAccountButton}
        >
          Iniciar Sesion y continuar
        </button>
      </div>
    </section>
  );
};
