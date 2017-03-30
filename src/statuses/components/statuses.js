/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    TouchableNativeFeedback,
    View,
    Text
} from 'react-native';
import styles from '../../styles/styles'
import {Icon } from 'react-native-material-design';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import * as actions from '../../products/products.actions'

class Badge extends Component
{
    render()
    {

        return this.props.count>0?
            (<View
            style={{
                minWidth: 16, minHeight: 16,
                position: "absolute",
                top: 0, right: 0,
                borderRadius: 8,

                backgroundColor: "red",
                zIndex: 5,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
            }}>
                <Text style={{fontSize: 8, color: "white", fontWeight: "bold"}}>{this.props.count}</Text>
            </View>

        ):<View/>
    }
}

export  class StatusesComponet extends Component{


    render(){
        let {navigate}=this.props;
        return(
            <View style={styles.horizontal}>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.placeBid({title:'my bids',uid:'all'},navigate);this.props.changeBids(58)}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>

                       <Badge count={this.props.bids}/>
                        <Icon name="notifications"  />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.startChat({title:'my chats',uid:'all'},navigate),this.props.changeMessages(78);}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Badge count={this.props.messages}/>
                        <Icon name="message"  />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.placeOrder({title:'my chats',uid:'all'},navigate),this.props.changeOrders(776)}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Badge count={this.props.orders}/>
                        <Icon name="shopping-cart"  />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
    "use strict";
    return{
        ...state.notifications
    }
}
const  mapDispatchToProps=(dispatch)=>{
    "use strict";
    return{
        changeBids:(count=0)=>{
            dispatch({type:"CHANGE_BIDS_COUNT",data:count})
        },
        changeMessages:(count=0)=>{
            dispatch({type:"CHANGE_MESSAGES_COUNT",data:count})
        },
        changeOrders:(count=0)=>{
            dispatch({type:"CHANGE_ORDERS_COUNT",data:count})
        },
        ...bindActionCreators(actions,dispatch)
    }

}

export function statusReducers(state={bids:0,messages:0,orders:0},action)
{
    switch (action.type){
        case "CHANGE_BIDS_COUNT":
            return{
                ...state,
                bids:state.bids>0?0:action.data//Todo toggle to be removed
            }
        case "CHANGE_MESSAGES_COUNT":
            return{
                ...state,
                messages: state.messages>0?0:action.data//Todo toggle to be removed
            }
        case "CHANGE_ORDERS_COUNT":
            return{
                ...state,
                orders:state.orders>0?0:action.data//Todo toggle to be removed
            }
        default:
            return state;
    }


}

export const Statuses=connect(
    mapStateToProps
    ,mapDispatchToProps
)(StatusesComponet);

export  class Menu extends Component{


    render(){
        return(
            <View style={styles.horizontal}>
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="menu"  />
                    </View>
                </TouchableNativeFeedback>

            </View>
        )
    }
}

