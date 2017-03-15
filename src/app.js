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
    TouchableNativeFeedback,
    BackAndroid,
    ToastAndroid
    } from 'react-native';
import { connect } from 'react-redux'
import { StackNavigator,NavigationActions ,TabNavigator,addNavigationHelpers,} from 'react-navigation';


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

/*
const HomeRouter=StackNavigator(StackHome)

const appStackNav=connect(state=>{
    return{
        ...state
    }
})(HomeRouter)
*/






const Main =
    TabNavigator(

        {
            introOne:{screen:introOne},
            introTwo:{screen:introTwo},
            oauth:{screen:Oauth},
            app:{screen:StackNavigator(StackHome)}
        },
        {
            backBehavior:"none",
            //swipeEnabled:false,
            tabBarPosition: 'bottom',
            tabBarComponent:()=>null,
            //initialRoute:"app"
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
            console.log("back button\n" + JSON.stringify(state))
            let prevState = state.routes[state.index];

            if ((prevState.routeName === "app") && prevState.index === 0) {
                //console.log("back button\n"+JSON.stringify(state))

                //return {...state, index: 3}
            }
        //return {...state,index:3}//st(newaction||action,state);
    }


    return st(action,state)
}

const initialNavState= {
        routes:[
           { key: 'introOne', routeName: 'introOne' },
           { key: 'introTwo', routeName: 'introTwo' },
            { index: 0,
                         routes: [ { routeName: 'start', key: 'Init' } ],
       key: 'oauth',
          routeName: 'oauth' },
           { index: 0, routes: [ { routeName: 'Home', key: 'Init' } ], key: 'app', routeName: 'app' } ],
            index: 0 };

export const routeReducers=(state = initialNavState, action) => {


    switch (action.type) {
        case NavigationActions.BACK:
        case NavigationActions.NAVIGATE:
            return Main.router.getStateForAction(action, state);
        case "persist/REHYDRATE":
            //alert(JSON.stringify(action.type))
            if(action.hasOwnProperty("payload"))
            if (action.payload.nav.hasOwnProperty("routes")) {

            //let route = action.payload.nav.routes[action.payload.nav.index];
            //let routeName = route.hasOwnProperty("routes") ? route.routes[route.index].routeName : route.routeName;

                //routeName=Main.router.getStateForAction(NavigationActions.navigate({routeName:routeName}), state)
                //alert(JSON.stringify(routeName))
            return action.payload.nav;
            }
         return state;
        default:
            return state
    }

    }


class root extends Component{
    componentDidMount() {
        BackAndroid.addEventListener('backPress', () => {
            const { dispatch, nav } = this.props;
            if(this.drawerOpen){
            this.drawer.closeDrawer();
            return true;
            }
            if (this.shouldCloseApp(nav)) return false

            dispatch({ type: NavigationActions.BACK })
            return true
        })
    }
    shouldCloseApp(nav){
        if(nav.hasOwnProperty("routes")) {
            let route = nav.routes[nav.index];
            if (route.hasOwnProperty("routes")) {
                if(route.index==0){
                    if(this.shouldClose)
                    {
                        return true
                    }
                    this.shouldClose=true;
                    const cb=()=>{
                        this.shouldClose=false;
                    }
                    setTimeout(cb.bind(this),500);
                    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
                    return false
                }

                // ToastAndroid.showWithGravity('All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }
        return false
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }
render(){
   // "use strict";
  const  { dispatch, nav}=this.props;
    let navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        </View>
    );

        return(
        <DrawerLayoutAndroid ref={component=>{this.drawer=component}}
                             drawerWidth={300}
                             drawerPosition={DrawerLayoutAndroid.positions.Left}
                             renderNavigationView={() => navigationView}
                             onDrawerOpen={()=>this.drawerOpen=true}
                             onDrawerClose={()=>this.drawerOpen=false}
        >


            <Main screenProps={{drawer:this.drawer}}
                  ref={component=>{this.main=component}}
                  navigation={addNavigationHelpers({ dispatch, state: nav })}
            />



        </DrawerLayoutAndroid>


    )
}}



const mapStateToProps = (state) => {
    return{
    nav:state.nav
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
dispatch:(cmd)=>{
    "use strict";
    dispatch(cmd)
}
    }
}


const App = connect(
    mapStateToProps//,
    //mapDispatchToProps
)(root);
export default App



