import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handleRemoveItemFromList} from '../functions';
import {handleChangeQuantity} from '../functions';

const ItemFromList = (props) => {
  const {
    product,
    listOfProductFromStorage,
    priceFromStorage,
    _retrieveData,
  } = props;

  const handleChange = (count) => {
    handleChangeQuantity(
      product,
      listOfProductFromStorage,
      priceFromStorage,
      _retrieveData,
      count,
    );
  };

  return (
    <View>
      <Text key={product.id}>
        {`${product.name}:  `}
        {product.value} zł
      </Text>
      <View style={styles.handleProduct}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleChange(1)}
            style={styles.removeButton}>
            <Text style={styles.changeValueButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.changeValueButton}>{product.quantity}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={product.quantity === 1 ? true : false}
            onPress={() => handleChange(-1)}
            style={styles.removeButton}>
            <Text style={styles.changeValueButton}>-</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            handleRemoveItemFromList(
              product,
              listOfProductFromStorage,
              priceFromStorage,
              _retrieveData,
            )
          }
          style={styles.removeButton}>
          <Text style={styles.changeValueButton}> usuń</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  handleProduct: {},
  changeValueButton: {
    display: 'flex',
    textAlign: 'center',
    color: 'white',
  },
  removeButton: {
    backgroundColor: '#01a792',
    borderColor: '#01a792',
    borderWidth: 0,
    padding: 20,
    margin: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ItemFromList;
