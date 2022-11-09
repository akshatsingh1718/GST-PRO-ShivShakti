import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

function formatDate(date: Date) {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 'auto',
  },
  reportTitle: {
    color: '#61dafb',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const Footer = ({ master }) => {
  const date = new Date();
  return (
    <View style={styles.footerContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View style={{ fontWeight: 900, flex: 1 }}>
          <Text>Terms & Conditions :</Text>
          <Text>1. : E.& O.E</Text>
          <Text>2. : All disputes settled in Delhi Jurisdiction only.</Text>
        </View>
        <View
          style={{
            flex: 1,
            fontWeight: 900,
            textAlign: 'right',
          }}
        >
          <Text>for {master.name}</Text>
          <Text>{master.ceo}</Text>
          <Text>Digitally signed by {master.ceo}</Text>
          <Text>Date : {formatDate(date)}</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;
