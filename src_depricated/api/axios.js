// Author: Ron Smith
// Date: 13.01.23
// Ref: https://youtu.be/nI8PYZNFtac (Dave Gray)

import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export default axios.create({
  baseURL: BASE_URL
});

// with interceptors
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  try {
    const res = await axiosPrivate.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);

    if (error.response && error.response.status === 401) {
      // We just need to wait a sec
      console.error('Auth token not properly loaded', error.response.data);
    } else if (error.response) {
      // Server responded with an error
      console.error('Server error details:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something else went wrong
      console.error('Error details:', error.message);
    }

    throw error; // Rethrow the error to be caught by the caller
  }
};
