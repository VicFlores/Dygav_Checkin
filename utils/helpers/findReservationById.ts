import checkinAPI from '../config/axiosConfig';

export const findReservationById = async (id: string) => {
  try {
    const getReservation = await checkinAPI.get(
      `/guests/reservation?reservation_id =${id}`
    );
    return getReservation.data;
  } catch (error) {
    console.log('Error fetching reservation:', error);
    throw error;
  }
};
