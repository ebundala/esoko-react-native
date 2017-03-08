/**
 * Created by ebundala on 2/24/2017.
 */
import React, { Component } from 'react';
import {
   // AppRegistry,
   // StyleSheet,
    Text,
    View,
  // TouchableHighlight
    } from 'react-native';
import { connect } from 'react-redux'
import Oauth from "./user/components/loginPage"
import Activity from "./activityIndicator/components/activityIndicator"
class  root extends Component{
    render(){
        return(
     <View style={{flex:1}}>

         {this.props.activity.isLoading&&<Activity  />}

         {!this.props.activity.isLoading&&<Oauth/>}

     </View>

)}


}
const mapStateToProps = (state) => {
    return{...state}
}


const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(root);
export default App




/*const styles = StyleSheet.create({

})*/;
