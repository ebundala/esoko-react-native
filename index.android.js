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
        <TouchableHighlight onPress={this.userCreated.bind(this)}>
		<Text style={styles.instructions}>
         USER
        </Text>
		</TouchableHighlight>
        <TouchableHighlight onPress={this.productCreated.bind(this)}>
		<Text style={styles.instructions}>
         product
        </Text>
		</TouchableHighlight>
		<TouchableHighlight onPress={this.bidCreated.bind(this)}>
		<Text style={styles.instructions}>
         bid
        </Text>
		</TouchableHighlight>
		<TouchableHighlight onPress={this.orderCreated.bind(this)}>
		<Text style={styles.instructions}>
         order
        </Text>
		</TouchableHighlight>
		<TouchableHighlight onPress={this.reviewCreated.bind(this)}>
		<Text style={styles.instructions}>
         review
        </Text>
		</TouchableHighlight>
		<TouchableHighlight onPress={this.transactionCreated.bind(this)}>
		<Text style={styles.instructions}>
         transaction
        </Text>
		</TouchableHighlight>
		<TouchableHighlight onPress={this.chatCreated.bind(this)}>
		<Text style={styles.instructions}>
         chat
        </Text>
		</TouchableHighlight>
		<TouchableHighlight onPress={this.messageCreated.bind(this)}>
		<Text style={styles.instructions}>
         message
        </Text>
		</TouchableHighlight>
        
      </View>
    );
  }
  userCreated(){
	 var user= new User({id:"ELIAS"}); 
	 user.create()
	 user.destroy()
  }
  productCreated(){
	 var user= new Product({id:"ELIASProduct"}); 
	 user.create()
  }
  messageCreated(){
	 const user= new Message({id:"ELIASmsg"}); 
	 user.create()
  }
  bidCreated(){
	 const user= new Bid({id:"ELIASmsg"}); 
	 user.create()
  }
  orderCreated(){
	 const user= new Order({id:"ELIASmsg"}); 
	 user.create()
  }
  reviewCreated(){
	 const user= new Review({id:"ELIASmsg"}); 
	 user.create()
  }
  chatCreated(){
	 const user= new Chat({id:"ELIASmsg"}); 
	 user.create()
  }
  transactionCreated(){
	 const user= new Transaction({id:"ELIASmsg"}); 
	 user.create()
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
