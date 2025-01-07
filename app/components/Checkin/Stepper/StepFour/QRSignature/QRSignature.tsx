import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  url: string;
}

export const QRSignature: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  return (
    <div>
      <QRCodeSVG value={url} />
    </div>
  );
};
