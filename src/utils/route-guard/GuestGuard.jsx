'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// project import
import Loader from 'components/Loader';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // If access token exists, user is authenticated, redirect to default path
        router.push(APP_DEFAULT_PATH);
      } else {
        // User is not authenticated, allow access to guest routes
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  if (isLoading) return <Loader />;

  return children;
}

GuestGuard.propTypes = { children: PropTypes.any };
