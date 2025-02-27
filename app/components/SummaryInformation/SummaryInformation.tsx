'use client';

import React, { useEffect, useState } from 'react';

import styles from './SummaryInformation.module.css';
import {
  findGuestByReservation,
  findTravellersByGuestId,
} from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Traveller {
  names: string;
  lastnames: string;
  country: string;
  phone: string;
  email: string;
}

interface MainGuest {
  guest_id: string;
  names: string;
  lastnames: string;
  phone: string;
  email: string;
}

export const SummaryInformation = () => {
  const [mainGuest, setMainGuest] = useState<MainGuest>();
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const searchParams = useSearchParams();
  const reservationCode = searchParams.get('reservationCode');

  useEffect(() => {
    if (searchParams.get('reservationCode') !== null) {
      const getMainGuest = async () => {
        const mainGuestRes = await findGuestByReservation(
          reservationCode as string
        );
        setMainGuest(mainGuestRes);

        const travellersRes = await findTravellersByGuestId(
          mainGuestRes.guest_id
        );
        setTravellers(travellersRes);
      };
      getMainGuest();
    }
  }, [reservationCode, searchParams]);

  return (
    <section className={styles.stepContainer}>
      <h1 className={styles.stepOneTitle}>
        Felicidades, has completado el proceso check-in con éxito.
      </h1>

      <p className={styles.stepOneDescription}>
        Te hemos enviado un mensaje por correo electrónico y WhatsApp con la
        información de tu reservación.
      </p>

      <p className={styles.stepOneDescription}>
        IMPORTANTE: Por favor si en unos minutos no te ha llegado llámanos al
        +34 614 214 250
      </p>

      <p className={styles.stepOneDescription}>
        A continuación, te presentamos un resumen de tu proceso de check-in:
      </p>

      <h2 className={styles.title}>Información del huésped principal</h2>

      <p className={styles.subtitle}>
        Información del huesped que realizó la reservación:
      </p>

      <div className={styles.travellerCard}>
        <Image
          src='https://dygav-storage.nyc3.cdn.digitaloceanspaces.com/dygav-checkin/images/male_avatar.svg'
          alt='user'
          width={60}
          height={60}
        />

        <span>
          <p>
            <strong>Nombre:</strong>
          </p>

          <p>
            {mainGuest?.names} {mainGuest?.lastnames}
          </p>
        </span>

        <p>
          <strong>Teléfono:</strong> {mainGuest?.phone || 'No proporcionado'}
        </p>

        <p>
          <strong>Email:</strong> {mainGuest?.email}
        </p>
      </div>

      <h2 className={styles.title}>Huespedes registrados</h2>

      <p className={styles.subtitle}>
        Estos son los huespedes registrados en la reservación:
      </p>

      <div className={styles.travellersContainer}>
        {travellers.map((traveller, index) => (
          <div key={index} className={styles.travellerCard}>
            <Image
              src='https://dygav-storage.nyc3.cdn.digitaloceanspaces.com/dygav-checkin/images/male_avatar.svg'
              alt='user'
              width={60}
              height={60}
            />

            <span>
              <p>
                <strong>Nombre:</strong>
              </p>

              <p>
                {traveller.names} {traveller.lastnames}
              </p>
            </span>

            <p>
              <strong>País:</strong> {traveller.country}
            </p>
            <p>
              <strong>Teléfono:</strong> {traveller.phone}
            </p>
            <p>
              <strong>Email:</strong> {traveller.email}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
