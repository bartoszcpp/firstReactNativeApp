import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const AllStorage = (props) => {
  const {id, date, product} = props;

  const listOfProduct = product.map((item) => (
    <View style={styles.product} key={item.id}>
      <Text style={styles.text}>{`${item.name}:  `}</Text>
      <Text style={styles.text}>Ilość: {item.quantity}</Text>
      <Text style={styles.text}>Wartość: {item.value} zł</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Data: {date}</Text>

      <View>{listOfProduct}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    fontSize: 18,
  },
  product: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    margin: 5,
    padding: 5,
  },
});

export default AllStorage;
