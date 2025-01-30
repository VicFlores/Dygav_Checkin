import checkinAPI from '@/utils/config/axiosConfig';

export const findTravellersByGuestIdWithSignature = async (guestId: number) => {
  try {
    const getTravellers = await checkinAPI.get(
      `/travellers/${guestId}/signature`
    );
    return getTravellers.data;
  } catch (error) {
    throw error;
  }
};
