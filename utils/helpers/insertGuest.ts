import checkinAPI from '../config/axiosConfig';
import { findReservationById } from './findReservationById';

export const insertGuest = async (
  facial_photo: string,
  identify_document_photo: string,
  reservationCode: string
) => {
  try {
    const reservationInfo = await findReservationById(reservationCode);

    const guestData = {
      facial_photo,
      identify_document_photo,
      reservation_id: reservationInfo.id,
      names: reservationInfo.names,
      lastnames: reservationInfo.lastnames,
      email: reservationInfo.travellerEmail,
      phone: reservationInfo.phone || '12345678',
    };

    const response = await checkinAPI.post('/guests', guestData);

    return response.data;
  } catch (error) {
    console.log('Error inserting guest:', error);
    throw error;
  }
};
