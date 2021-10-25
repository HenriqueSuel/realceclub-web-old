import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const baseUrl = 'http://localhost:3333';


export async function postApiNotAuthentication<T>(url: string, data): Promise<T> {
  try {
    const response = await axios.post<T>(`${baseUrl}${url}`, data, { headers });
    return response.data;
  } catch (err) {
    console.log('postApiNotAuthentication', err.response.data.message)
    throw new Error(err.response.data.message)
  }
}