import checkinAPI from '../config/axiosConfig';

export const facialRecognition = async (image1: File, image2: File) => {
  try {
    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);

    const response = await checkinAPI.post('/facial/recognition', formData, {
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
