import React from 'react';
import { Home } from '../components';
import { Metadata } from 'next';
import { getTranslations } from './translations/translate';
import { SupportedLanguage } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Checkin - Home',
  description: 'Checkin - Home',
};

const HomePage = async ({
  params,
}: {
  params: Promise<{ lang: SupportedLanguage }>;
}) => {
  const { lang } = await params;
  const { t } = await getTranslations(lang);

  console.log(t('hello'));

  return <Home />;
};

export default HomePage;
