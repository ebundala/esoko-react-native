/**
 * Created by ebundala on 3/13/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableNativeFeedback,
    Button
} from 'react-native';

//import {Statuses,Menu,DrawerIcon}  from "../../statuses/components/statuses"

export class IntroOne extends Component{
    static navigationOptions = {
        title: 'introOne',
       /* header: ({ state, setParams ,navigate}) => {

            let  left=(<Menu navigate={navigate}/>
            );

            return { left};
        },*/

    };
    render(){
        let{setPage}=this.props;
        return(
            <View style={{flex:1,justifyContent:'space-between'}}>
                <Text>intro One page</Text>

                    <View>

                <Button title="Next" onPress={()=>setPage("IntroTwo")}/>
                    </View>

            </View>
        )
    }
}


export class IntroTwo extends Component{
    static navigationOptions = {
        title: 'introTwo',
        /* header: ({ state, setParams ,navigate}) => {

         let  left=(<Menu navigate={navigate}/>
         );

         return { left};
         },*/

    };
    render(){
        let{setPage}=this.props;
        return(
            <View style={{flex:1,justifyContent:'space-between'}}>
                <Text>intro two page</Text>

                    <View>

                        <Button title="Next" onPress={()=>setPage("Oauth")}/>
                    </View>

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
            <View style={{flex:1,justifyContent:'space-between'}}>
                <Text>intro three page</Text>

                    <View>

                        <Button title="Next" onPress={()=>this.props.navigation.navigate("app")}/>
                    </View>

            </View>
        )
    }
}