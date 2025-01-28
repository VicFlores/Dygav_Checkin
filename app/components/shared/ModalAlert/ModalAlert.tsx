import React from 'react';
import styles from './ModalAlert.module.css';

interface ModalProps {
  message: string;
  onAccept: () => void;
}

export const ModalAlert: React.FC<ModalProps> = ({ message, onAccept }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button className={styles.acceptButton} onClick={onAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
};
