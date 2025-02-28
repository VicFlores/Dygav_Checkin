import axios from 'axios';

const crmApi = axios.create({
  baseURL: 'https://dygav-manager-api-b2jus.ondigitalocean.app/api/v1',

  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_X_API_Key_CRM,
    Accept: 'application/json',
  },
});

export default crmApi;
