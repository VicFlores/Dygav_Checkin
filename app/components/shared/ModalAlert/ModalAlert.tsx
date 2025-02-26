import React, { useState } from 'react';
import styles from './ModalAlert.module.css';

interface ModalProps {
  title?: string;
  message: string;
  onAccept: () => void;
  isForm?: boolean;
  onSubmit?: (data: { phone: string; email: string }) => void;
}

export const ModalAlert: React.FC<ModalProps> = ({
  message,
  onAccept,
  isForm = false,
  onSubmit,
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ phone, email });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>¡Atención!</h2>
        <p className={styles.message}>{message}</p>
        {isForm ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type='tel'
                placeholder='Número de teléfono'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type='email'
                placeholder='Correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type='submit' className={styles.acceptButton}>
              Finalizar Proceso
            </button>
          </form>
        ) : (
          <button className={styles.acceptButton} onClick={onAccept}>
            Aceptar
          </button>
        )}
      </div>
    </div>
  );
};
