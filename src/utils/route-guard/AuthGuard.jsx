'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Correct way to import
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
        // Decode token to check expiration
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token expired, remove it and redirect
          localStorage.removeItem('accessToken');
          redirectToLogin();
          return;
        }

        // Token is valid
        setIsAuthenticated(true);
      } catch (error) {
        // Error decoding token (possible invalid token format)
        localStorage.removeItem('accessToken');
        redirectToLogin();
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
