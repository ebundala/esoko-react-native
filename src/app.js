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
import { StackNavigator,NavigationActions ,TabNavigator} from 'react-navigation';


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
          //  backBehavior:"none",
            swipeEnabled:false,
            tabBarPosition: 'bottom',
            tabBarComponent:()=>null
        }
    );

const st=Main.router.getStateForAction;
    Main.router.getStateForAction = (action, state)=> {
    if (
        state &&
        action.type === NavigationActions.BACK
    ) {
        // Returning null from getStateForAction means that the action
        // has been handled/blocked, but there is not a new state
       let  prevState=state.routes[state.index];

        if((prevState.routeName==="app")&&prevState.index===0){
            console.log("back button\n"+JSON.stringify(state))

            return {...state,index:3}
        }
        //return {...state,index:3}//st(newaction||action,state);
    }


    return st(action,state)
}

/*{
    ...Main.router,
    getStateForAction(action, state) {
        if (
            state &&
            action.type === NavigationActions.BACK
        ) {
            // Returning null from getStateForAction means that the action
            // has been handled/blocked, but there is not a new state
            alert("back button")
            //return null;
        }
        //alert("not back button")

        return null //Main.router.getStateForAction(action, state);
    },
};*/







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


                <Main screenProps={this.drawer} ref={component=>{this.main=component}}/>
            {}


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



