import { Checkin } from '@/app/components';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dygav Checkin',
  description: 'Proceso de check-in para Dygav',
};

const CheckinPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Checkin />
    </Suspense>
  );
};

export default CheckinPage;
