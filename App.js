// import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens
import ShoppingLists from './components/ShoppingLists';

const App = () => {
   const firebaseConfig = {
      apiKey: "AIzaSyCAXqjfUSDfcJoxKQO8xTiayEHVcGvcIJU",
      authDomain: "shopping-list-demo-fd4a8.firebaseapp.com",
      projectId: "shopping-list-demo-fd4a8",
      storageBucket: "shopping-list-demo-fd4a8.appspot.com",
      messagingSenderId: "319539977302",
      appId: "1:319539977302:web:9a9bdc7882687013d56ff7"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   // Initialize Cloud Firestore and get a reference to the service
   const db = getFirestore(app);

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="ShoppingLists"
         >
            <Stack.Screen
               name="ShoppingLists"
            >
               {/* note method for passing props to a screen */}
               {props => <ShoppingLists db={db} {...props} />}
            </Stack.Screen>
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default App;

