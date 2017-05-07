

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
    AsyncStorage
} from 'react-native';
import { persistStore} from 'redux-persist'
import { Provider } from 'react-redux'
import App from "./src/app"
import Firestack from "react-native-firestack";
import {USER_ACTIONS} from "./src/user/user.actions"
const firestack =new Firestack();
import configStore from './src/store'


 let store=configStore();
 
 
export default class eSoko extends Component {

    constructor() {
        super();
        this.state = { rehydrated: false ,authChecked:false}
    }

    componentWillMount(){
        firestack.auth.listenForAuth((evt)=>{

            // evt is the authentication event
            // it contains an `error` key for carrying the
            // error message in case of an error
            // and a `user` key upon successful authentication
            if (!evt.authenticated) {
                // There was an error or there is no user
                console.log(evt)
                //NavigationOauth.navigate("start")
                // setPage("Oauth")
                store.dispatch(
                    {
                        type: USER_ACTIONS.LOGOUT,
                        status: "OK"
                        //data:null
                    }
                )
                //userLoggedOut(evt,NavigationOauth.navigate,setPage,dispatch)

            } else {
                // evt.user contains the user details
                console.log('User details', evt.user);
                // NavigationOauth.navigate("account")
                // setPage("app")
                store.dispatch({
                    type: USER_ACTIONS.LOGIN,
                    status: "OK",
                    data: {
                        ...evt
                    }
                });
                //userLoggedIn(evt,NavigationOauth.navigate,setPage,dispatch)



            }

            this.setState({authChecked:true});

        })
            .then(()=>console.log('Listening for authentication changes'))

        persistStore(store, {storage:AsyncStorage,blacklist: ['activity',"nav"]},() => {


            this.setState({ rehydrated: true })

        });

    }
    componentWillUnmount() {
        //BackAndroid.removeEventListener('backPress');
        firestack.auth.unlistenForAuth();
    }
    render() {
        if(this.state.rehydrated&&this.state.authChecked){
            return(
                <Provider store={store}>
                    <App/>
                </Provider>

            );
        }
        return null
    }





}


AppRegistry.registerComponent('eSoko', () => eSoko);
