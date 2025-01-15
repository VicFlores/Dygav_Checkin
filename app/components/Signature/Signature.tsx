'use client';

import React, { useState } from 'react';
import styles from './Signature.module.css';
import { ModalSignature, SignatureCards } from '../shared';

export const Signature = () => {
  const [modalState, setModalState] = useState({
    showSignatureModal: false,
    qrCodeUrl: '',
  });

  const handleButtonClick = () => {
    setModalState({ ...modalState, showSignatureModal: true });
  };

  const handleCloseSignaturePad = () => {
    setModalState({ ...modalState, showSignatureModal: false });
  };

  const handleSaveSignature = (dataURL: string) => {
    console.log(dataURL);

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
    </section>
  );
};
