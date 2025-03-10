import React from 'react';
import { Home } from '../components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkin - Home',
  description: 'Checkin - Home',
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
