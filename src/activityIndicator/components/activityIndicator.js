/**
 * Created by ebundala on 3/8/2017.
 */


import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux'

import {
Button,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

//import { Button, Card } from 'react-native-material-design';

import styles from '../../styles/styles'
import * as actions from '../activitIndicatorAction'

export class ActivityWrapper extends Component{
    render(){
        return(

            <View style={[styles.flex1,styles.alignItemsCenter,styles.centerJustified]}>
                <View style={{backgroundColor:"white"}}>
                {!this.props.isError&&

                    <ActivityIndicator ></ActivityIndicator>

                }
                <View style={{paddingLeft:20,paddingRight:20,paddingBottom:5}}>
                    <TouchableHighlight onPress={()=>this.props.activityError("failed to load")}>
                    <Text style={{color:"black"}}>{this.props.message}</Text>
                    </TouchableHighlight>
                </View>

                {this.props.isError&&<View style={{paddingLeft:20,paddingRight:20,paddingBottom:5}}>

                <Button color="red" title="OK" onPress={()=>this.props.endActivity()}></Button>
                </View>}
                </View>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return{...state.activity}
}


const mapDispatchToProps = (dispatch) => {
    return {

        endActivity:(data)=>{
    "use strict";
    dispatch(actions.endActivity())
},

        startActivity:(data)=>{
    "use strict";
    dispatch(actions.endActivity(data))
        },

        activityError:(data)=>{
    "use strict";
    dispatch(actions.activityError(data))
        }
    }
}


const Activity =connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityWrapper);
export default Activity
