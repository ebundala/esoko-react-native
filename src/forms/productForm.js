/**
 * Created by ebundala on 5/11/2017.
 */
import React,{Component} from "react";
import {
    Text,
    View,
    TextInput,
    TouchableNativeFeedback,
    Modal
} from "react-native";
import {StackNavigator} from "react-navigation";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {Toolbar, Divider, Icon, ActionButton,RippleFeedback,Card} from 'react-native-material-ui';
import styles, {typographyStyle, colorStyle, colours} from "../styles/styles"

import {shortenText} from '../utils/utils'
import * as actions from "./productForm.actions";
const validation=require("validator");

const mergeProps = (stateProps, dispatchProp, ownProps) => {

    return {
        ...ownProps,
        form: {
            ...ownProps,
            ...stateProps,
            ...dispatchProp,

        }
    }
}





 class InlineTextInput extends Component{
    constructor(){
        super();
        this.state={
            value:"hello",
            isValid:true
        }
    }
     renderError(){
        if(!this.state.isValid){
            return(
                <View style={[styles.alignItemsCenter]}>
                    <Text numberOfLines={1}  style={{
                        fontSize: 12,
                        color: 'red',
                        paddingLeft: 10,}}>
                        {this.state.errorMessage}
                    </Text>
                </View>
            )
        }

     }

     replaceAll(str,mapObj){
     let re = new RegExp(Object.keys(mapObj).join("|"),"gi");

     return str.replace(/\[|\]/gi,"").replace(re, function(matched){
         return mapObj[matched];
     });
 }

    render(){
        let {onValueChange,forms,formName,field,validator}=this.props;
        return(
            <View >
            <View style={[{height:40},styles.horizontal,styles.alignItemsCenter]}>
                <View styleg={[styles.flex3]}>
                <Text numberOfLines={1}  style={{width: 110,
                    fontSize: 15,
                    color: '#000',
                    paddingLeft: 10,}}>
                    {field}
                </Text>
                </View>
                <View style={[styles.flex1]}>

                    <TextInput
                               ref={component => this.input = component}
                               placeholderTextColor={colours.paperGrey500.color}
                               placeholder="hello world"
                               underlineColorAndroid="red"
                               onSubmitEditing={() => {

                                   let value={};
                                   value[field]=this.state.value;
                                   forms[formName]={...forms[formName],...value};
                                   //console.log(forms);
                                   onValueChange(forms);
                               }}

                               onBlur={()=>{
                                   let value={};
                                   value[field]=this.state.value;
                                   forms[formName]={...forms[formName],...value};
                                   //console.log(forms);
                                   onValueChange(forms);
                               }}
                               onChangeText={value => {

                                   if(validator){
                                       if(validation[validator.validator](value,{min:validator.args[0],max:validator.args[1]})){
                                           this.setState({value:value,isValid:true});
                                       }
                                       else {
                                           this.setState({
                                               isValid:false,
                                               errorMessage:this.replaceAll(validator.errorMessage,
                                                   {
                                                       "TITLE": field,
                                                       "args0": validator.args[0],
                                                       "args1": validator.args[1],
                                                   })

                                           });
                                       }
                                   }
                                   else
                                   this.setState({value});

                               }}
                    />
                </View>
            </View>
                {this.renderError()}
            </View>
        )
    }
}
export const EbTextInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
   return bindActionCreators(actions,dispatch);
})(InlineTextInput);

 class OptionInput extends Component{
    constructor(){
super();
    }
    render(){
        return(
            <View>
                <Text>
                    TEXT INPUT
                </Text>
            </View>
        )
    }
}
export const EbOptionInput=connect((state)=>{
    return{
        form:state.form
    }
},(dispatch)=>{

    return bindActionCreators(dispatch,actions)
})(OptionInput)


 class ProductModal extends Component{
    constructor(){
        super();

    }
    render(){
        return(
            <View>
                <Text>
                    modal INPUT
                </Text>
            </View>
        )
    }
}
export const EbModalInput=connect((state)=>{
    return{
        form:state.form
    }
},(dispatch)=>{

    return bindActionCreators(dispatch,actions)
})(ProductModal)


export class ProductForm extends Component{

    constructor(){
        super()
    }
    childrenWithProps() {
        return React.Children.map(this.props.children, (child) => {
            if (!!child) {
                return React.cloneElement(child, {
                    formName:this.props.formName,
                    title:this.props.title
                });
            }
        });
    }
    render(){
        return(
            <View style={[styles.flex1]}>
                {this.childrenWithProps()}
            </View>)
    }


}