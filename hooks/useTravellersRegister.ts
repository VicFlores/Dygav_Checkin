import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  findGuestByReservation,
  insertTraveller,
  findTravellersByGuestId,
  findReservationById,
  deleteTravellerById,
} from '@/utils/helpers';
import checkinAPI from '@/utils/config/axiosConfig';

interface GuestInfo {
  guest_id: number;
}

interface Traveller {
  traveller_id: number;
  names: string;
  lastnames: string;
}

interface ReservationInfo {
  id: number;
  numberOfguests: number;
  number_travellers_register: number;
}

interface FormData {
  ageRange: string;
  firstName: string;
  lastName: string;
  documentType: string | null;
  documentNumber: string | null;
  documentSupport?: string | null;
  birthDate: string;
  email: string;
  phone: string;
  kinship: string | null;
  address: string;
  cityCode: string;
  city: string;
  postalCode: string;
  country: string;
}

export const useTravellersRegister = () => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [travellersByGuest, setTravellersByGuest] = useState<Traveller[]>([]);
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
    id: 0,
    numberOfguests: 0,
    number_travellers_register: 0,
  });
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({ guest_id: 0 });

  useEffect(() => {
    if (searchParams.has('reservationCode')) {
      const fetchGuestByReservation = async () => {
        try {
          const reservationCode = searchParams.get('reservationCode') as string;
          const [guest, reservation] = await Promise.all([
            findGuestByReservation(reservationCode),
            findReservationById(reservationCode),
          ]);

          setReservationInfo({
            ...reservation,
            number_travellers_register: guest.number_travellers_register,
          });

          setGuestInfo(guest);

          const travellers = await findTravellersByGuestId(guest.guest_id);
          setTravellersByGuest(travellers);
        } catch (error) {
          console.log('Error fetching guest by reservation:', error);
        }
      };

      fetchGuestByReservation();
    }
  }, [searchParams]);

  const addTraveller = async (data: FormData) => {
    try {
      await insertTraveller({
        address: data.address,
        age_range: data.ageRange.toUpperCase(),
        birthdate: data.birthDate,
        country: data.country,
        document_number: data.documentNumber || null,
        document_number_support: data.documentSupport || null,
        document_type: data.documentType || null,
        guest_id: guestInfo.guest_id,
        kinship: data.kinship || null,
        lastnames: data.lastName,
        municipality: data.city,
        municipality_code: data.cityCode,
        names: data.firstName,
        phone: data.phone,
        email: data.email,
        zip_code: data.postalCode,
      });

      const travellers = await findTravellersByGuestId(guestInfo.guest_id);
      setTravellersByGuest(travellers);
    } catch (error) {
      console.error('Error inserting traveller:', error);
    }
  };

  const updateTravellersCount = useCallback(
    async (newCount: number) => {
      try {
        await checkinAPI.put(`/guests?reservation_id=${reservationInfo.id}`, {
          number_travellers_register: newCount,
        });

        setReservationInfo((prev) => ({
          ...prev,
          number_travellers_register: newCount,
        }));
      } catch (error) {
        console.error('Error updating travellers count:', error);
      }
    },
    [reservationInfo.id]
  );

  const handleAddTraveller = useCallback(() => {
    if (
      reservationInfo.number_travellers_register <
      reservationInfo.numberOfguests
    ) {
      updateTravellersCount(reservationInfo.number_travellers_register + 1);
      setErrorMessage(null);
    } else {
      setErrorMessage(
        'No puedes agregar más huéspedes. Has alcanzado el límite.'
      );
    }
  }, [reservationInfo, updateTravellersCount]);

  const handleRemoveTraveller = useCallback(() => {
    if (reservationInfo.number_travellers_register > 0) {
      updateTravellersCount(reservationInfo.number_travellers_register - 1);
    }
  }, [reservationInfo, updateTravellersCount]);

  const deleteTraveller = useCallback(async (travellerId: number) => {
    try {
      await deleteTravellerById(travellerId);
      setTravellersByGuest((prevTravellers) =>
        prevTravellers.filter(
          (traveller) => traveller.traveller_id !== travellerId
        )
      );
    } catch (error) {
      console.log('Error deleting traveller:', error);
    }
  }, []);

  return {
    errorMessage,
    travellersByGuest,
    reservationInfo,
    addTraveller,
    handleAddTraveller,
    handleRemoveTraveller,
    deleteTraveller,
  };
};
