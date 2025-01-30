import checkinAPI from '@/utils/config/axiosConfig';

export const updateTravellerSignature = async (
  travelId: number,
  signature: string
) => {
  try {
    const res = await checkinAPI.put(`/travellers/${travelId}/signature`, {
      signature,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
