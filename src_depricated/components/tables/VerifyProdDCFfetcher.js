import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'utils/axios';

export const endpoints = {
  key: 'api/reports',
  getDrillActivity: '/verify-prod-drill',
  getChargeActivity: '/verify-prod-charge',
  getFireActivity: '/verify-prod-fire'
};

export function useGetReport() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.getDrillActivity, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      report: data?.report,
      reportLoading: isLoading,
      reportError: error,
      reportValidating: isValidating,
      reportEmpty: !isLoading && !data?.report?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetReportMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.actions, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      reportMaster: data,
      reportMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}
