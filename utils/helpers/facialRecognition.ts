import { AxiosError } from 'axios';
import checkinAPI from '../config/axiosConfig';

export const facialRecognition = async (
  source_image: File,
  target_image: File
) => {
  try {
    const formData = new FormData();
    formData.append('source_image', source_image);
    formData.append('target_image', target_image);

    const response = await checkinAPI.post('/face-recognition', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      throw new Error(error.response.data.detail.message);
    } else if (error instanceof AxiosError && error.response?.status === 404) {
      throw new Error(error.response.data.detail.message);
    } else {
      throw new Error(
        'Ocurrio un error inesperado. Por favor, intenta de nuevo.'
      );
    }
  }
};
