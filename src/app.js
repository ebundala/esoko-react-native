/**
 * Created by ebundala on 2/24/2017.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
    } from 'react-native';
import LoginPage from "./user/components/LoginPage"
 const App = () => (
 <LoginPage onSubmit={(x,y)=>alert(x+" / "+y)}  oAuth={(x)=>alert("auth using\n"+x)} validateEmail={(x)=>alert("validate\n"+x)}></LoginPage>


)

export default App




const styles = StyleSheet.create({
    container: {

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
