import checkinAPI from '@/utils/config/axiosConfig';

export const updateTravellersCount = async (
  newCount: number,
  reservationId: number
) => {
  try {
    const res = await checkinAPI.put(
      `/guests?reservation_id=${reservationId}`,
      {
        number_travellers_register: newCount,
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
