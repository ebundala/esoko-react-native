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
    ViewPagerAndroid,
    Modal
} from 'react-native';
import {connect,} from 'react-redux'
import {bindActionCreators} from "redux"
import {REHYDRATE} from 'redux-persist/constants'
import {StackNavigator, NavigationActions, TabNavigator, addNavigationHelpers,} from 'react-navigation';
import {TabViewPagerAndroid} from 'react-native-tab-view';

import Oauth from "./user/components/loginPage"
import {SingleProductView,ProductsList} from "./products/components/products"
import {OrdersList,SingleOrderView} from "./orders/components/orders"
import {BidsList,SingleBidView} from "./bids/components/bids"
import {SingleReviewView,ReviewsList} from "./reviews/components/reviews"
import {ChatsList,SingleChatView} from "./chats/components/chats"
import Activity from "./activityIndicator/components/activityIndicator"
import Home from  "./Home/components/home"
import {IntroOne, IntroTwo} from "./intro/components/intro"
import NavigationView from "./navigationView/components/navigationView"
import {styles} from "./styles/styles"
import * as actions from  "./products/products.actions"





const StackHome = {
    Home: {screen:Home},
    products: {screen: ProductsList},
    singleProduct:{screen:SingleProductView},
    orders: {screen:OrdersList},
    singleOrder: {screen:SingleOrderView},
    bids: {screen:BidsList},
    singleBid: {screen:SingleBidView},
    reviews: {screen:ReviewsList},
    singleReview: {screen:SingleBidView},
    chats: {screen: ChatsList},
    singleChat: {screen: SingleChatView},

};


const Main = StackNavigator(StackHome)















class root extends Component {
    constructor(props) {
        super(props)
        this.seInitialtPage=true;

    }

