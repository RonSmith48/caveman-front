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
      if (!accessToken) {
        redirectToLogin();
        return;
      }

      try {
        // Make an authenticated request to verify token validity
        await axiosServices.get('/users/token-verify/');

        // If the request succeeds, the token is valid
        setIsAuthenticated(true);
      } catch (error) {
        console.log('Auth verification failed:', error);
        // axiosServices handles token refresh & redirect automatically
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
