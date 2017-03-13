/**
 * Created by ebundala on 3/13/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback
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
            <View style={{flex:1}}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigation.navigate("introTwo")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                <Text>introOne page</Text>
                    </View>
                </TouchableNativeFeedback>
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
            <View style={{flex:1}}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigation.navigate("introThree")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                <Text>introTwo page</Text>
                    </View>
                </TouchableNativeFeedback>
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
            <View style={{flex:1}}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigation.navigate("app")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                <Text>introThree page</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}