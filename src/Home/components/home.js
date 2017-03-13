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
let ctx;
export default class home extends Component{
constructor(props){
    super(props)
    ctx=this
}
    static navigationOptions = {
        title: 'Home',

        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>
            );

            return { right ,left};
        },

    };
    openDrawer(){
        this.props.screenProps.openDrawer()
    }
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