    render() {
        "use strict";


        const {dispatch, nav, user, activity,navOauth}=this.props;
        console.log(this.props)

        return (

            <DrawerLayoutAndroid ref={component => {this.drawer = component}}
                                 drawerWidth={300}
                                 drawerPosition={DrawerLayoutAndroid.positions.Left}
                                 renderNavigationView={()=> <NavigationView root={this} navigation={addNavigationHelpers({dispatch, state: nav})}/>}
                                 onDrawerOpen={() => this.drawerOpen = true}
                                 onDrawerClose={() => this.drawerOpen = false}
            >



                <Modal
                           animationType={"slide"}
                           transparent={true}
                           visible={activity.isLoading}
                           onRequestClose={() => {alert("Modal has been closed.")}}
                          >
                    <Activity />
                </Modal>

                <ViewPagerAndroid
                    keyboardDismissMode='on-drag'
                    initialPage={3}
                    scrollEnabled={false}

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
        const {dispatch, nav, user, screenProps,navOauth}=this.props;


        return [
            <IntroOne setPage={this._setPage}/>,

            <IntroTwo setPage={this._setPage}/>,

            <Oauth screenProps={{setPage: this._setPage, user, drawer: this.drawer}}
                   navigation={addNavigationHelpers({dispatch, state:navOauth})}
            />,

            <Main screenProps={{drawer: this.drawer,setPage: this._setPage,...screenProps}}
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
                index = 0;

                break;
            case "IntroTwo":
                index = 1;
                break;
            case "Oauth":
                index = 2;
                break;
            case "app":
                index = 3;
                break
            default:
               // alert(name)
                index = null
        }
        if (this._viewPager && index!==null) {
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

    componentDidMount(){
        const {user} = this.props;
        this.shouldClose=false;

         BackAndroid.addEventListener('backPress', () => {
         const { dispatch, nav,user } = this.props;
         if(this.drawerOpen){
         this.closeDrawer();
         return true;
         }
         if (this.shouldCloseApp(nav)) return false

         dispatch({ type: NavigationActions.BACK })
         return true
         })

        //const res = user.isNewUser ? this._setPage("IntroOne") : !user.isAuthenticated ? this._setPage("Oauth"):null /*this._setPage("app")*/
    }

    componentDidUpdate() {
        //alert("seInitialtPage "+this.seInitialtPage)
        if(this.seInitialtPage)
        {
            const {user} = this.props;
             user.isNewUser ? this._setPage("IntroOne") : !user.isAuthenticated ? this._setPage("Oauth") : null;
            /*this._setPage("app")*/
        }

        this.seInitialtPage=false;
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
        BackAndroid.removeEventListener('backPress')
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
        navOauth:state.navOauth,
        nav: state.nav,
        user: state.user,
        activity: state.activity
    }
}
const mapDispatchToProps=(dispatch)=>{

    "use strict";
    return {...bindActionCreators(actions,dispatch),dispatch}

}
const mergeProps = (stateProps, dispatchProp, ownProps) => {

    return {
        ...ownProps,
        ...stateProps,
        dispatch:dispatchProp.dispatch,
        screenProps: {
            activity:stateProps.activity,
            user:stateProps.user,
            ...dispatchProp,

        }
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(root);
export default App


const initialNavState = {
    routes: [
        //{ key: 'introOne', routeName: 'introOne' },
        //   { key: 'introTwo', routeName: 'introTwo' },
        // { index: 0, routes: [ { routeName: 'start', key: 'Init' } ], key: 'oauth', routeName: 'oauth' },
        {index: 0, routes: [{routeName: 'Home', key: 'Init'}], key: 'Home', routeName: 'Home'}],
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
        case REHYDRATE:
            //alert(JSON.stringify(action.type))

            if (action.hasOwnProperty("payload"))
                if (action.payload.hasOwnProperty("nav") ? action.payload.nav : false) {

                    if (action.payload.hasOwnProperty("user")) {
                        const user = action.payload.user;


                        if (user.isNewUser) {

                            //  let newState = Main.router.getStateForAction(NavigationActions.navigate({routeName: "introOne"}), state)
                            // console.log("new user\n" + JSON.stringify({...initialNavState, ...newState}))
                            // return {...initialNavState, ...newState}
                        }
                        else if (user.isAuthenticated) {

                            // let st=Main.router.getStateForAction(NavigationActions.navigate({routeName:"app"}), state)
                            //console.log("user authenticated\n" + JSON.stringify({...initialNavState, ...action.payload.nav}))
                            return {...initialNavState, ...action.payload.nav}

                        }
                        else {
                            //let st = Main.router.getStateForAction(NavigationActions.navigate({routeName: "oauth"}), state)
                            // console.log("user not authenticated\n" + JSON.stringify(st))
                            // return st
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

            return {...state};
        default:
            //alert(JSON.stringify(action.type))
            return {...state}
    }

}

const initialOauthNavState = {
    routes: [
        //{ key: 'introOne', routeName: 'introOne' },
        //   { key: 'introTwo', routeName: 'introTwo' },
        // { index: 0, routes: [ { routeName: 'start', key: 'Init' } ], key: 'oauth', routeName: 'oauth' },
        {index: 0, routes: [{routeName: 'start', key: 'Init'}], key: 'start', routeName: 'start'}],
    index: 0
};

export const oauthRouteReducers = (state = initialOauthNavState, action) => {

    //console.warn(action.type);
    switch (action.type) {
        case NavigationActions.BACK:
        case NavigationActions.NAVIGATE:
        case NavigationActions.INIT:
        case NavigationActions.RESET:
        case NavigationActions.SET_PARAMS:
            const routeName=state.routes[state.index].routeName

            if((routeName==="account")&&action.type===NavigationActions.BACK)
            {
                //Todo riderect to app if user is loged in

                return{...state}
            }
            else if((routeName==="start")&&action.type===NavigationActions.BACK){
                return {...initialOauthNavState}
            }
            return Oauth.router.getStateForAction(action, state);

        case REHYDRATE:


            if (action.hasOwnProperty("payload"))
                if (action.payload.hasOwnProperty("navOauth") ? action.payload.navOauth : false) {

                    if (action.payload.hasOwnProperty("user")) {
                        const user = action.payload.user;

                        if (user.isAuthenticated) {

                            return {...initialOauthNavState, ...action.payload.navOauth}
                        }
                        else {

                            return {...initialOauthNavState}
                        }



                    }
                    else {
                        return {...state};
                    }

                }

            return {...state};
        default:
            //alert(JSON.stringify(action.type))
            return {...state}
    }

}
