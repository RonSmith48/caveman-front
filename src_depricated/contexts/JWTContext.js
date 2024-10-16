import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, UPDATE_PROFILE } from 'contexts/auth-reducer/actions';
import auth from 'contexts/auth-reducer/auth';
//import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import axios from 'api/axios';
import { enqueueSnackbar } from 'notistack';
import { logDebug } from 'logger';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  logDebug('verifying JWT token', serviceToken);
  if (!serviceToken) {
    logDebug('Token rejected');
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  logDebug('Decoded token', decoded);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (tokens, user = null) => {
  logDebug('Setting session in local storage');
  if (tokens && user) {
    logDebug('Tokens and user present');
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refresh));
    localStorage.setItem('serviceToken', JSON.stringify(tokens.access));
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${tokens.access}`;
  } else {
    logDebug('Tokens and user not present, removing token and user from local storage');
    localStorage.removeItem('serviceToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth, initialState);

  useEffect(() => {
    const init = async () => {
      logDebug('JWTContext called');
      try {
        logDebug('Attempting to fetch token and user from storage');
        const storedServiceToken = window.localStorage.getItem('serviceToken');
        const storedRefreshToken = window.localStorage.getItem('refreshToken');
        const storedUser = window.localStorage.getItem('user');

        // Parse the stored tokens and user from JSON
        logDebug('Parsing tokens');
        const serviceToken = storedServiceToken ? JSON.parse(storedServiceToken) : null;
        const refreshToken = storedRefreshToken ? JSON.parse(storedRefreshToken) : null;
        const user = storedUser ? JSON.parse(storedUser) : null;
        logDebug('service token', serviceToken);
        logDebug('refresh token', refreshToken);
        logDebug('user', user);

        // Now, verifyToken needs the actual token string, not an object
        if (serviceToken && verifyToken(serviceToken)) {
          logDebug('Service token valid, setting axios header with service token');
          axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
          logDebug('Setting logged in as true and setting user', user);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else if (refreshToken && verifyToken(refreshToken)) {
          logDebug('Refresh token accepted');
          try {
            logDebug('Requesting new refresh token from API');
            const response = await axios.post('/api/account/token-refresh/', { refresh: refreshToken });
            setSession(response.data, user); // response.data contains both access and refresh tokens
            logDebug('Setting logged in to true, user', user);
            dispatch({
              type: LOGIN,
              payload: {
                isLoggedIn: true,
                user
              }
            });
          } catch (err) {
            console.error(err);
            logDebug('Logout');
            dispatch({
              type: LOGOUT
            });
          }
        } else {
          logDebug('Both service and refresh tokens rejected, Logout dispatched');
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error('Get token from local storage failed', err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    logDebug('login called');
    const response = await axios.post('/api/users/login/', { email, password });
    const { tokens, user } = response.data;
    logDebug('token and user returned', tokens, user);
    setSession(tokens, user);
    logDebug('setting logged in true, user', user);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register/', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    logDebug('Logout called');
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async () => {};

  const updateProfile = async (values) => {
    const updatedProfile = {
      ...values,
      full_name: `${values.first_name} ${values.last_name}`
    };
    const currentUser = state.user;
    // changing user
    const updatedUser = { ...currentUser, ...updatedProfile };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // dispatch to reducer
    dispatch({
      type: UPDATE_PROFILE,
      payload: updatedUser
    });

    try {
      // update database
      // eslint-disable-next-line no-unused-vars
      const { submit, email, ...payload } = updatedProfile;
      const response = await axios.post('/api/account/update-profile/', payload);

      // user feedback
      if (response.status === 200) {
        enqueueSnackbar('Personal profile updated successfully.', { variant: 'success' });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        if (status === 400) {
          errorMessage = 'Please check your input and try again.';
        } else if (status === 401) {
          errorMessage = 'You are not authorized. Please log in and try again.';
        } else if (status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (status === 404) {
          errorMessage = 'Requested resource not found.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later or contact support.';
        }
        // If the server provides a specific error message, use it
        if (data && data.error) {
          errorMessage = data.error;
        }
      } else {
        // The request was made but no response was received or error occurred in setting up the request
        console.error('Error', error.message);
      }
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
