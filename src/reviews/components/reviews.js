/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';


export default class reviews extends Component{
    static navigationOptions = {
        title: 'reviews',
    };
    render(){
        return(
            <View>
                <Text>reviews page</Text>
            </View>
        )
    }
}