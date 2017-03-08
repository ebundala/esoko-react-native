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
} from 'react-native';

//import { Button, Card } from 'react-native-material-design';

import styles from '../../styles/styles'
import * as actions from '../activitIndicatorAction'

export class ActivityWrapper extends Component{
    render(){
        return(
            <View style={[styles.flex1,styles.alignItemsCenter,styles.centerJustified]}>
                {!this.props.isError&&
                <TouchableHighlight onPress={()=>this.props.startActivity()}>
                    <Text>Loading</Text>
                </TouchableHighlight>
                }
                <Text>{this.props.message}</Text>
                {this.props.isError&&<View >

                <Button title="OK" onPress={this.props.endActivity()}></Button>
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

        activityError:()=>{
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
