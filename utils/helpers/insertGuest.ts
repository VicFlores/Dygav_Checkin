import checkinAPI from '../config/axiosConfig';
import { findReservationById } from './findReservationById';

export const insertGuest = async (reservationCode: string) => {
  try {
    const reservationInfo = await findReservationById(reservationCode);

    const guestData = {
      email: reservationInfo.travellerEmail,
      lastnames: reservationInfo.lastnames,
      names: reservationInfo.names,
      number_travellers_register: reservationInfo.numberOfguests,
      phone: reservationInfo.phone || '12345678',
      reservation_id: reservationInfo.id,
    };

    const response = await checkinAPI.post('/guests', guestData);

    return response.data;
  } catch (error) {
    console.log('Error inserting guest:', error);
    throw error;
  }
};
