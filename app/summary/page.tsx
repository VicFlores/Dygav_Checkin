import React, { Suspense } from 'react';
import { SummaryInformation } from '../components';

const SummaryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryInformation />
    </Suspense>
  );
};

export default SummaryPage;
