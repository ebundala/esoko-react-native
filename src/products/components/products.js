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

import Reviews from "../../reviews/components/reviews"

class AllView extends Component{
    static navigationOptions = {
        title: 'Products',
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

                <Button title="Products One" onPress={()=>navigate("singleProduct",{title:"Products one"})}/>
                <Button title="Products two" onPress={()=>navigate("singleProduct",{title:"Products two"})}/>
                <Button title="review all" onPress={()=>navigate("reviews",{title:"Review four"})}/>


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
        let navigate=this.props.navigation.navigate;
        return(
            <View style={{flex:1}}>
                <Text>singleView</Text>
                <Button title="review all" onPress={()=>navigate("reviews")}/>

            </View>
        )
    }
}

const products=StackNavigator({
    allProducts:{screen:AllView}  ,
    singleProduct:{screen:SingleView},
    reviews:{screen:Reviews}
},{headerMode:"none"})

export default products;