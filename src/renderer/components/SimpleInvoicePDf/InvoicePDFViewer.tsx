import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import BillTo from './BillTo';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceMasterDetails from './InvoiceMasterDetails';
// import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import { PDFViewer } from '@react-pdf/renderer';
import { toSummaryInvoice } from 'renderer/utils/common.utils';
import Footer from './Footer';
import logo from "../../../../assets/master/master1.logo.jpg";

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 1.5,
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footer: {
    marginTop: 'auto',
  },
});

const InvoicePDFViewer = ({ invoice, masterDetails, showLogo }) => {
  invoice = toSummaryInvoice(invoice);
  console.log('====> InvoicePDFViewer');
  console.log(invoice);

  return (
    <PDFViewer width="100%" height="700" className="app">
      <Document>
        <Page size="A4" style={styles.page}>
          {showLogo && <Image style={styles.logo} src={logo} />}
          <InvoiceTitle title="Tax Invoice" />
          <InvoiceMasterDetails master={masterDetails} />
          <InvoiceNo invoice={invoice} />
          <BillTo billTo={invoice?.company} />
          {/* <BillTo invoice={invoice.billTo} /> */}
          <InvoiceItemsTable invoice={invoice} />
          <Footer master={masterDetails} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePDFViewer;
