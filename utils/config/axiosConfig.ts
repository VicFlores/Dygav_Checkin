import axios from 'axios';

const checkinAPI = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default checkinAPI;
