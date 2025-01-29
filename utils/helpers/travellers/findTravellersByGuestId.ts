import checkinAPI from '@/utils/config/axiosConfig';

export const findTravellersByGuestId = async (id: number) => {
  try {
    const getTravellers = await checkinAPI.get(`/travellers?guest_id=${id}`);
    return getTravellers.data;
  } catch (error) {
    throw error;
  }
};
