/**
 * Created by ebundala on 2/24/2017.
 */
import React, {Component} from 'react';
import {
    // AppRegistry,
    // StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    TouchableNativeFeedback,
    BackAndroid,
    ToastAndroid,
    Button,
    ViewPagerAndroid
} from 'react-native';
import {connect} from 'react-redux'
import {REHYDRATE} from 'redux-persist/constants'
import {StackNavigator, NavigationActions, TabNavigator, addNavigationHelpers,} from 'react-navigation';
import {TabViewPagerAndroid} from 'react-native-tab-view';

import Oauth from "./user/components/loginPage"
import Products from "./products/components/products"
import Orders from "./orders/components/orders"
import Bids from "./bids/components/bids"
import Reviews from "./reviews/components/reviews"
import Chats from "./chats/components/chats"
import Activity from "./activityIndicator/components/activityIndicator"
import Home from  "./Home/components/home"
import {IntroOne, IntroTwo} from "./intro/components/intro"


Activity.navigationOptions = {
    title: 'Activity',
};


const StackHome = {
    Home: {screen: Home},
    products: {screen: Products},
    orders: {screen: Orders},
    bids: {screen: Bids},
    reviews: {screen: Reviews},
    chats: {screen: Chats},

};


const Main = StackNavigator(StackHome)
/*TabNavigator(
 {
 introOne:{screen:introOne},
 introTwo:{screen:introTwo},
 oauth:{screen:Oauth},
 app:{screen:StackNavigator(StackHome)},
 // Activity:{screen:Activity},
 },
 {
 backBehavior:"none",
 swipeEnabled:true,
 tabBarPosition: 'bottom',
 tabBarComponent:()=>null,
 // initialRoute:"introOne"
 }
 );*/

/*const st=Main.router.getStateForAction;
 Main.router.getStateForAction = (action, state)=> {

 switch (action.type){

 case NavigationActions.BACK:
 if (state) {
 // Returning null from getStateForAction means that the action
 // has been handled/blocked, but there is not a new state
 //console.log("back button\n" + JSON.stringify(state))
 let prevState = state.routes[state.index];

 if ((prevState.routeName === "app") && prevState.index === 0) {
 console.log("back button\n"+JSON.stringify(state))

 return {...state}
 }
 //return {...state,index:3}//st(newaction||action,state);
 }

 default:
 return st(action,state)
 }



 };*/

const initialNavState = {
    routes: [
        //{ key: 'introOne', routeName: 'introOne' },
        //   { key: 'introTwo', routeName: 'introTwo' },
        // { index: 0, routes: [ { routeName: 'start', key: 'Init' } ], key: 'oauth', routeName: 'oauth' },
        {index: 0, routes: [{routeName: 'Home', key: 'Init'}], key: 'app', routeName: 'app'}],
    index: 0
};

export const routeReducers = (state = initialNavState, action) => {

    //console.warn(action.type);
    switch (action.type) {
        case NavigationActions.BACK:
        case NavigationActions.NAVIGATE:
        case NavigationActions.INIT:
        case NavigationActions.RESET:
        case NavigationActions.SET_PARAMS:

            return Main.router.getStateForAction(action, state);
        /*case "ACCOUNT":
         alert(action.type);
         return Main.router.getStateForAction(NavigationActions.navigate({routeName:"account"}), state);*/
        /*case REHYDRATE:
            //alert(JSON.stringify(action.type))

            if (action.hasOwnProperty("payload"))
                if (action.payload.hasOwnProperty("nav") ? action.payload.nav : false) {

                    if (action.payload.hasOwnProperty("user")) {
                        let user = action.payload.user;


                        if (user.isNewUser) {

                            let newState = Main.router.getStateForAction(NavigationActions.navigate({routeName: "introOne"}), state)
                            console.log("new user\n" + JSON.stringify({...initialNavState, ...newState}))
                            return {...initialNavState, ...newState}
                        }
                        else if (user.isAuthenticated) {

                            // let st=Main.router.getStateForAction(NavigationActions.navigate({routeName:"app"}), state)
                            console.log("user authenticated\n" + JSON.stringify({...initialNavState, ...action.payload.nav}))
                            return {...initialNavState, ...action.payload.nav}

                        }
                        else {
                            let st = Main.router.getStateForAction(NavigationActions.navigate({routeName: "oauth"}), state)
                            console.log("user not authenticated\n" + JSON.stringify(st))
                            return st
                        }

                    }
                    else {
                        return {...state};
                    }

                    // let route = action.payload.nav.routes[action.payload.nav.index];
                    //let routeName = route.hasOwnProperty("routes") ? route.routes[route.index].routeName : route.routeName;

                    //route=Main.router.getStateForAction(NavigationActions.navigate({routeName:"app"}), action.payload.nav)
                    //alert(JSON.stringify(action.payload.nav))
                    // return {...action.payload.nav};
                    //alert(JSON.stringify(action.type))
                }

            return {...state};*/
        default:
            //alert(JSON.stringify(action.type))
            return {...state}
    }

}


