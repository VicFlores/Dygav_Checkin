'use client';

import { StepProps } from '@/interfaces';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalSignature } from './ModalSignature/ModalSignature';
import { QRSignature } from './QRSignature/QRSignature';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import styles from './StepFour.module.css';

type Inputs = {
  signature: string;
};

export const StepFour = ({ validate }: StepProps) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const { setValue } = useForm<Inputs & { ageRange: string }>();

  const handleValidation = () => {
    // Perform validation logic here

    const isValid = false; // Replace with actual validation logic

    validate(isValid);
  };

  const handleSaveSignature = (dataURL: string) => {
    setValue('signature', dataURL);
    console.log(dataURL); // You can save this data URL to your server or state
  };

  const handleOpenSignaturePad = () => {
    setShowSignatureModal(true);
  };

  const handleCloseSignaturePad = () => {
    setShowSignatureModal(false);
  };

  const handleGenerateQRCode = () => {
    const id = uuidv4();

    const url = `http://localhost:3000/checkin/qr-code?travelerId=${id}`; // Replace with your actual URL
    setQrCodeUrl(url);
    setValue('signature', id);
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
            <div className={styles.stepCard}>
              <figure className={styles.figureImage}>
                <Image
                  src='tempImages/Signing a contract-amico.svg'
                  alt='ID Card'
                  layout='fill'
                />
              </figure>

              <h3>Abrir lienzo para firma digital</h3>

              <p>
                Si tienes una pantalla tactil te recomendamos abrir un lienzo
                para que puedas hacer tu firma electronica.
              </p>

              <button type='button' onClick={handleOpenSignaturePad}>
                Abrir lienzo
              </button>

              <ModalSignature
                show={showSignatureModal}
                onClose={handleCloseSignaturePad}
                onSave={handleSaveSignature}
              />
            </div>

            <div className={styles.stepCard}>
              <figure className={styles.figureImage}>
                <Image
                  src='tempImages/QR Code-amico.svg'
                  alt='ID Card'
                  layout='fill'
                />
              </figure>

              <h3>Generar codigo QR</h3>

              <p>
                Si no tienes una pantalla tactil genera un QR para que puedas
                escaearlo con tu dispositivo y asi poder hacer tu forma
                electronica.
              </p>

              <button type='button' onClick={handleGenerateQRCode}>
                Generar codigo QR
              </button>

              {qrCodeUrl && <QRSignature url={qrCodeUrl} />}
            </div>

            <div className={styles.stepCard}>
              <figure className={styles.figureImage}>
                <Image
                  src='tempImages/Share link-rafiki.svg'
                  alt='ID Card'
                  layout='fill'
                />
              </figure>

              <h3>Compartir link</h3>

              <p>
                Si el viajero que se ha registrado se encuentra en una ubicacion
                diferente genera un link y comparteselo para que pueda realizar
                su firma electronica
              </p>

              <button>Compartir link unico</button>
            </div>
          </div>
        </fieldset>
      </form>

      <button className={styles.nextStepButton} onClick={handleValidation}>
        Continuar
      </button>
    </div>
  );
};
