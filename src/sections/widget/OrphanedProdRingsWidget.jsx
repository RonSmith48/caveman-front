'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@mui/material';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
import MainCard from 'components/MainCard';
import { fetcher } from 'utils/axios'; // Assuming fetcher is configured for axios
import { ColumnWidthOutlined } from '@ant-design/icons';
import { enqueueSnackbar } from 'notistack';

export default function OrphanedProdRingsWidget() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [orphanCount, setOrphanCount] = useState(0);

  useEffect(() => {
    const fetchOrphanCount = async () => {
      try {
        const response = await fetcher('report/orphaned-prod-rings-count/');
        if (response && response.data['orphan count']) {
          setOrphanCount(response.data['orphan count']);
        } else {
          enqueueSnackbar('Error fetching orphaned rings count', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error fetching orphaned rings count:', error);
        enqueueSnackbar('Error fetching orphaned rings count', { variant: 'error' });
      }
    };

    fetchOrphanCount();
  }, []);

  const handleProcessClick = async () => {
    try {
      setLoading(true);
      const response = await fetcher('prod-actual/orphaned-rings/process/');

      if (response && response.data['orphan count']) {
        setOrphanCount(response.data['orphan count']); // Update orphan count after processing
        enqueueSnackbar(response.data['msg']['body'], { variant: 'success' });
      } else {
        enqueueSnackbar('Error processing orphaned rings', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error processing orphaned rings:', error);
      enqueueSnackbar('Error processing orphaned rings', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <MainCard>
            <Grid item xs={12}>
              <HoverSocialCard
                primary="Orphaned Production Rings"
                secondary={orphanCount}
                iconPrimary={ColumnWidthOutlined}
                color="primary.main"
              />
            </Grid>
            <Grid container item direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Grid item>
                <Button variant="outlined" onClick={handleProcessClick} disabled={loading}>
                  {loading ? 'Processing' : 'Process'}
                </Button>
              </Grid>
              <Grid item sx={{ ml: 1 }}>
                <Typography>Match designed and concept rings</Typography>
                <Box display="flex" justifyContent="flex-end">
                  <Link component="button" variant="body2" onClick={handleDialogOpen}>
                    Learn more
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>

      {/* Dialog box */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>More Information</DialogTitle>
        <DialogContent>
          <Typography>This section contains more details about how the designed rings are matched with concept rings.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
