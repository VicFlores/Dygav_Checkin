import React, { Suspense } from 'react';
import { Signature } from '@/app/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proceso de firma',
  description: 'Proceso de firma para Dygav',
};

const SignaturePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signature />
    </Suspense>
  );
};

export default SignaturePage;
