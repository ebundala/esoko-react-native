/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    Text,
    View,
    Button
} from 'react-native';

import { Toolbar} from 'react-native-material-ui';



export class BidsList extends Component{

    render(){
        let {navigate,goBack}=this.props.navigation;
        let {product}=this.props.navigation.state.params;
        return(
            <View style={{flex:1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement={product.title}
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                />
                <View style={{justifyContent:"space-around"}}>
                <Button title="bids One" onPress={()=>navigate("singleBid",{title:"bids one"})}/>
                <Button title="bids two" onPress={()=>navigate("singleBid",{title:"bids two"})}/>
                <Button title="bids three" onPress={()=>navigate("singleBid",{title:"bids three"})}/>
                <Button title="bids four" onPress={()=>navigate("singleBid",{title:"bids four"})}/>
                </View>
                </View>
        )
    }
}

export class SingleBidView extends Component{

    render(){
        let {navigate,goBack}=this.props.navigation;
        let {title}=this.props.navigation.state.params
        return(
            <View style={{flex:1}}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement={title}

                />
                <Text>singleView</Text>
            </View>
        )
    }
}
/*

const bids=StackNavigator({
    allBids:{screen:AllView}  ,
    singleBid:{screen:SingleView}
},{headerMode:"none"})

export default bids;*/
