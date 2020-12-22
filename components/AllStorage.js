import React from 'react';
import {Text, StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AllStorage = (props) => {
  const {id, date, product} = props;

  const listOfProduct = product.map((item) => (
    <View key={item.id}>
      <Text>{`Produkt${item.id}:  `}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Value: {item.value}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        Data:
        {date}
      </Text>

      <View>{listOfProduct}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  date: {
    fontWeight: 'bold',
  },
});

export default AllStorage;
