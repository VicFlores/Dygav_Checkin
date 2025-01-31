import { Checkin } from '@/app/components';
import React, { Suspense } from 'react';

const CheckinPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Checkin />
    </Suspense>
  );
};

export default CheckinPage;
