import checkinAPI from '../config/axiosConfig';

export const findReservationById = async (id: string) => {
  try {
    const getReservation = await checkinAPI.get(
      `/reservation?idReservation=${id}`
    );
    return getReservation.data;
  } catch (error) {
    console.log('Error fetching reservation:', error);
    throw error;
  }
};
