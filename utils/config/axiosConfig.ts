import axios from 'axios';

const checkinAPI = axios.create({
  baseURL: 'https://checkinbackend-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default checkinAPI;
