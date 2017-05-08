

import React, { Component } from 'react';
import {
  AppRegistry,
 // StyleSheet,
    Image,
  View,
    ActivityIndicator,
 // TouchableHighlight,
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


        persistStore(store, {storage:AsyncStorage,blacklist: ['activity',"nav"]},() => {
            firestack.auth.listenForAuth((evt)=>{

                // evt is the authentication event
                // it contains an `error` key for carrying the
                // error message in case of an error
                // and a `user` key upon successful authentication
                if (!evt.authenticated) {
                    // There was an error or there is no user

                    //NavigationOauth.navigate("start")
                    // setPage("Oauth")
                    let {user}=store.getState();
                    console.log("user obj ",user)
                    if(user.isNewUser){
                    store.dispatch(
                        {
                            type: USER_ACTIONS.LOGOUT,
                            status: "Initial"
                            //data:null
                        }
                    )
                    }
                    else {
                        store.dispatch(
                            {
                                type: USER_ACTIONS.LOGOUT,
                                status: "OK"
                                //data:null
                            })
                    }

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
        return (
            <View style={{flex:1}}>
                <Image source={require("./src/pngs/background.png")} style={{resizeMode:Image.resizeMode.cover,height:null,width:null,flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgb(0,0,0)"}}>
                <ActivityIndicator size={50}></ActivityIndicator>
                </Image>
        </View>)
    }





}


AppRegistry.registerComponent('eSoko', () => eSoko);
