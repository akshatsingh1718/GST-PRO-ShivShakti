import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 1,
  },
  heading: {
    fontSize: 15,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 2,
    paddingBottom: 3,
  },
  left: {
    fontFamily: 'Helvetica-Oblique',
    textAlign: 'left',
  },
  right: {
    fontFamily: 'Helvetica-Oblique',
    textAlign: 'right',
  },
  billTo: {
    marginTop: 1,
    paddingBottom: 1,
    fontFamily: 'Helvetica-Oblique',
    textAlign: 'center',
  },
});
const InvoiceMasterDetails = ({ master }) => {
  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ flex: 1, fontWeight: 900 }}>PAN No.: {master?.panNo}</Text>
        <Text
          style={{
            flex: 1,
            fontWeight: 900,
            textAlign: 'right',
          }}
        >
          GSTIN : {master?.gstin}
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>{master?.name}</Text>
        <Text style={styles.billTo}>{master?.service}</Text>
        <Text style={styles.billTo}>{master?.address}</Text>
        <Text style={styles.billTo}>
          Mob : {master?.phone} Email : {master?.email}
        </Text>
      </View>
    </>
  );
};

export default InvoiceMasterDetails;
