

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Provider } from 'react-redux'
import App from "./src/app"

import configStore from './src/store'


 let store=configStore();
 
 
export default class eSoko extends Component {

  render() {
    return (
<Provider store={store}>
       <App />
</Provider>

    );
  }

}


AppRegistry.registerComponent('eSoko', () => eSoko);
