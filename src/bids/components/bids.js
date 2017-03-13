/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
    } from 'react-native';

import {Statuses,Menu,DrawerIcon}  from "../../statuses/components/statuses"

export default class bids extends Component{

    static navigationOptions = {
        title: 'bids',
       /* header: ({ state, setParams ,navigate}) => {

            let  left=(<Menu navigate={navigate}/>
            );

            return { left};
        },*/

    };
    render(){
        return(
            <View>
                <Text>bids page</Text>
            </View>
        )
    }
}