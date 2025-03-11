'use client';

import React, { useEffect, useState } from 'react';
import styles from './Signature.module.css';
import { ModalSignature, SignatureCards } from '../shared';
import { useSearchParams } from 'next/navigation';
import { findTravellerById } from '@/utils/helpers';
import { useElectronicSignature } from '@/hooks/useElectronicSignature';

interface Traveller {
  traveller_id: number;
  names: string;
  lastnames: string;
}

export const Signature = () => {
  const [traveller, setTraveller] = useState<Traveller>();
  const [modalState, setModalState] = useState({
    showSignatureModal: false,
    qrCodeUrl: '',
  });

  const searchParams = useSearchParams();

  const { handleSaveSignature, successMessage } = useElectronicSignature();

  useEffect(() => {
    if (searchParams.has('travelerId')) {
      const fetchTraveller = async () => {
        try {
          const res = await findTravellerById(
            Number(searchParams.get('travelerId'))
          );

          setTraveller(res);
        } catch (error) {
          console.log(error);
        }
      };

      fetchTraveller();
    }
  }, [searchParams]);

  const handleButtonClick = () => {
    setModalState({ ...modalState, showSignatureModal: true });
  };

  const handleCloseSignaturePad = () => {
    setModalState({ ...modalState, showSignatureModal: false });
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Firma electronica</h1>

      <p className={styles.subtitle}>
        Para poder continuar con el proceso de check-in, necesitamos que
        realices tu firma electronica.
      </p>

      <SignatureCards
        imageSrc='https://dygav-storage.nyc3.cdn.digitaloceanspaces.com/dygav-checkin/images/Signing%20a%20contract-amico.svg'
        title='Abrir lienzo para firma digital'
        description='Utilizando tu dispositivo tactil, puedes abrir un lienzo para hacer tu firma electronica.'
        buttonText='Abrir lienzo'
        onClick={handleButtonClick}
      >
        <ModalSignature
          show={modalState.showSignatureModal}
          onClose={handleCloseSignaturePad}
          onSave={(dataURL) => handleSaveSignature(dataURL, traveller)}
        />
      </SignatureCards>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
    </section>
  );
};
