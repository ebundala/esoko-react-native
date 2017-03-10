/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';


export default class orders extends Component{
    static navigationOptions = {
        title: 'Orders',
    };
    render(){
        return(
            <View>
                <Text>orders page</Text>
            </View>
        )
    }
}