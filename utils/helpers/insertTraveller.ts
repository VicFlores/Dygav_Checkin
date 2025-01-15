import checkinAPI from '../config/axiosConfig';

interface TravellerData {
  address: string;
  age_range: string;
  birthdate: string;
  country: string;
  document_number: string | null;
  document_number_support: string | null;
  document_type: string | null;
  guest_id: number;
  kinship: string | null;
  lastnames: string;
  municipality: string;
  municipality_code: string;
  names: string;
  phone: string;
  email: string;
  zip_code: string;
}

export const insertTraveller = async (travellerData: TravellerData) => {
  try {
    const response = await checkinAPI.post('/traveller', travellerData);
    return response.data;
  } catch (error) {
    console.log('Error inserting traveller:', error);
    throw error;
  }
};
