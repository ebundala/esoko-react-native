/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    Button
} from 'react-native';
import {Statuses,Menu}  from "../../statuses/components/statuses"
import { StackNavigator } from 'react-navigation';

let ctx;
export default class home extends Component{

constructor(props){
    super(props);

}
    static navigationOptions = {
        title: 'Home',

        header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu  onPress={()=>ctx.openDrawer()}/>
            );

            return { right ,left};
        },

    };
    openDrawer(){
        this.props.screenProps.drawer.openDrawer()
    }
    render(){
        ctx=this;
        let {navigate}=this.props.navigation;
      return(


             <View style={{flex:1,justifyContent:"space-around"}}>
                 <Text>{JSON.stringify(this.props.screenProps.user)}</Text>
                 <Button title="products" onPress={()=>navigate("products")}/>
                 <Button title="reviews" onPress={()=>navigate("reviews")}/>
             </View>


      )
    }
}











/*
class AllView extends Component{
    static navigationOptions = {
        title: 'allView',
        /!*header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },*!/

    };
    render(){
        let navigate=this.props.navigation.navigate;
        return(
            <View style={{flex:1,justifyContent:"space-between"}}>
            <Text>AllView</Text>
            <Button title="view One" onPress={()=>navigate("single",{title:"view one"})}/>
                <Button title="view two" onPress={()=>navigate("single",{title:"view two"})}/>
                <Button title="view three" onPress={()=>navigate("single",{title:"view three"})}/>
                <Button title="view four" onPress={()=>navigate("single",{title:"view four"})}/>
        </View>
        )
    }
}

class SingleView extends Component{
    static navigationOptions = {
        title: ({ state, setParams ,navigate}) => {
            return state.params.title
        },
        /!*header: ({ state, setParams ,navigate}) => {
            let  right=(<Statuses navigate={navigate}/>
            );
            let  left=(<Menu navigate={navigate}/>
            );

            return { right ,left};
        },*!/

    };
    render(){
        return(
            <View style={{flex:1}}>
                <Text>singleView</Text>
            </View>
        )
    }
}

export const TestPage=StackNavigator({
  all:{screen:AllView}  ,
  single:{screen:SingleView}
},{headerMode:"none"})*/
