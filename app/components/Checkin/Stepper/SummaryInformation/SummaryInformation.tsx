'use client';

import React, { FC, useEffect, useState } from 'react';
import { StepProps } from '@/interfaces';
import styles from './SummaryInformation.module.css';
import {
  findGuestByReservation,
  findTravellersByGuestId,
} from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ModalAlert } from '@/app/components/shared';

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

export const SummaryInformation: FC<StepProps> = ({ validate }) => {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
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

  const handleFormSubmit = (data: { phone: string; email: string }) => {
    const { email, phone } = data;

    console.log('Email:', email);
    console.log('Phone:', phone);

    setShowCompleteModal(false);

    validate(false);
  };

  return (
    <section className={styles.stepContainer}>
      <h1 className={styles.stepOneTitle}>Resumen del proceso de check-in</h1>

      <p className={styles.stepOneDescription}>
        A continuación, se muestra un resumen de la información del proceso de
        check-in.
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

      <button
        className={styles.stepButton}
        onClick={() => setShowCompleteModal(true)}
      >
        Completar registro
      </button>

      {showCompleteModal && (
        <ModalAlert
          message='Confirma o modifica el numero de teléfono y correo electrónico para recibir la confirmación de tu check-in.'
          onAccept={() => setShowCompleteModal(false)}
          isForm={true}
          onSubmit={handleFormSubmit}
          defaultPhone={mainGuest?.phone || ''}
          defaultEmail={mainGuest?.email || ''}
        />
      )}
    </section>
  );
};
