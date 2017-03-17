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
        title: 'Reviews',
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

                <Button title="Reviews One" onPress={()=>navigate("singleReview",{title:"Reviews one"})}/>
                <Button title="Reviews two" onPress={()=>navigate("singleReview",{title:"Reviews two"})}/>
                <Button title="Reviews three" onPress={()=>navigate("singleReview",{title:"Reviews three"})}/>
                <Button title="Reviews four" onPress={()=>navigate("singleReview",{title:"Reviews four"})}/>
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

const reviews=StackNavigator({
    allReviews:{screen:AllView}  ,
    singleReview:{screen:SingleView}
},{headerMode:"none"});

export default reviews;