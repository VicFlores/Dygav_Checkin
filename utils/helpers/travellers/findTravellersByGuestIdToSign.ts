import checkinAPI from '@/utils/config/axiosConfig';

export const findTravellersByGuestIdToSign = async (guestId: number) => {
  try {
    const getTravellers = await checkinAPI.get(
      `/travellers/${guestId}/signature/to-sign`
    );
    return getTravellers.data;
  } catch (error) {
    throw error;
  }
};
