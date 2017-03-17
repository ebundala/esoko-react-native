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
                <Button title="Products three" onPress={()=>navigate("singleProduct",{title:"Products three"})}/>
                <Button title="Products four" onPress={()=>navigate("singleProduct",{title:"Products four"})}/>
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

const products=StackNavigator({
    allProducts:{screen:AllView}  ,
    singleProduct:{screen:SingleView}
},{headerMode:"none"})

export default products;