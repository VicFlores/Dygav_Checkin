import checkinAPI from '../config/axiosConfig';

export const findGuestByReservation = async (id: string) => {
  try {
    const getGuest = await checkinAPI.get(`/guests?reservation_id =${id}`);
    return getGuest.data;
  } catch (error) {
    console.log('Error fetching guest by reservation:', error);
    throw error;
  }
};
