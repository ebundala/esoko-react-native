/**
 * Created by ebundala on 2/24/2017.
 */
import React, { Component } from 'react';
import {
   // AppRegistry,
   // StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    TouchableNativeFeedback
    } from 'react-native';
import { connect } from 'react-redux'
import { StackNavigator,DrawerNavigator ,TabNavigator} from 'react-navigation';


import Oauth from "./user/components/loginPage"
import Products from "./products/components/products"
import Orders from "./orders/components/orders"
import Bids from "./bids/components/bids"
import Reviews from "./reviews/components/reviews"
import Chats from "./chats/components/chats"
import Activity from "./activityIndicator/components/activityIndicator"
import Home from  "./Home/components/home"
import {introOne,introTwo,introThree} from "./intro/components/intro"

Activity.navigationOptions = {
    title: 'Activity',
};


const StackHome = {
    Home: { screen: Home },
    Oauth: { screen: Oauth },
    Activity:{screen:Activity},
    products:{screen:Products},
    orders:{screen:Orders},
    bids:{screen:Bids},
    reviews:{screen:Reviews},
    chats:{screen:Chats},

}



const Main =
    TabNavigator(

        {
            introOne:{screen:introOne},
            introTwo:{screen:introTwo},
            introThree:{screen:introThree},
            app:{screen:StackNavigator(StackHome)}
        },
        {
            tabBarPosition: 'bottom',
            tabBarComponent:()=>null
        }
    );

//root=StackNavigator(StackHome)

const root =()=>{
    "use strict";
    var navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        </View>
    );
    return(
        <DrawerLayoutAndroid ref={component=>{this.drawer=component}}
                             drawerWidth={300}
                             drawerPosition={DrawerLayoutAndroid.positions.Left}
                             renderNavigationView={() => navigationView}>
            <View style={{flex: 1}}>

                <Main/>
                <TouchableNativeFeedback onPress={()=>this.drawer.openDrawer() }>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
                </TouchableNativeFeedback>
            </View>
        </DrawerLayoutAndroid>


    )
}


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



