import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60,
  },
});

const InvoiceNo = ({ invoice }) => {
  console.log(' -------- InvoiceNo ------------');
  console.log(invoice);
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View style={{ fontWeight: 900, flex: 1 }}>
          <Text> Invoice No. {invoice?.id}</Text>
        </View>
        <View
          style={{
            flex: 1,
            fontWeight: 900,
            textAlign: 'right',
          }}
        >
          <Text>
            Invoice date : {invoice?.createdAt?.toISOString().slice(0, 10)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default InvoiceNo;
