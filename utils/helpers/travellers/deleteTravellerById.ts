import checkinAPI from '@/utils/config/axiosConfig';

export const deleteTravellerById = async (id: number) => {
  try {
    const res = await checkinAPI.delete(`/travellers/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
