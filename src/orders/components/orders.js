/**
 * Created by ebundala on 3/11/2017.
 */



'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';
















class AllView extends Component{
    static navigationOptions = {
        title: 'Orders',
        /*header: ({ state, setParams ,navigate}) => {
         let  right=(<Statuses navigate={navigate}/>
         );
         let  left=(<Menu navigate={navigate}/>
         );

         return { right ,left};
         },*/

    };
    render(){
        let navigate=this.props.navigation.navigate;
        return(


            <View style={{flex:1,justifyContent:"space-around"}}>

                <Button title="Orders One" onPress={()=>navigate("singleOrder",{title:"Orders one"})}/>
                <Button title="Orders two" onPress={()=>navigate("singleOrder",{title:"Orders two"})}/>
                <Button title="Orders three" onPress={()=>navigate("singleOrder",{title:"Orders three"})}/>
                <Button title="Orders four" onPress={()=>navigate("singleOrder",{title:"Orders four"})}/>
            </View>
        )
    }
}

class SingleView extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
        },
        /*header: ({ state, setParams ,navigate}) => {
         let  right=(<Statuses navigate={navigate}/>
         );
         let  left=(<Menu navigate={navigate}/>
         );

         return { right ,left};
         },*/

    };
    render(){
        return(
            <View style={{flex:1}}>
                <Text>singleView</Text>
            </View>
        )
    }
}

 const orders=StackNavigator({
    allOrders:{screen:AllView}  ,
    singleOrder:{screen:SingleView}
},{headerMode:"none"})





export default orders;