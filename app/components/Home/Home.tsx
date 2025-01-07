'use client';

import React from 'react';
import { PiUserCheck } from 'react-icons/pi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { TbLockOpen2 } from 'react-icons/tb';
import styles from './Home.module.css';

export const Home = () => {
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

          <form className={styles.reservationCodeForm}>
            <input
              type='text'
              placeholder='Ingresa tu codigo unico de reserva'
            />

            <button type='submit'>Buscar Reserva</button>
          </form>
        </div>
      </div>
    </section>
  );
};
