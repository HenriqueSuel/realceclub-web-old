import axios from 'axios';
import { parseCookies } from 'nookies';

const headers = {
  'Content-Type': 'application/json',
  Authorization: ''
};

const baseUrl = 'http://localhost:3333';


export async function getAuth<T>(url: string): Promise<T> {
  try {
    const { 'nextauth.token': token } = parseCookies()
    headers.Authorization = token;
    const response = await axios.get<T>(`${baseUrl}${url}`, { headers });
    return response.data;
  } catch (err) {
    console.log('postApiNotAuthentication', err.response.data.message)
    throw new Error(err.response.data.message)
  }
}