'use client';

import { useEffect, useState } from 'react';
import React from 'react';
// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import CSVExport from 'components/third-party/react-table/CSVExport';
import { fetcher } from 'utils/axios';

export const header = [
  { label: 'Ore Drive', key: 'name' },
  { label: 'Bogging', key: 'name' },
  { label: 'Avail Tonnes', key: 'avail_tonnes' },
  { label: 'Comment', key: 'comment' },
  { label: 'Drilled to', key: 'drilled' },
  { label: 'Charged Rings', key: 'charged' }
];

// ==============================|| MUI TABLE - CUSTOMIZED FOR LEVELS ||============================== //

export default function TableCustom() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevelStatus = async () => {
      try {
        const response = await fetcher('/report/prod/level-status/');
        setData(JSON.parse(response.data));
      } catch (error) {
        console.error('Error fetching level status report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelStatus();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <>
      {data.map((levelData) => (
        <Box key={levelData.level} mb={2}>
          <MainCard
            key={levelData.level}
            content={false}
            title={`Level ${levelData.level}`}
            secondary={<CSVExport data={levelData.ore_drives} headers={header} filename={`level-${levelData.level}-table-data.csv`} />}
          >
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label={`Level ${levelData.level} table`}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: 3 }}>Ore Drive</TableCell>
                    <TableCell align="right">Bogging</TableCell>
                    <TableCell align="right">Avail Tonnes</TableCell>
                    <TableCell align="right">Comment</TableCell>
                    <TableCell align="right">Drilled to</TableCell>
                    <TableCell align="right">Charged Rings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {levelData.ore_drives.map((oredrive) => (
                    <TableRow hover key={oredrive.name}>
                      <TableCell sx={{ pl: 3 }} component="th" scope="row">
                        {oredrive.name}
                      </TableCell>
                      <TableCell align="right">{oredrive.bogging.ring_txt}</TableCell>
                      <TableCell align="right" sx={oredrive.bogging.is_overbogged ? { fontWeight: 'bold', color: 'error.main' } : {}}>
                        {parseInt(oredrive.bogging.avail_tonnes, 10)}
                      </TableCell>
                      <TableCell align="right">{oredrive.bogging.comment}</TableCell>
                      <TableCell align="right">
                        {oredrive.drilled.map((drill, index) => (
                          <React.Fragment key={index}>
                            {drill.is_blocked ? (
                              <Badge badgeContent={drill.ring} color="warning">
                                <WarningAmberIcon />
                              </Badge>
                            ) : (
                              drill.ring
                            )}
                            {index < oredrive.drilled.length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {oredrive.charged.map((charge, index) => {
                          const detonatorInitial = charge.detonator ? charge.detonator.charAt(0) : '';
                          const ringWithDetonator = `${charge.ring}${detonatorInitial}`;

                          // Define the styles based on 'is_overslept'
                          const styles = charge.is_overslept ? { fontWeight: 'bold', color: 'error.main' } : {};

                          return (
                            <React.Fragment key={index}>
                              <Typography component="span" sx={styles}>
                                {ringWithDetonator}
                              </Typography>
                              {index < oredrive.charged.length - 1 && (
                                <Typography component="span" sx={{ color: 'black', fontWeight: 'normal' }}>
                                  {', '}
                                </Typography>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Box>
      ))}
    </>
  );
}
