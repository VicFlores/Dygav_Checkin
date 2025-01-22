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
    console.log('Error during facial recognition:', error);
    throw error;
  }
};
