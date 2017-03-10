/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';
import Statuses from "../../statuses/components/statuses"
export default class home extends Component{
    static navigationOptions = {
        title: 'Home',
        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
              );


            return { right };
        }
    };
    render(){
        return(
        <View>
            <Text>home screen</Text>
        </View>
        )
    }
}