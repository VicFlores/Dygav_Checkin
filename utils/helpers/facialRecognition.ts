import checkinAPI from '../config/axiosConfig';

export const facialRecognition = async (image1: File, image2: File) => {
  try {
    const formData = new FormData();
    formData.append('source_image ', image1);
    formData.append('target_image ', image2);

    const response = await checkinAPI.post('/face-recognition', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error during facial recognition:', error);
    throw error;
  }
};
