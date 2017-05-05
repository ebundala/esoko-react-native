

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

import configStore from './src/store'


 let store=configStore();
 
 
export default class eSoko extends Component {

    constructor() {
        super();
        this.state = { rehydrated: false }
    }

    componentWillMount(){

        persistStore(store, {storage:AsyncStorage,blacklist: ['activity',"nav"]},() => {
            this.setState({ rehydrated: true })

        });

    }

    render() {
        if(!this.state.rehydrated){
            return null
        }
        return (
            <Provider store={store}>
                <App />
            </Provider>

        );
    }





}


AppRegistry.registerComponent('eSoko', () => eSoko);
