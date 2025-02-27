'use client';

import { StepProps } from '@/interfaces';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import styles from './ElectronicSignatureStep.module.css';
import { useElectronicSignature } from '@/hooks/useElectronicSignature';
import {
  ModalAlert,
  ModalSignature,
  SignatureCards,
} from '@/app/components/shared';
import { QRCodeSVG } from 'qrcode.react';
import { useTravellersRegister } from '@/hooks';

type Inputs = {
  signature: string;
};

export const ElectronicSignatureStep = ({ validate }: StepProps) => {
  const {
    travellersWithSignature,
    travellersByGuest,
    selectedTraveller,
    modalState,
    copied,
    showAlert,
    handleSaveSignature,
    handleButtonClick,
    handleTravellerClick,
    handleCloseSignaturePad,
    handleCloseAlert,
  } = useElectronicSignature();

  const { reservationInfo } = useTravellersRegister();

  const { setValue } = useForm<Inputs & { ageRange: string }>();

  const handleValidation = () => {
    const isValid =
      reservationInfo.number_travellers_register ===
      travellersWithSignature.length;

    // if (isValid) {
    //   setShowCompleteModal(true);
    // }

    validate(isValid);
  };

  return (
    <div className={styles.container}>
      <form>
        <fieldset className={styles.stepFieldset}>
          <legend className={styles.stepLegendTitle}>Firma del viajero</legend>

          <p className={styles.stepDescription}>
            Cada uno de los viajeros debe ingresar su firma electronica
          </p>

          <div className={styles.travellerList}>
            <h3>Selecciona un viajero:</h3>

            <div className={styles.travellerBoxes}>
              {travellersByGuest.map((traveller) => {
                const hasSigned = travellersWithSignature.some(
                  (t) => t.traveller_id === traveller.traveller_id
                );
                const isSelected =
                  selectedTraveller?.traveller_id === traveller.traveller_id;
                return (
                  <div
                    key={traveller.traveller_id}
                    className={`${styles.travellerBox} ${
                      hasSigned
                        ? styles.travellerBox_signed
                        : styles.travellerBox_pending
                    } ${isSelected ? styles.travellerBox_selected : ''}`}
                    onClick={() => handleTravellerClick(traveller)}
                  >
                    {traveller.names} {traveller.lastnames}
                    {hasSigned && <FaCheck className={styles.checkIcon} />}
                  </div>
                );
              })}
            </div>
          </div>

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
                onSave={(dataURL) => {
                  setValue('signature', dataURL);
                  handleSaveSignature(dataURL);
                }}
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
                <QRCodeSVG
                  className={styles.QRCode}
                  value={modalState.qrCodeUrl}
                />
              )}
            </SignatureCards>

            <SignatureCards
              imageSrc='tempImages/Share link-rafiki.svg'
              title='Compartir link'
              description='Si el viajero que se ha registrado se encuentra en una ubicacion diferente genera un link y comparteselo para que pueda realizar su firma electronica'
              buttonText='Compartir link unico'
              onClick={() => handleButtonClick('shareLink')}
            >
              {copied && <p className={styles.copiedMessage}>Link copiado!</p>}
            </SignatureCards>
          </div>
        </fieldset>
      </form>

      <button className={styles.nextStepButton} onClick={handleValidation}>
        Continuar
      </button>

      {showAlert && (
        <ModalAlert
          message='Por favor, selecciona un viajero para continuar.'
          onAccept={handleCloseAlert}
        />
      )}
    </div>
  );
};
