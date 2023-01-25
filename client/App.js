import 'react-native-gesture-handler';
import React from "react";
import store from './redux/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './components/navigation/stackNavigator';
//import Home from "./pages/home";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
