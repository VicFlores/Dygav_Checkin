import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import styles from './IdentifyVerificationCard.module.css';
import { FC } from 'react';

interface FormData {
  idCard: FileList;
  profilePic: FileList;
}

interface IdentifyVerificationCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  registerProps: ReturnType<UseFormRegister<FormData>>;
  uploaded: boolean;
  error: boolean;
}

export const IdentifyVerificationCard: FC<IdentifyVerificationCardProps> = ({
  title,
  imageSrc,
  imageAlt,
  registerProps,
  uploaded,
  error,
}) => {
  const cardClassName = `${styles.stepCard} ${
    error ? styles.error : uploaded ? styles.success : ''
  }`;

  return (
    <div className={cardClassName}>
      <figure className={styles.figureImage}>
        <Image src={imageSrc} alt={imageAlt} layout='fill' />
      </figure>

      <h3>{title}</h3>

      <label className={styles.customFileUpload}>
        Subir foto
        <input type='file' {...registerProps} />
      </label>

      {uploaded && <span className={styles.checkmark}>✔</span>}
    </div>
  );
};
