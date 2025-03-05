import React, { useState, useEffect } from 'react';
import styles from './ModalAlert.module.css';

interface ModalProps {
  title?: string;
  message: string;
  onAccept: () => void;
  isForm?: boolean;
  onSubmit?: (data: { phone: string; email: string }) => void;
  defaultPhone?: string;
  defaultEmail?: string;
  error?: string | null;
}

export const ModalAlert: React.FC<ModalProps> = ({
  message,
  onAccept,
  isForm = false,
  onSubmit,
  defaultPhone = '',
  defaultEmail = '',
  error = null,
}) => {
  const [phone, setPhone] = useState(defaultPhone);
  const [email, setEmail] = useState(defaultEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPhone(defaultPhone);
    setEmail(defaultEmail);
  }, [defaultPhone, defaultEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit({ phone, email });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>¡Atención!</h2>
        <p className={styles.message}>{message}</p>
        {isForm ? (
          <form onSubmit={handleSubmit}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.formGroup}>
              <label htmlFor='phone' className={styles.formLabel}>
                Número de teléfono (Asegúrate de escribir el codigo de pais,
                ejem: +52)
              </label>
              <input
                id='phone'
                type='tel'
                placeholder='Número de teléfono'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='email' className={styles.formLabel}>
                Correo electrónico
              </label>
              <input
                id='email'
                type='email'
                placeholder='Correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type='submit'
              className={styles.acceptButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
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
