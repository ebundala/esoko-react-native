/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';



class AllView extends Component{
    static navigationOptions = {
        title:({ state, setParams ,navigate}) => {
            return state.params.product.title+" Bids"
        }
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

                <Button title="bids One" onPress={()=>navigate("singleBid",{title:"bids one"})}/>
                <Button title="bids two" onPress={()=>navigate("singleBid",{title:"bids two"})}/>
                <Button title="bids three" onPress={()=>navigate("singleBid",{title:"bids three"})}/>
                <Button title="bids four" onPress={()=>navigate("singleBid",{title:"bids four"})}/>
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

const bids=StackNavigator({
    allBids:{screen:AllView}  ,
    singleBid:{screen:SingleView}
},{headerMode:"none"})

export default bids;