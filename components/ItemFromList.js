import React, {useEffect, useState} from 'react';
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

  const [count, setCount] = useState(1);
  const [action, setAction] = useState('');

  useEffect(() => {
    handleChangeQuantity(
      product,
      listOfProductFromStorage,
      priceFromStorage,
      _retrieveData,
      count,
      action,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

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
        <TouchableOpacity
          onPress={(() => setCount(count + 1), () => setAction('addition'))}>
          <Text style={styles.changeValueButton}>+</Text>
        </TouchableOpacity>
        <Text style={styles.changeValueButton}>{count}</Text>
        <TouchableOpacity
          disabled={count === 0 ? true : false}
          onPress={(() => setCount(count - 1), () => setAction('subtraction'))}>
          <Text style={styles.changeValueButton}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  handleProduct: {
    flex: 1,
    flexDirection: 'row',
  },
  changeValueButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
  },
});

export default ItemFromList;
