import checkinAPI from '@/utils/config/axiosConfig';

export const findTravellerById = async (id: number) => {
  try {
    const traveller = await checkinAPI.get(`/travellers/${id}`);
    return traveller.data;
  } catch (error) {
    throw error;
  }
};
