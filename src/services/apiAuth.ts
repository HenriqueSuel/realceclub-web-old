import axios from 'axios';
import { parseCookies } from 'nookies';

const headers = {
  'Content-Type': 'application/json',
  Authorization: ''
};

const baseUrl = process.env.NEXT_PUBLIC_API;

export async function getAuth<T>(url: string): Promise<T> {
  try {
    const { 'nextauth.token': token } = parseCookies()
    headers.Authorization = 'Bearer ' + token;
    const response = await axios.get<T>(`${baseUrl}${url}`, { headers });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function postAuth<T>(url: string, data): Promise<T> {
  try {
    const { 'nextauth.token': token } = parseCookies()
    headers.Authorization = 'Bearer ' + token;
    const response = await axios.post<T>(`${baseUrl}${url}`,data, { headers });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}