import axios from 'axios';

const checkinAPI = axios.create({
  baseURL: 'https://checkinbackend-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_X_API_Key,
    Accept: 'application/json',
  },
});

export default checkinAPI;
