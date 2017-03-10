/**
 * Created by ebundala on 2/24/2017.
 */
import React, { Component } from 'react';
import {
   // AppRegistry,
   // StyleSheet,
    Text,
    View,
  // TouchableHighlight
    } from 'react-native';
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation';


import Oauth from "./user/components/loginPage"
import Products from "./products/components/products"
import Orders from "./orders/components/orders"
import Bids from "./bids/components/bids"
import Reviews from "./reviews/components/reviews"
import Chats from "./chats/components/chats"
import Activity from "./activityIndicator/components/activityIndicator"
import Home from  "./Home/components/home"

Activity.navigationOptions = {
    title: 'Activity',
};
const root=StackNavigator({
    Home: { screen: Home },
    Oauth: { screen: Oauth },
    Activity:{screen:Activity},
    products:{screen:Products},
    orders:{screen:Orders},
    bids:{screen:Bids},
    reviews:{screen:Reviews},
    chats:{screen:Chats},

});


const mapStateToProps = (state) => {
    return{...state}
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(root);
export default App




/*const styles = StyleSheet.create({

})*/;
