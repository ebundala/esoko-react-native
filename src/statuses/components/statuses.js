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
export  class Statuses extends Component{


    render(){
        return(
            <View style={styles.horizontal}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("bids")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="notifications"  />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("chats")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="message"  />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("orders")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="shopping-cart"  />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}


export  class Menu extends Component{


    render(){
        return(
            <View style={styles.horizontal}>
                <TouchableNativeFeedback
                    onPress={()=>this.props.navigate("DrawerOpen")}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Icon name="menu"  />
                    </View>
                </TouchableNativeFeedback>

            </View>
        )
    }
}

export  class DrawerIcon extends Component{
    render(){
        return(
            <TouchableNativeFeedback
                onPress={()=>this.props.navigate("bids")}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View>
                    <Icon name="notifications"  />
                </View>
            </TouchableNativeFeedback>
        )
    }
}