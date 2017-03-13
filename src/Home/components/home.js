/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    DrawerLayoutAndroid,
    TouchableNativeFeedback
} from 'react-native';
import {Statuses,Menu}  from "../../statuses/components/statuses"
import { StackNavigator ,DrawerNavigator,TabNavigator} from 'react-navigation';

import Oauth from "../../user/components/loginPage"
export default class home extends Component{
    static navigationOptions = {
        title: 'Home',

        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },

    };
    render(){
      return( <View>
            <Text>home</Text>
        </View>
      )
    }
}

class HomeOne extends Component{
    static navigationOptions = {
        title: 'HomeOne',
        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },

    };
    render(){
        return(
            <View>
            <Text>homeOne</Text>
        </View>
        )
    }
}

class HomeTwo extends Component{
    static navigationOptions = {
        title: 'HomeTwo',
        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },

    };
    render(){
        return(
            <View>
                <Text>homeTwo</Text>
            </View>
        )
    }
}

