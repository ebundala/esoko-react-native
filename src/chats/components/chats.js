/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

import {Statuses,Menu,DrawerIcon}  from "../../statuses/components/statuses"

export default class chats extends Component{
    static navigationOptions = {
        title: 'chats',
        /*header: ({ state, setParams ,navigate}) => {

            let  left=(<Menu navigate={navigate}/>
            );

            return { left};
        },*/

    };
    render(){
        return(
            <View>
                <Text>chats page</Text>
            </View>
        )
    }
}