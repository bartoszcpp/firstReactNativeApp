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
        {`Produkt${product.id}:  `}
        {product.value}
      </Text>
      <View style={styles.handleProduct}>
        <TouchableOpacity
          onPress={() =>
            handleRemoveItemFromList(
              product,
              listOfProductFromStorage,
              priceFromStorage,
              _retrieveData,
            )
          }>
          <Text style={styles.changeValueButton}> usuń</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange(1)}>
          <Text style={styles.changeValueButton}>+</Text>
        </TouchableOpacity>
        <Text style={styles.changeValueButton}>{product.quantity}</Text>
        <TouchableOpacity
          disabled={product.quantity === 1 ? true : false}
          onPress={() => handleChange(-1)}>
          <Text style={styles.changeValueButton}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  handleProduct: {},
  changeValueButton: {},
});

export default ItemFromList;
