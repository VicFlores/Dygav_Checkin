import checkinAPI from '../config/axiosConfig';

export const insertGuest = async (guestData: {
  facial_photo: string;
  id_reservation: string;
  identify_document_photo: string;
  lastnames: string;
  names: string;
  phone_email: string;
}) => {
  try {
    const response = await checkinAPI.post('/guest', guestData);

    return response.data;
  } catch (error) {
    console.log('Error inserting guest:', error);
    throw error;
  }
};
