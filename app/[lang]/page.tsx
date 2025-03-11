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
  const { dictionary } = await getTranslations(lang);

  return <Home dictionary={dictionary} />;
};

export default HomePage;