class root extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        "use strict";
        const {dispatch, nav, user, activity}=this.props;

        let navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
                <Button title="Account" onPress={() =>
                    this.goToAccount()
                }/>
            </View>
        );

        return (
            <DrawerLayoutAndroid ref={component => {
                this.drawer = component
            }}
                                 drawerWidth={300}
                                 drawerPosition={DrawerLayoutAndroid.positions.Left}
                                 renderNavigationView={() => navigationView}
                                 onDrawerOpen={() => this.drawerOpen = true}
                                 onDrawerClose={() => this.drawerOpen = false}
            >


                {activity.isLoading && <Activity />}


                <ViewPagerAndroid
                    keyboardDismissMode='on-drag'
                    initialPage={0}
                    scrollEnabled={true}

                    style={{flex: 1}}
                    ref={(el) => this._viewPager = el}>
                    {this._renderScene().map((child, i) => (
                        <View
                            key={"key" + i}
                            testID={"test" + i}
                            style={{flex: 1}}>
                            {child}
                        </View>
                    ))}
                </ViewPagerAndroid>


            </DrawerLayoutAndroid>


        )
    }


    _renderScene = () => {
        const {dispatch, nav, user, activity}=this.props;


        return [
            <IntroOne setPage={this._setPage}/>,

            <IntroTwo setPage={this._setPage}/>,

            <Oauth screenProps={{setPage: this._setPage, user, drawer: this.drawer}}/>,

            <Main screenProps={{drawer: this.drawer, user, activity, setPage: this._setPage}}
                  ref={component => {
                      this.main = component
                  }}
                  navigation={addNavigationHelpers({dispatch, state: nav})}
            />]

    }
    _setPage = (name) => {

        let index = 0;
        switch (name) {
            case "IntroOne":
                index = 0
                break;
            case "IntroTwo":
                index = 1;
                break;
            case "Oauth":
                index = 2;
                break
            case "app":
                index = 3;
                break
            default:
                index = null
        }
        if (this._viewPager && index) {
            if (this._viewPager.props.animationEnabled !== false) {
                this._viewPager.setPage(index);
            } else {
                this._viewPager.setPageWithoutAnimation(index);
            }
        }
    }

    componentWillMount() {
        //const {user}=this.props;


    }

    componentDidMount() {
       // const {user} = this.props;
        /*this.shouldClose=false;

         BackAndroid.addEventListener('backPress', () => {
         const { dispatch, nav,user } = this.props;
         if(this.drawerOpen){
         this.closeDrawer();
         return true;
         }
         if (this.shouldCloseApp(nav)) return false

         dispatch({ type: NavigationActions.BACK })
         return true
         })*/
        // const res= user.isNewUser?this._setPage("IntroOne"):user.isAuthenticated?this._setPage("app"):this._setPage("Oauth")

        //return user.isNewUser?this._setPage("IntroOne"):user.isAuthenticated?this._setPage("app"):this._setPage("Oauth")
    }

    componentDidUpdate() {
        const {user} = this.props;
        const res = user.isNewUser ? this._setPage("IntroOne") : user.isAuthenticated ? this._setPage("app") : this._setPage("Oauth")

    }

    shouldCloseApp(nav) {
        return false
        if (nav.hasOwnProperty("routes")) {
            let route = nav.routes[nav.index];
            if (route.hasOwnProperty("routes")) {
                if (route.index === 0) {
                    if (this.shouldClose) {
                        //
                        BackAndroid.exitApp()
                        return true
                    }
                    // alert("hello")
                    this.shouldClose = true;
                    const cb = () => {
                        //alert("hello")
                        this.shouldClose = false;
                    }
                    setTimeout(cb.bind(this), 5000);
                    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

                    return false
                }

                // ToastAndroid.showWithGravity('All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }
        return false
    }

    componentWillUnmount() {
        //BackAndroid.removeEventListener('backPress')
    }

    goToAccount() {
        this.closeDrawer();

        setTimeout(() => {

            this._setPage("Oauth")
        }, 500)

    }

    navigate(route) {
        if (route) {
            this.main.props.navigation.navigate(route)
        }
        else {
            console.warn("navigate require a valid route")
        }
    }

    closeDrawer() {
        this.drawer.closeDrawer();
    }

    openDrawer() {
        this.drawer.openDrawer();
    }
}


const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        user: state.user,
        activity: state.activity
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (cmd) => {
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



