import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

const ShoppingLists = ({ db }) => {
   const [lists, setLists] = useState([]);

   // fetch all shopping lists from Firestore asynchronously, then call this within useEffect() 
   // can't use async directly in useEffect()
   const fetchShoppingLists = async () => {
      const listsDocuments = await getDocs(collection(db, "shoppingLists"));
      let newLists = [];
      listsDocuments.forEach(docObject => {
         newLists.push({ id: docObject.id, ...docObject.data() });
      });
      setLists(newLists);
   }

   useEffect(() => {
      fetchShoppingLists();
   }, [`${lists}`]);  // when 'lists' state changes, force a render cycle
   // use ${lists} instead of {lists} to avoid memory reference issues (stringify the complex data-type variable)




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