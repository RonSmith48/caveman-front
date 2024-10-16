'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from 'components/Loader';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        // No access token found, redirect to login with callback URL
        const currentPath = encodeURIComponent(window.location.pathname); // Get current page
        router.push(`/login?callbackUrl=${currentPath}`); // Redirect to login with the callback
      } else {
        // If access token exists, user is authenticated
        setIsAuthenticated(true);
      }

      setIsLoading(false); // End the loading state
    };

    checkAuthentication();
  }, [router]);

  if (isLoading) return <Loader />;

  // Render children only if authenticated
  return isAuthenticated ? children : null;
}

AuthGuard.propTypes = { children: PropTypes.any };
