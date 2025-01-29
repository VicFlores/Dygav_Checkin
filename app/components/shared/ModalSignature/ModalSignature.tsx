/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import SignaturePad from 'signature_pad';
import styles from './ModalSignature.module.css';

interface ModalSignatureProps {
  show: boolean;
  onClose: () => void;
  onSave: (dataURL: string) => void;
}

export const ModalSignature: React.FC<ModalSignatureProps> = ({
  show,
  onClose,
  onSave,
}) => {
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const signaturePadRef = useRef<HTMLCanvasElement>(null);

  const resizeCanvas = () => {
    if (signaturePadRef.current) {
      const canvas = signaturePadRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
      if (signaturePad) {
        signaturePad.clear(); // otherwise isEmpty() might return incorrect value
      }
    }
  };

  useEffect(() => {
    if (signaturePadRef.current) {
      const canvas = signaturePadRef.current;
      const pad = new SignaturePad(canvas);
      setSignaturePad(pad);
      resizeCanvas();
    }

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [show]);

  const handleClearSignature = () => {
    signaturePad?.clear();
  };

  const handleSaveSignature = () => {
    if (signaturePad) {
      const dataURL = signaturePad.toDataURL();
      onSave(dataURL);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <RiCloseLine className={styles.closeButton} onClick={onClose} />

        <div className={styles.signatureContainer}>
          <canvas ref={signaturePadRef} className={styles.signatureCanvas} />

          <button type='button' onClick={handleClearSignature}>
            Limpiar
          </button>

          <button type='button' onClick={handleSaveSignature}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
