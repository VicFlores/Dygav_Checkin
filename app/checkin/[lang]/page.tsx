import { Checkin } from '@/app/components';
import { SupportedLanguage } from '@/interfaces';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { getTranslations } from './translations/translate';

export const metadata: Metadata = {
  title: 'Dygav Checkin',
  description: 'Proceso de check-in para Dygav',
};

const CheckinPage = async ({
  params,
}: {
  params: Promise<{ lang: SupportedLanguage }>;
}) => {
  const { lang } = await params;
  const { dictionary } = await getTranslations(lang);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Checkin dictionary={dictionary} />
    </Suspense>
  );
};

export default CheckinPage;
