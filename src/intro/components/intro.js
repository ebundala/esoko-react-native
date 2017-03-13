/**
 * Created by ebundala on 3/13/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

//import {Statuses,Menu,DrawerIcon}  from "../../statuses/components/statuses"

export class introOne extends Component{
    static navigationOptions = {
        title: 'introOne',
       /* header: ({ state, setParams ,navigate}) => {

            let  left=(<Menu navigate={navigate}/>
            );

            return { left};
        },*/

    };
    render(){
        return(
            <View>
                <Text>introOne page</Text>
            </View>
        )
    }
}


export class introTwo extends Component{
    static navigationOptions = {
        title: 'introTwo',
        /* header: ({ state, setParams ,navigate}) => {

         let  left=(<Menu navigate={navigate}/>
         );

         return { left};
         },*/

    };
    render(){
        return(
            <View>
                <Text>introTwo page</Text>
            </View>
        )
    }
}


export  class introThree extends Component{
    static navigationOptions = {
        title: 'introThree',
        /* header: ({ state, setParams ,navigate}) => {

         let  left=(<Menu navigate={navigate}/>
         );

         return { left};
         },*/

    };
    render(){
        return(
            <View>
                <Text>introThree page</Text>
            </View>
        )
    }
}