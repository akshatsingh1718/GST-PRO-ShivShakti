import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import {getStateCode} from "renderer/utils/common.utils";

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
const BillTo = ({billTo}) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View style={{ fontWeight: 900, flex: 1 }}>
          <Text> M/S : {billTo?.company}, {billTo?.address} {billTo?.district} {billTo?.state} {billTo?.pincode}</Text>
          <Text>State: {billTo?.state}</Text>
          <Text>PARTY GSTIN : {billTo?.gstin}</Text>
        </View>
        <View
          style={{
            flex: 1,
            fontWeight: 900,
            textAlign: 'right',
          }}
        >
          <Text>DEPARTMENT : QUALITY</Text>
          <Text> HSN CODE : 9968</Text>
          <Text> STATE CODE : {getStateCode(billTo?.state)}</Text>
          <Text> PURCHASE ORDER NO.</Text>
        </View>
      </View>
    </>
  );
};

export default BillTo;
