import axios from 'axios';

const checkinAPI = axios.create({
  // baseURL: 'https://checkinbackend-production-7c4a.up.railway.app/api/v1',
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_X_API_Key,
    Accept: 'application/json',
  },
});

export default checkinAPI;
