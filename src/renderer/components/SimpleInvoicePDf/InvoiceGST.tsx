import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { numberToWordRupees, percentage } from 'renderer/utils/common.utils';

const borderColor = 'white';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold',
  },
  gstType: {
    width: '65%',
    textAlign: 'right',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  gstPercent: {
    width: '20%',
    textAlign: 'right',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  totalInWords: {
    width: '100%',
    textAlign: 'right',
    paddingRight: 8,
    fontFamily: 'Helvetica-Oblique',
    color: '#979797',
    textTransform: 'uppercase',
  },
});

const InvoiceGST = ({ items, gstType }) => {
  const total = items
    .map((item) => item.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const cgst = gstType?.indexOf('cgst') < 0 ? 0 : 9;
  const sgst = gstType?.indexOf('sgst') < 0 ? 0 : 9;
  const igst = gstType?.indexOf('igst') < 0 ? 0 : 18;

  const netAmount =
    percentage(cgst, total) +
    percentage(igst, total) +
    percentage(sgst, total) +
    total;
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.gstType}>CGST</Text>
        {cgst !== 0 ? (
          <>
            <Text style={styles.gstPercent}>{`${cgst} %`}</Text>

            <Text style={styles.total}>{percentage(cgst, total)}</Text>
          </>
        ) : (
          <Text> </Text>
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.gstType}>SGST</Text>
        {sgst !== 0 ? (
          <>
            <Text style={styles.gstPercent}>{`${sgst} %`}</Text>

            <Text style={styles.total}>{percentage(sgst, total)}</Text>
          </>
        ) : (
          <Text> </Text>
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.gstType}>IGST</Text>
        {igst !== 0 ? (
          <>
            <Text style={styles.gstPercent}>{`${igst} %`}</Text>
            <Text style={styles.total}>{percentage(igst, total)}</Text>
          </>
        ) : (
          <Text> </Text>
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.gstType}>NETT. AMOUNT</Text>
        <Text style={styles.gstPercent}> </Text>
        <Text style={styles.total}>{netAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalInWords}>
          Rs. {numberToWordRupees(netAmount)}
        </Text>
      </View>
    </>
  );
};

export default InvoiceGST;
