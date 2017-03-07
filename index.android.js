

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
/*import User from './src/utils/user'
import Product from './src/utils/product'
import Order from './src/utils/order'
import Bid from './src/utils//bid'
import Message from './src/utils/message'
import Chat from './src/utils/chat'
import Transaction from './src/utils/transaction'
import Review from './src/utils/reviews'*/
import configStore from './src/store'


/*var user= new User({id:"ELIAS"});
 var product= new Product({id:"ELIASProduct"}); 
 var message= new Message({id:"ELIASmsg"}); 
 var bid= new Bid({id:"ELIASmsg"}); 
 var order= new Order({id:"ELIASmsg"}); 
 var review= new Review({id:"ELIASmsg"}); 
 var transaction= new Transaction({id:"ELIASmsg"}); 
 var chat= new Chat({id:"ELIASmsg"}); */
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
