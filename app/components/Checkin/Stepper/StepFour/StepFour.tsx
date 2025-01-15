'use client';

import { StepProps } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './StepFour.module.css';
import { useSearchParams } from 'next/navigation';
import {
  findGuestByReservation,
  findTravellersByGuestId,
} from '@/utils/helpers';
import { ModalSignature, SignatureCards } from '@/app/components/shared';
import { QRCodeSVG } from 'qrcode.react';

type Inputs = {
  signature: string;
};

interface Traveller {
  traveller_id: number;
  names: string;
  lastnames: string;
}

export const StepFour = ({ validate }: StepProps) => {
  const [travellersByGuest, setTravellersByGuest] = useState<Traveller[]>([]);
  const [selectedTraveller, setSelectedTraveller] = useState<Traveller | null>(
    null
  );
  const [modalState, setModalState] = useState({
    showSignatureModal: false,
    qrCodeUrl: '',
  });
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const { setValue } = useForm<Inputs & { ageRange: string }>();

  useEffect(() => {
    if (searchParams.has('reservationCode')) {
      const fetchGuestByReservation = async () => {
        try {
          const getGuestByReservation = await findGuestByReservation(
            searchParams.get('reservationCode') as string
          );

          const travellers = await findTravellersByGuestId(
            getGuestByReservation.data[0].guest_id
          );

          setTravellersByGuest(travellers.data);
        } catch (error) {
          console.log('Error fetching guest by reservation:', error);
        }
      };

      fetchGuestByReservation();
    }
  }, [searchParams]);

  const handleValidation = () => {
    const isValid = false; // Replace with actual validation logic
    validate(isValid);
  };

  const handleSaveSignature = (dataURL: string) => {
    if (!selectedTraveller) {
      alert('Please select a traveler first.');
      return;
    }

    setValue('signature', dataURL);

    console.log('Traveller Info:', selectedTraveller);
    console.log('Signature Data URL:', dataURL);

    // Integrate your service to upload the signature image here
    // Example:
    // uploadSignature(dataURL, selectedTraveller);
  };

  const handleButtonClick = (type: string) => {
    if (!selectedTraveller) {
      alert('Please select a traveler first.');
      return;
    }

    if (type === 'signature') {
      setModalState({ ...modalState, showSignatureModal: true });
    } else if (type === 'qrCode') {
      const url = `/checkin/signature?travelerId=${selectedTraveller.traveller_id}`;

      console.log('QR Code URL:', url);

      setModalState({ ...modalState, qrCodeUrl: url });
    } else if (type === 'shareLink') {
      const url = `/checkin/signature?travelerId=${selectedTraveller.traveller_id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      });
    }
  };

  const handleCloseSignaturePad = () => {
    setModalState({ ...modalState, showSignatureModal: false });
  };

  const handleTravellerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const traveller = travellersByGuest.find(
      (t) => t.traveller_id === parseInt(e.target.value)
    );
    setSelectedTraveller(traveller || null);
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
            <select
              className={styles.travellerSelect}
              onChange={handleTravellerChange}
            >
              <option value=''>Seleccione un viajero</option>
              {travellersByGuest.map((traveller) => (
                <option
                  key={traveller.traveller_id}
                  value={traveller.traveller_id}
                >
                  {traveller.names} {traveller.lastnames}
                </option>
              ))}
            </select>
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
    </div>
  );
};
