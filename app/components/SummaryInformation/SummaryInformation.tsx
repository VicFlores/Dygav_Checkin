'use client';

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import styles from './SummaryInformation.module.css';
import {
  findGuestByReservation,
  findTravellersByGuestId,
} from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

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
  const [mainGuest, setMainGuest] = useState<MainGuest>({
    guest_id: '',
    names: '',
    lastnames: '',
    phone: '',
    email: '',
  });
  const [travellers, setTravellers] = useState<Traveller[]>([
    {
      names: '',
      lastnames: '',
      country: '',
      phone: '',
      email: '',
    },
  ]);
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleNextPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(0);
  };

  const renderCongratulationsPage = () => (
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

      <figure className={styles.successImage}>
        <Image
          src='https://dygav-storage.nyc3.cdn.digitaloceanspaces.com/dygav-checkin/images/Information%20tab-pana.svg'
          alt='check-in success'
          fill
        />
      </figure>

      <button onClick={handleNextPage} className={styles.navigationButton}>
        Ver resumen de check-in <FaArrowRight className={styles.buttonIcon} />
      </button>
    </section>
  );

  const renderSummaryPage = () => (
    <section className={styles.stepContainer}>
      <h1 className={styles.stepOneTitle}>
        A continuación, te presentamos un resumen de tu proceso de check-in:
      </h1>

      <h2 className={styles.subtitle}>Información del huésped principal</h2>

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

      <h2 className={styles.subtitle}>Huespedes registrados</h2>

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

      <button onClick={handlePrevPage} className={styles.navigationButton}>
        <FaArrowLeft className={styles.buttonIcon} /> Volver a la felicitación
      </button>
    </section>
  );

  return (
    <div className={styles.container}>
      {showConfetti &&
        windowDimensions.width > 0 &&
        windowDimensions.height > 0 && (
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
          />
        )}

      {currentPage === 0 ? renderCongratulationsPage() : renderSummaryPage()}

      <div className={styles.pagination}>
        <span
          className={`${styles.pageIndicator} ${
            currentPage === 0 ? styles.activePage : ''
          }`}
          onClick={handlePrevPage}
        ></span>
        <span
          className={`${styles.pageIndicator} ${
            currentPage === 1 ? styles.activePage : ''
          }`}
          onClick={handleNextPage}
        ></span>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 Dygav Check-in. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
