/**
 * Created by ebundala on 3/11/2017.
 */
import React, { Component } from 'react';

import {
    TouchableNativeFeedback,
    View
} from 'react-native';
import styles from '../../styles/styles'
import {Icon } from 'react-native-material-design';
export default class statuses extends Component{


    render(){
        return(
            <View style={styles.horizontal}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("bids")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="notifications" size={26} />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("chats")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="message" size={26} />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("orders")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="shopping-cart" size={26} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}