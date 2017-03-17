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
        title: 'Chats',
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

                <Button title="chats One" onPress={()=>navigate("singleChat",{title:"chats one"})}/>
                <Button title="chats two" onPress={()=>navigate("singleChat",{title:"chats two"})}/>
                <Button title="chats three" onPress={()=>navigate("singleChat",{title:"chats three"})}/>
                <Button title="chats four" onPress={()=>navigate("singleChat",{title:"chats four"})}/>
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

const chats=StackNavigator({
    allChats:{screen:AllView}  ,
    singleChat:{screen:SingleView}
},{headerMode:"none"})

export default chats;