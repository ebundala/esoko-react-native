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
                {!this.props.isError&&
                <TouchableHighlight onPress={()=>this.props.activityError("failed to load")}>
                    <ActivityIndicator></ActivityIndicator>
                </TouchableHighlight>
                }
                <View style={{paddingLeft:20,paddingRight:20,paddingBottom:5}}>

                    <Text >{this.props.message}</Text>
                </View>

                {this.props.isError&&<View >

                <Button color="red" title="OK" onPress={()=>this.props.endActivity()}></Button>
                </View>}

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


const Activity = connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityWrapper);
export default Activity
