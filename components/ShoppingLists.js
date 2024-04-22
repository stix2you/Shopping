import { StyleSheet, View, FlatList, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, onSnapshot, query, where } from 'firebase/firestore';

const ShoppingLists = ({ db, route }) => {
   // extract the userID from the route params
   const { userID } = route.params;

   // state for shopping lists
   const [lists, setLists] = useState([]);

   // states for form inputs, which will become database fields
   const [listName, setListName] = useState("");
   const [item1, setItem1] = useState("");
   const [item2, setItem2] = useState("");

   useEffect(() => {
      // Create a listener for changes to the shoppinglists collection in Firestore
      const q= query(collection(db, "shoppinglists"), where("uid", "==", userID));
      const unsubShoppinglists = onSnapshot(q, (documentsSnapshot) => {
         let newLists = [];
         documentsSnapshot.forEach(docObject => {
            newLists.push({ id: docObject.id, ...docObject.data() })
         });
         setLists(newLists);
      });
      // Clean up code
      return () => {
         if (unsubShoppinglists) unsubShoppinglists();
      }
   }, []);

   // takes a new object structured as a shopping list (newList) and adds the data to Firestore
   const addShoppingList = async (newList) => {
      const newListRef = await addDoc(collection(db, "shoppinglists"), newList);
      if (newListRef.id) {
         setLists([newList, ...lists]);   // force a re-render with the new list added (change state of lists array)
         Alert.alert(`The list "${listName}" has been added.`);
      } else {
         Alert.alert("Unable to add. Please try later");
      }
   }

   return (
      <View style={styles.container}>
         <FlatList
            style={styles.listsContainer}
            data={lists}
            renderItem={({ item }) =>
               <View style={styles.listItem}>
                  <Text >{item.name}: {item.items.join(", ")}</Text>
               </View>
            }
         />
         <View style={styles.listForm}>
            <TextInput
               style={styles.listName}
               placeholder="List Name"
               value={listName}
               onChangeText={setListName}
            />
            <TextInput
               style={styles.item}
               placeholder="Item #1"
               value={item1}
               onChangeText={setItem1}
            />
            <TextInput
               style={styles.item}
               placeholder="Item #2"
               value={item2}
               onChangeText={setItem2}
            />
            <TouchableOpacity
               style={styles.addButton}
               onPress={() => {
                  const newList = {  // this is where we are creating the new list object, assign to newList
                     uid: userID,
                     name: listName,
                     items: [item1, item2]
                  }
                  addShoppingList(newList);   // call the addShoppingList function with the newList object
               }}
            >
               <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
         </View>
         {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   listItem: {
      height: 70,
      justifyContent: "center",
      paddingHorizontal: 30,
      borderBottomWidth: 1,
      borderBottomColor: "#AAA",
      flex: 1,
      flexGrow: 1
   },
   listForm: {
      flexBasis: 275,
      flex: 0,
      margin: 15,
      padding: 15,
      backgroundColor: "#CCC"
   },
   listName: {
      height: 50,
      padding: 15,
      fontWeight: "600",
      marginRight: 50,
      marginBottom: 15,
      borderColor: "#555",
      borderWidth: 2
   },
   item: {
      height: 50,
      padding: 15,
      marginLeft: 50,
      marginBottom: 15,
      borderColor: "#555",
      borderWidth: 2
   },
   addButton: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      backgroundColor: "#000",
      color: "#FFF"
   },
   addButtonText: {
      color: "#FFF",
      fontWeight: "600",
      fontSize: 20
   }
});

export default ShoppingLists;