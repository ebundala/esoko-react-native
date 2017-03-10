/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';


export default class products extends Component{
    static navigationOptions = {
        title: 'products',
    };
    render(){
        return(
            <View>
                <Text>products page</Text>
            </View>
        )
    }
}