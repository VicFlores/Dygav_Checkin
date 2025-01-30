'use client';

import React, { useEffect, useState } from 'react';
import styles from './Signature.module.css';
import { ModalSignature, SignatureCards } from '../shared';
import { useSearchParams } from 'next/navigation';
import { findTravellerById, updateTravellerSignature } from '@/utils/helpers';

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();

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

  const handleSaveSignature = async (dataURL: string) => {
    console.log(dataURL);

    if (traveller) {
      await updateTravellerSignature(
        traveller.traveller_id,
        'http://example.com/signature.jpg'
      );

      setModalState({ ...modalState, showSignatureModal: false });
      setSuccessMessage(
        'Firma electronica guardada exitosamente. Puedes cerrar esta ventana.'
      );
    } else {
      console.error('Traveller is undefined');
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Firma electronica</h1>

      <p className={styles.subtitle}>
        Para poder continuar con el proceso de check-in, necesitamos que
        realices tu firma electronica.
      </p>

      <SignatureCards
        imageSrc='/tempImages/Signing a contract-amico.svg'
        title='Abrir lienzo para firma digital'
        description='Utilizando tu dispositivo tactil, puedes abrir un lienzo para hacer tu firma electronica.'
        buttonText='Abrir lienzo'
        onClick={handleButtonClick}
      >
        <ModalSignature
          show={modalState.showSignatureModal}
          onClose={handleCloseSignaturePad}
          onSave={handleSaveSignature}
        />
      </SignatureCards>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
    </section>
  );
};
