import { ReactNode } from 'react';
import styles from './SignatureCards.module.css';
import Image from 'next/image';

type StepCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  children?: ReactNode;
};

export const SignatureCards: React.FC<StepCardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  onClick,
  children,
}) => (
  <div className={styles.stepCard}>
    <figure className={styles.figureImage}>
      <Image src={imageSrc} alt='ID Card' layout='fill' />
    </figure>
    <h3>{title}</h3>
    <p>{description}</p>
    <button type='button' onClick={onClick}>
      {buttonText}
    </button>
    {children}
  </div>
);
