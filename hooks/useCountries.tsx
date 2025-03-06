'use client';

import { useState, useEffect } from 'react';

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  translations: {
    spa: {
      common: string;
    };
  };
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2,translations'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }

        const data = await response.json();

        // Sort countries by Spanish name
        const sortedCountries = data.sort((a: Country, b: Country) => {
          const nameA = a.translations?.spa?.common || a.name.common;
          const nameB = b.translations?.spa?.common || b.name.common;
          return nameA.localeCompare(nameB);
        });

        setCountries(sortedCountries);
        setError(null);
      } catch (err) {
        setError('Error loading countries. Please try again.');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};
