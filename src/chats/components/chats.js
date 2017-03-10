/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';


export default class chats extends Component{
    static navigationOptions = {
        title: 'chats',
    };
    render(){
        return(
            <View>
                <Text>chats page</Text>
            </View>
        )
    }
}