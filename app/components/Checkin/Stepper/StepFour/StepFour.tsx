'use client';

import { StepProps } from '@/interfaces';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalSignature } from './ModalSignature/ModalSignature';
import { QRSignature } from './QRSignature/QRSignature';
import { v4 as uuidv4 } from 'uuid';
import styles from './StepFour.module.css';
import { SignatureCards } from './SignatureCards/SignatureCards';

type Inputs = {
  signature: string;
};

export const StepFour = ({ validate }: StepProps) => {
  const [modalState, setModalState] = useState({
    showSignatureModal: false,
    qrCodeUrl: '',
  });

  const { setValue } = useForm<Inputs & { ageRange: string }>();

  const handleValidation = () => {
    const isValid = false; // Replace with actual validation logic
    validate(isValid);
  };

  const handleSaveSignature = (dataURL: string) => {
    setValue('signature', dataURL);
    console.log(dataURL); // You can save this data URL to your server or state
  };

  const handleButtonClick = (type: string) => {
    if (type === 'signature') {
      setModalState({ ...modalState, showSignatureModal: true });
    } else if (type === 'qrCode') {
      const id = uuidv4();

      const url = `http://localhost:3000/checkin/qr-code?travelerId=${id}`; // Replace with your actual URL

      setModalState({ ...modalState, qrCodeUrl: url });

      setValue('signature', id);
    } else if (type === 'shareLink') {
      // Share link logic here
    }
  };

  const handleCloseSignaturePad = () => {
    setModalState({ ...modalState, showSignatureModal: false });
  };

  return (
    <div className={styles.container}>
      <form>
        <fieldset className={styles.stepFieldset}>
          <legend className={styles.stepLegendTitle}>Firma del viajero</legend>
          <p className={styles.stepDescription}>
            Cada uno de los viajeros debe ingresar su firma electronica
          </p>

          <div className={styles.stepCards}>
            <SignatureCards
              imageSrc='tempImages/Signing a contract-amico.svg'
              title='Abrir lienzo para firma digital'
              description='Si tienes una pantalla tactil te recomendamos abrir un lienzo para que puedas hacer tu firma electronica.'
              buttonText='Abrir lienzo'
              onClick={() => handleButtonClick('signature')}
            >
              <ModalSignature
                show={modalState.showSignatureModal}
                onClose={handleCloseSignaturePad}
                onSave={handleSaveSignature}
              />
            </SignatureCards>

            <SignatureCards
              imageSrc='tempImages/QR Code-amico.svg'
              title='Generar codigo QR'
              description='Si no tienes una pantalla tactil genera un QR para que puedas escaearlo con tu dispositivo y asi poder hacer tu forma electronica.'
              buttonText='Generar codigo QR'
              onClick={() => handleButtonClick('qrCode')}
            >
              {modalState.qrCodeUrl && (
                <QRSignature url={modalState.qrCodeUrl} />
              )}
            </SignatureCards>

            <SignatureCards
              imageSrc='tempImages/Share link-rafiki.svg'
              title='Compartir link'
              description='Si el viajero que se ha registrado se encuentra en una ubicacion diferente genera un link y comparteselo para que pueda realizar su firma electronica'
              buttonText='Compartir link unico'
              onClick={() => handleButtonClick('shareLink')}
            />
          </div>
        </fieldset>
      </form>

      <button className={styles.nextStepButton} onClick={handleValidation}>
        Continuar
      </button>
    </div>
  );
};
