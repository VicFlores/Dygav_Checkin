import React, { Suspense } from 'react';
import { Signature } from '@/app/components';

const SignaturePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signature />
    </Suspense>
  );
};

export default SignaturePage;
