import React, { Suspense } from 'react';
import { SummaryInformation } from '../components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resumen',
  description: 'Resumen de la información del proceso de check-in',
};

const SummaryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryInformation />
    </Suspense>
  );
};

export default SummaryPage;
