import checkinAPI from '@/utils/config/axiosConfig';
import { AxiosError } from 'axios';

export const findGuestByReservation = async (id: string) => {
  try {
    const getGuest = await checkinAPI.get(`/guests?reservation_id=${id}`);
    return getGuest.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null; // Guest not found
    }
    console.log('Error fetching guest by reservation:', error);
    throw error;
  }
};
