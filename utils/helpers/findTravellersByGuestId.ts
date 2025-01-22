import checkinAPI from '../config/axiosConfig';

export const findTravellersByGuestId = async (id: string) => {
  try {
    const getTravellers = await checkinAPI.get(`/travellers?guest_id =${id}`);
    return getTravellers.data;
  } catch (error) {
    console.log('Error fetching travellers by guest ID:', error);
    throw error;
  }
};
