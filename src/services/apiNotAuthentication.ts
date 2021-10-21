


import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const baseUrl = 'http://localhost:3333';

export async function postApiNotAuthentication<T>(url: string, data): Promise<T> {
  try {
    const response = await axios.post<T>(`${baseUrl}${url}`, data, { headers });
    console.log(response)
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}