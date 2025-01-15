import checkinAPI from '../config/axiosConfig';

export const insertGuest = async (guestData: {
  facial_photo: string;
  reservation_id: string;
  identify_document_photo: string;
  lastnames: string;
  names: string;
  phone: string;
  email: string;
}) => {
  try {
    const response = await checkinAPI.post('/guest', guestData);

    return response.data;
  } catch (error) {
    console.log('Error inserting guest:', error);
    throw error;
  }
};
