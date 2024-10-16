import axiosServices from 'utils/axios'; // Your custom axios instance
import { APP_DEFAULT_PATH } from 'config';

// Custom signIn function
export const signIn = async (email, password) => {
  try {
    // Send login request to the backend API
    const response = await axiosServices.post('users/login/', { email, password });

    const { user, tokens } = response.data;

    if (user && tokens) {
      // Store user and tokens in localStorage
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to default path
      window.location.href = APP_DEFAULT_PATH;

      return { ok: true, user };
    }

    return { ok: false, error: 'Login failed' };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Login failed';
    return { ok: false, error: errorMessage };
  }
};

// Custom register function
export const register = async (firstname, lastname, email, password) => {
  try {
    // Send registration request to the backend API
    const response = await axiosServices.post('users/register/', {
      firstName: firstname,
      lastName: lastname,
      email,
      password
    });

    const { user, tokens } = response.data;

    if (user && tokens) {
      // Store user and tokens in localStorage
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to default path after registration
      window.location.href = APP_DEFAULT_PATH;

      return { ok: true, user };
    }

    return { ok: false, error: 'Registration failed' };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Registration failed';
    return { ok: false, error: errorMessage };
  }
};
