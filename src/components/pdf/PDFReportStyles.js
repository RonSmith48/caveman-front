// pdf-reports.js
import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    position: 'relative'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  titleContainer: { flexDirection: 'column' },
  title: { fontSize: 14, fontWeight: 'bold' },
  subTitle: { fontSize: 10, marginTop: 2 },
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
  cellStatus: {
    flex: 1,
    paddingRight: 4,
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize'
  },
  statusSuccess: { backgroundColor: '#d0f0d0' },
  statusWarning: { backgroundColor: '#fff4cc' },
  statusSecondary: { backgroundColor: '#e0e0f8' },
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
  }
});

export default pdfStyles;
