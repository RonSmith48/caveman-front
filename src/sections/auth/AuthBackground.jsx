'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project import
import { ThemeDirection, ThemeMode } from 'config';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'absolute', opacity: 0.2, zIndex: -1, bottom: 0 }}>
      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="1100 -50 1540 1100" width="1540" height="900">
        <title>Evolution_Mining_logo-svg</title>
        <g id="#6f3e2fff">
          <path
            id="Layer"
            fill="#6f3e2f"
            d="m765.1 0h18.8c7.2 1 14.4 0.5 21.6 0.8 121.1 3.6 242.2 24.7 355.8 67.4 71.7 27.1 140.5 63.1 201.5 109.7 47.3 36.3 90 79.4 121.9 129.9 32.5 51.3 53 110.8 54.7 171.8 2.5 63.5-15.8 126.9-48 181.4-28.9 49.2-68.1 91.7-112 127.8-45.7 37.5-96.6 68.4-149.9 93.8-73.9 35.2-152.7 59.7-232.9 75.4-97.9 19.1-198.3 25.2-297.8 19.5-88.2-5.2-176.1-19.8-260.6-45.6-73.5-22.4-144.5-53.1-209.5-94-59.5-37.6-114.3-83.7-156.2-140.5-35.1-47.3-60.4-102.5-68.9-161-6.2-42.1-4-85.3 6.8-126.5 9.4-36.8 25.4-71.8 45.8-103.8 32.1-50.4 74.9-93.2 122.3-129.4 78.6-59.5 169.4-101.6 263.6-130 94-28.2 192-42.8 290-45.8 11-0.4 22-0.2 33-0.9zm-114.2 94.9c-29.3 1-58.6 3.3-87.7 7.1-84.3 10.8-167.4 34.7-242.4 75-44.8 24.1-86.9 53.6-122.7 89.8-41.6 41.9-74.1 93.3-91.4 150-8.9 28.6-13.9 58.3-15.7 88.2-3.4 58.7 12.5 117.7 41.4 168.7 19.2 34.2 43.9 65.3 71.9 92.7 52.2 51.4 115.5 90.5 182.3 120.2 77 34 159.2 55.4 242.6 66.2 99.1 12.8 200.2 11 298.7-5.9 83.7-14.4 165.7-39.5 242-76.8 54.1-26.7 106-59.1 149.8-100.9 20.4-19.6 38.8-41.4 54.3-65.1 26.6-39 43.7-84.6 48.3-131.6 3.5-34.7 0.2-70-8.9-103.6-14.8-54.6-44.7-104.4-82.9-145.9-25.3-27.9-54.5-51.9-85.3-73.4-31.7-22.2-65.3-41.7-100.1-58.5-76.5-36.9-158.7-60.4-242.1-75.4-42.7-7.5-85.6-13.5-128.7-17.4-41.1-3.4-82.3-4.8-123.4-3.4z"
          />
        </g>
        <g id="#a6442bff">
          <path
            id="Layer"
            fill="#a6442b"
            d="m628.9 119.2c51.1-2.5 102.4-1.1 153.3 4.1 92.4 9 184.4 26.9 272 58 73.3 26.1 143.8 61.7 204.5 110.6 27.5 22.2 52.9 47.2 74.8 75 19.7 25.3 36.5 52.9 48.6 82.6 12.7 30.6 20.3 63.4 21.6 96.5 1.6 34.5-4.1 69.3-16.8 101.5-10.8 28.1-26.8 54.2-45.8 77.6-38.7 47.4-88.8 83.9-141.9 113.6-71.2 39.7-148.7 67.7-228.3 85.4-98.4 21.8-200.2 27.9-300.6 19-88.5-7.9-176.2-27.6-258.5-61.2-66.3-27.3-129.6-63.6-182.9-111.8-28.1-25.3-53.2-54-73.6-85.9-23.6-36.8-40.7-78.3-47.3-121.7-5.4-34.6-3.9-70.2 3.4-104.4 11.9-55.9 40-107.6 77.1-150.9 33.9-39.6 75.2-72.6 120.1-99.2 71.4-42.2 152-67.4 233.7-80 28.7-4.4 57.6-7.2 86.6-8.8zm-65.6 85.2c-37 2.4-73.9 8.2-109.1 19.8-36.1 12.3-70.9 28.3-103.2 48.7-34.7 22-66.3 49.2-91.3 81.9-31.1 40.2-51.2 88.4-59.4 138.4-4.9 30.6-7 62-2.7 92.8 7.1 54 31.7 104.6 65.7 146.8 25.2 31.5 55.5 58.7 88.5 81.8 66.4 46.3 142.9 76.7 221.6 94.6 92 20.8 187.7 24.8 281.2 12.6 87.9-11.5 173.9-37.6 252.9-77.9 33.1-16.9 65.2-36.1 93.9-59.8 26.6-21.9 50.3-48.2 65.5-79.4 4.6-8.5 8.9-17.1 12.1-26.1 13.2-35.1 14.4-73.9 6.7-110.3-7.7-37.2-23.9-72.3-45-103.8-40.2-59.6-97.3-106.3-160.1-140.4-34.4-18.5-70.5-33.8-107-47.6-82.4-30.7-168-53-255.1-65.2-51.4-6.9-103.4-10.1-155.2-6.9z"
          />
        </g>
        <g id="#bc7130ff">
          <path
            id="Layer"
            fill="#bc7130"
            d="m578 226.7c48.6-2.1 97.4 1.4 145.4 9.4 21.9 3.5 43.7 8.2 65.4 13 45.4 10.1 90.5 22 134.8 36.3 36 11.9 71.7 25.2 105.8 41.8 19.4 9.4 38.8 18.8 57.1 30.1 32.4 19.5 62.7 42.5 89.7 68.9 26.3 26 49.4 55.4 66.4 88.3 18.2 35.3 29.5 74.8 28.4 114.8-0.6 23.7-6.4 47.3-16.8 68.6-15 30.8-38.7 56.5-65.1 77.8-29.8 24.1-63.1 43.3-97.4 60.2-77 38-160.6 62.3-245.9 72.8-98 11.9-198.3 5.8-293.9-19.3-74.2-19.7-146-51.1-207.4-97.7-32.4-24.8-61.8-53.9-84.9-87.6-21.7-31.3-37.8-66.6-45.3-104-10.1-49.6-4.2-101.9 13.6-149.1 14.9-39.4 38.2-75.4 67.2-105.8 28.6-30.1 62.5-55 99.5-73.8 56.8-28.6 120.2-41.8 183.4-44.7zm-26.5 73.6c-24.2 2.2-48.3 7.2-71.2 15.6-16.4 5.8-32 13.7-47.1 22.4-18.1 10.8-35.3 23-50.7 37.4-27.7 25.3-49.3 57-62.8 92-15.6 40-20.9 83.5-19.6 126.3 1.4 24.1 6.6 47.9 15.3 70.3 13.3 35.1 34.5 67 60.1 94.2 27.3 29 59.5 53 94.2 72.2 78.4 43.5 168.3 63.7 257.5 65.3 91.7 1.8 183.3-17.6 267.6-53.1 32.5-13.8 64.3-29.5 93.4-49.6 17.5-12.5 34.2-26.7 46.8-44.3 9.8-13.2 16.5-28.5 20.4-44.5 4.9-21.5 2.8-44-2.5-65.3-8.8-34.4-26-66.3-47.3-94.5-23.8-31.5-53.9-57.7-86.1-80.3-63.6-44.3-134.8-76.1-206.5-104.9-40.1-16.5-80.5-32.5-122.4-43.9-45.1-12.2-92.2-19.3-139.1-15.3z"
          />
        </g>
        <g id="#daa32eff">
          <path
            id="Layer"
            fill="#daa32e"
            d="m553.4 323.6c49.1-2.7 98.3 6 145.1 20.2 20.5 6.3 40.7 13.6 60.5 21.8 36.1 14.7 72.3 29.1 107.9 44.8 38.9 17.1 77.2 35.7 113.4 58 33.5 20.9 64.9 45.5 92.2 74.2 24.9 26.5 46.7 56.6 59.9 90.7 7.9 20.4 12.5 42.6 9.2 64.5-2.7 18.5-11.5 35.7-23.5 50-10.9 13-23.9 24.1-37.8 33.8-16.6 11.7-34.4 21.5-52.5 30.6-79.6 39.4-167 63.9-255.8 69-7.4 0.6-15 0.1-22.4 0.8-12.4 1-24.7-0.5-37.1-0.5-83.9-3.4-167.9-24.3-241.1-66-33.7-19.5-65-43.5-90.9-72.6-24.1-26.9-43.6-58.2-55.1-92.5-7.9-23.8-12-48.9-11.3-74 0.6-44.2 12.8-88.1 34.8-126.5 27.2-47.5 69.8-86.6 120.6-107.6 26.7-11 55.2-16.8 83.9-18.7zm18.2 73.1c-22.6 1.1-45 7.3-65 18-31.1 16.5-55.7 43.6-72.3 74.4-21.1 38.8-30.7 83.4-29.8 127.4 0.7 39.1 13.9 77.5 35.3 110.1 20.4 31.5 48 57.9 79.2 78.6 34.3 22.7 73 38.5 113.1 47.7 50.5 11.9 103.1 13.4 154.4 7 44.8-5.5 88.7-16.9 131-32.8 20.1-7.5 39.9-15.9 58.8-26.2 15.9-8.9 31.4-19.1 43.5-32.9 9.7-11 16.6-25.1 16.3-39.9 0.1-18.5-9.4-35.2-20.3-49.5-13.6-17.3-30-32.2-46.8-46.3-27.8-23-57.3-44-86.5-65.1-32.4-23.4-64.9-46.7-96.3-71.3-14.2-10.9-27.8-22.6-41.9-33.6-17.7-13.7-36.4-26.2-56.2-36.7-35.6-18.9-75.8-31.4-116.5-28.9z"
          />
        </g>
      </svg>
    </Box>
  );
}
