// components/LevelStatusPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, pdf } from '@react-pdf/renderer';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const formatDate = (date) => date.format('DD/MM/YYYY');
const formatDateTime = (date) => date.format('DD/MM/YYYY h:mm A');

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    position: 'relative' // allows footer to be absolutely positioned
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'column'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 10,
    marginTop: 2
  },
  logo: { width: 60 },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
    fontWeight: 'bold',
    paddingBottom: 5,
    marginBottom: 4
  },
  row: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #ccc',
    paddingVertical: 3
  },
  cellRing: { flex: 2, paddingRight: 6 },
  cell: { flex: 1, paddingRight: 4 },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTop: '1pt solid #999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    paddingTop: 6
  },
  statusSuccess: {
    backgroundColor: '#d0f0d0' // light green
  },
  statusWarning: {
    backgroundColor: '#fff4cc' // light yellow
  },
  statusSecondary: {
    backgroundColor: '#e0e0f8' // light blue/grey
  },
  cellStatus: {
    flex: 1,
    paddingRight: 4,
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize' // optional: makes "charged" → "Charged"
  }
});

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'charged':
      return styles.statusSuccess;
    case 'drilled':
      return styles.statusWarning;
    case 'fired':
      return styles.statusSecondary;
    default:
      return null;
  }
};

const ReportPage = ({ data, reportDate, generatedAt }) => (
  <Page size="A4" orientation="portrait" style={styles.page}>
    <View style={styles.headerRow}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>DCF Report</Text>
        <Text style={styles.subTitle}>for {formatDate(reportDate)}</Text>
      </View>
      <Image style={styles.logo} src="/assets/images/branding/evn-logo-grey.png" />
    </View>

    <View style={styles.tableHeader}>
      <Text style={styles.cellRing}>Ring</Text>
      <Text style={styles.cell}>Shift</Text>
      <Text style={styles.cellStatus}>Status</Text>
    </View>

    {data.map((ring, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.cellRing}>{ring.alias}</Text>
        <Text style={styles.cell}>{ring.shift}</Text>
        <Text style={[styles.cellStatus, getStatusStyle(ring.activity)]}>{ring.activity}</Text>
      </View>
    ))}

    <View style={styles.footer} fixed>
      <Text>Report Produced: {formatDateTime(generatedAt)}</Text>
      <Text>Author: Auto-generated</Text>
      <Text>Page 1 of 1</Text>
    </View>
  </Page>
);

export const ReportPDF = ({ data, date }) => {
  const now = dayjs(); // Current timestamp
  return (
    <Document>
      <ReportPage data={data} reportDate={date} generatedAt={now} />
    </Document>
  );
};

export const DownloadReportButton = ({ data, date, disabled }) => {
  const handlePrint = async () => {
    if (disabled) return;
    const blob = await pdf(<ReportPDF data={data} date={date} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  const iconButtonStyles = {
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto'
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <PDFDownloadLink
        document={<ReportPDF data={data} date={date} />}
        fileName={`DCF Report ${date.format('YYYYMMDD')}.pdf`}
        style={iconButtonStyles}
      >
        {({ loading }) => (
          <IconButton title={loading ? 'Generating PDF...' : 'Download PDF'} disabled={disabled}>
            <PictureAsPdfIcon color="primary" sx={{ fontSize: 28 }} />
          </IconButton>
        )}
      </PDFDownloadLink>
      <IconButton onClick={handlePrint} title="Print PDF" disabled={disabled} sx={iconButtonStyles}>
        <PrintIcon color="primary" sx={{ fontSize: 28 }} />
      </IconButton>
    </Box>
  );
};
