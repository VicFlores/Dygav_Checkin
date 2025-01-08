import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './QRSignature.module.css';

interface QRCodeGeneratorProps {
  url: string;
}

export const QRSignature: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  return (
    <div className={styles.container}>
      <QRCodeSVG value={url} />
    </div>
  );
};
