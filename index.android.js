/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import User from './components/database/user'
import Product from './components/database/product'
import Order from './components/database/order'
import Bid from './components/database/bid'
import Message from './components/database/message'
import Chat from './components/database/chat.js'
import Transaction from './components/database/transaction'
import Review from './components/database/reviews'

export default class eSoko extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <User></User>
          <Product/>
          <Order/>
          <Bid/>
          <Message/>
          <Chat/>
          <Transaction/>
          <Review/>
        <Text style={styles.instructions}>
          To get started, edit index.android.jscx
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('eSoko', () => eSoko);
