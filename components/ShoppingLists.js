import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useState } from 'react';

const ShoppingLists = ({ db }) => {
   const [lists, setLists] = useState([]);

   return (
      <View style={Styles.container}>
         <FlatList
            data={lists}
            renderItem={({ item }) =>
               // array function join() converts an array into a string
               <Text>{item.name}: {item.items.join(", ")}</Text>}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
   },
});

export default ShoppingLists;