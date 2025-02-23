'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosServices from 'utils/axios';
import Loader from 'components/Loader';

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken) {
        if (!refreshToken) {
          redirectToLogin();
          return;
        }

        try {
          // Attempt to refresh the token
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users/token-refresh/`, {
            refresh: refreshToken
          });

          localStorage.setItem('accessToken', data.access);
          setIsAuthenticated(true);
        } catch (refreshError) {
          console.log('Refresh token expired:', refreshError);
          redirectToLogin();
        }
      } else {
        try {
          await axiosServices.get('/users/token-verify/');
          setIsAuthenticated(true);
        } catch (error) {
          console.log('Auth verification failed:', error);
        }
      }

      setIsLoading(false);
    };

    const redirectToLogin = () => {
      const currentPath = encodeURIComponent(window.location.pathname);
      router.push(`/login?callbackUrl=${currentPath}`);
    };

    checkAuthentication();
  }, [router]);

  if (isLoading) return <Loader />;

  return isAuthenticated ? children : null;
}

AuthGuard.propTypes = { children: PropTypes.any };
