// components/LevelStatusPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, pdf } from '@react-pdf/renderer';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, flexDirection: 'column', justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  logo: { width: 60 },
  title: { fontSize: 16, fontWeight: 'bold' },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
    paddingBottom: 4,
    fontWeight: 'bold',
    marginBottom: 4
  },
  row: { flexDirection: 'row', borderBottom: '0.5pt solid #ccc', paddingVertical: 2 },
  cell: { flex: 1 },
  overslept: { color: 'red', fontWeight: 'bold' },
  negative: { color: 'red' },
  footer: {
    marginTop: 10,
    paddingTop: 6,
    borderTop: '1pt solid #999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8
  },
  comma: { color: 'black' },
  chip: {
    fontSize: 8,
    color: '#1976d2', // MUI primary main
    border: '0.5pt solid #1976d2', // outlined border
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 2
  },
  cell: {
    flex: 1
  },

  cellWide: {
    flex: 3
  },

  cellNarrow: {
    flex: 0.7
  }
});

const LevelPage = ({ levelData, reportDate, author, pageIndex, totalPages }) => (
  <Page size="A4" orientation="landscape" style={styles.page} wrap>
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Level {levelData.level}</Text>
        <Image style={styles.logo} src="/assets/images/branding/evn-logo-grey.png" />
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.cell}>Ore Drive</Text>
        <Text style={styles.cell}>Bogging</Text>
        <Text style={styles.cellNarrow}>Avail Tonnes</Text>
        <Text style={styles.cellWide}>Bogging Comments</Text>
        <Text style={styles.cellNarrow}>Drilled to</Text>
        <Text style={styles.cell}>Charged Rings</Text>
      </View>
      {levelData.ore_drives.map((od) => (
        <View key={od.name} style={styles.row}>
          <Text style={styles.cell}>{od.name}</Text>
          <Text style={styles.cell}>{od.bogging.ring_txt}</Text>
          <Text style={[styles.cellNarrow, parseFloat(od.bogging.avail_tonnes) < 0 ? styles.negative : null]}>
            {parseInt(od.bogging.avail_tonnes, 10)}
          </Text>
          <View style={[styles.cellWide, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {(od.bogging.conditions || []).map((condition, index) => (
              <Text key={index} style={styles.chip}>
                {condition}
              </Text>
            ))}
            {od.bogging.comment ? <Text style={styles.commentText}>{od.bogging.comment}</Text> : null}
          </View>
          <Text style={styles.cellNarrow}>
            {(() => {
              const drilled = od.drilled || {};
              const last = drilled.last_drilled;
              const problemRings = drilled.problem_rings || [];

              if (!last && problemRings.length === 0) {
                return '—';
              }

              const problemSet = new Set(problemRings.map((p) => p.ring_number_txt));
              const combinedRings = new Set(problemSet);
              if (last) combinedRings.add(last);

              const ringList = Array.from(combinedRings);
              return ringList.map((ring, index) => {
                const isProblem = problemSet.has(ring);
                const isLast = index === ringList.length - 1;
                return (
                  <Text key={index} style={isProblem ? styles.overslept : null}>
                    {ring}
                    {!isLast && <Text style={styles.comma}>, </Text>}
                  </Text>
                );
              });
            })()}
          </Text>

          <Text style={styles.cell}>
            {(() => {
              const charged = od.charged || [];
              if (charged.length === 0) {
                return '—';
              }

              return charged.map((c, i) => {
                const ring = `${c.ring}${c.detonator ? c.detonator[0] : ''}`;
                const isLast = i === charged.length - 1;

                return (
                  <React.Fragment key={i}>
                    <Text style={c.is_overslept ? styles.overslept : null}>{ring}</Text>
                    {!isLast && <Text style={styles.comma}>, </Text>}
                  </React.Fragment>
                );
              });
            })()}
          </Text>
        </View>
      ))}
    </View>
    <View style={styles.footer} fixed>
      <Text>
        <Text>Report Date:</Text> <Text style={{ fontSize: 8 }}>{reportDate}</Text>
      </Text>
      <Text>Author: {author}</Text>
      <Text>
        Page {pageIndex + 1} of {totalPages}
      </Text>
    </View>
  </Page>
);

export const ReportPDF = ({ data, author, date, shift }) => {
  const reportDate = `${date}  For: ${shift.toUpperCase()}`;
  const totalPages = data.length;

  return (
    <Document>
      {data.map((levelData, index) => (
        <LevelPage
          key={levelData.level}
          levelData={levelData}
          reportDate={reportDate}
          author={author}
          pageIndex={index}
          totalPages={totalPages}
        />
      ))}
    </Document>
  );
};

export const DownloadReportButton = ({ data, author, date, shift }) => {
  const handlePrint = async () => {
    const blob = await pdf(<ReportPDF data={data} author={author} date={date} shift={shift} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <PDFDownloadLink document={<ReportPDF data={data} author={author} date={date} shift={shift} />} fileName="level-status.pdf">
        {({ loading }) => (
          <IconButton title={loading ? 'Generating PDF...' : 'Download PDF'}>
            <PictureAsPdfIcon color="primary" sx={{ fontSize: 28 }} />
          </IconButton>
        )}
      </PDFDownloadLink>
      <IconButton onClick={handlePrint} title="Print PDF">
        <PrintIcon color="primary" sx={{ fontSize: 28 }} />
      </IconButton>
    </Box>
  );
};
