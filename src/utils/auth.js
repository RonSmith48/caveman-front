import axiosServices from 'utils/axios';
import { fetcherPatch, fetcherPost } from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

export const signIn = async (email, password) => {
  try {
    const response = await axiosServices.post('users/login/', { email, password });

    const { user, tokens } = response.data;

    // Store user and tokens in localStorage
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('user', JSON.stringify(user));

    return { ok: true, user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const signOut = async () => {
  // Clear tokens and user data from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

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

      return { ok: true, user };
    }

    return { ok: false, error: 'Registration failed' };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Registration failed';
    return { ok: false, error: errorMessage };
  }
};

export const updateUser = async (updatedUserData) => {
  console.log('updated user data', updatedUserData); //===============
  try {
    const response = await fetcherPatch('users/update/', updatedUserData);

    console.log('response:', response); //============
    if (response.msg.type === 'success') {
      const currentUser = JSON.parse(localStorage.getItem('user'));

      const updatedUser = {
        ...currentUser,
        ...updatedUserData
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      enqueueSnackbar(response.msg.body, { variant: response.msg.type });

      return { ok: true, user: updatedUser };
    } else {
      enqueueSnackbar(response.msg.body, { variant: response.msg.type });
      return { ok: false, error: response.msg.body };
    }
  } catch (error) {
    console.log('error:', error); //==================
    const errorMessage = error?.response?.data?.message || 'Failed to update user';
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return { ok: false, error: errorMessage };
  }
};
