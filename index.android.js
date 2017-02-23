

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import User from './src/components/database/user'
import Product from './src/components/database/product'
import Order from './src/components/database/order'
import Bid from './src/components/database/bid'
import Message from './src/components/database/message'
import Chat from './src/components/database/chat'
import Transaction from './src/components/database/transaction'
import Review from './src/components/database/reviews'



var user= new User({id:"ELIAS"}); 
 var product= new Product({id:"ELIASProduct"}); 
 var message= new Message({id:"ELIASmsg"}); 
 var bid= new Bid({id:"ELIASmsg"}); 
 var order= new Order({id:"ELIASmsg"}); 
 var review= new Review({id:"ELIASmsg"}); 
 var transaction= new Transaction({id:"ELIASmsg"}); 
 var chat= new Chat({id:"ELIASmsg"}); 
 
 
 
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
	 
	 user.create()
	 //user.destroy()
  }
  productCreated(){
	
	 user.create()
  }
  messageCreated(){
	 
	 message.create()
  }
  bidCreated(){
	 
	 bid.create()
  }
  orderCreated(){
	 
	 order.create()
  }
  reviewCreated(){
	 
	 review.create()
  }
  chatCreated(){
	 
	 chat.create()
  }
  transactionCreated(){
	 
	 transaction.create()
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
