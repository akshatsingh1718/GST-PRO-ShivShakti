import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace';
import InvoiceTableFooter from './InvoiceTableFooter';
import InvoiceGST from './InvoiceGST';

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <>
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={invoice.employeeTotal} />
      {/* <InvoiceTableBlankSpace rowsCount={tableRowsCount - invoice.employeeTotal.length} /> */}
      <InvoiceTableFooter items={invoice.employeeTotal} />
    </View>
    <InvoiceGST
      items={invoice.employeeTotal}
      gstType={invoice.gstType?.split('/') || []}
    />
  </>
);

export default InvoiceItemsTable;
