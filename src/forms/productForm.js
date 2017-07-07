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
import {uiTheme} from "../app"
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
};





class InlineTextInput extends Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
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
    getStyles(){
    let {lines,vertical}=this.props;
    console.log(this.props);
        const {accentColor,textColor,placeholderColor} = uiTheme.palette;
    //styles.alignItemsCenter
    return[!lines?{height:40}:{},vertical?styles.flex1:{},vertical?styles.vertical:styles.horizontal]

}
    render(){
        const {accentColor,textColor,placeholderColor} = uiTheme.palette;
        let {onValueChange,forms,formName,field,label,validator,placeholder,lines,vertical}=this.props;

        return(
            <View >
            <View style={this.getStyles()}>
                <View >
                <Text numberOfLines={1}  style={{width: 110,
                    fontSize: 15,
                    color: textColor,
                    paddingLeft: 10,}}>
                    {label}
                </Text>
                </View>
                <View style={[styles.flex1]}>

                    <TextInput
                        numberOfLines={lines||1}
                               ref={component => this.input = component}
                               placeholderTextColor={placeholderColor}
                               placeholder={placeholder}
                               underlineColorAndroid={accentColor}
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
                                                       "TITLE": label,
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
     constructor(props){
         super(props)
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
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
})(OptionInput);


 class InputModal extends Component{
     constructor(props){
         super(props)
         this.state = {
             modalVisible: false,
         }
    }
     childrenWithProps() {
         return React.Children.map(this.props.children, (child) => {
             if (!!child) {
                 return React.cloneElement(child, {
                     ...this.props,children:null
                 });
             }
         });
     }


     setModalVisible(visible) {
         this.setState({modalVisible: visible});
     }
     render(){
         const {accentColor,textColor} = uiTheme.palette;
         let {onValueChange,forms,formName,field,label,validator}=this.props;

         return(
             <View style={{height:40}}>

                 <Modal
                     animationType={"slide"}
                     transparent={false}
                     visible={this.state.modalVisible}
                     onRequestClose={() => { this.setModalVisible(false)}}
                 >

                         <View style={[styles.flex1]}>
                             <View style={[styles.horizontal]}>

                             <TouchableNativeFeedback onPress={() => {
                                 this.setModalVisible(false)
                             }}>
                                 <View >
                                 <Icon  name="close" style={[{padding:16}]}/>
                                 </View>
                             </TouchableNativeFeedback>
                                 <Text style={[{
                                     fontSize: 18,
                                     color: textColor,
                                     padding: 16},styles.flex1]}>
                                     {label}
                                 </Text>
                                 <TouchableNativeFeedback onPress={() => {
                                     this.setModalVisible(false)
                                 }}>
                                     <View >
                                         <Icon  name="done" style={[{padding:16}]}/>
                                     </View>
                                 </TouchableNativeFeedback>
                             </View>
                         </View>

                 </Modal>

                 <TouchableNativeFeedback onPress={() => {
                     this.setModalVisible(true)
                 }}>
                     <View style={[styles.flex1,styles.horizontal]}>
                     <Text style={{width: 110,
                         fontSize: 15,
                         color: textColor,
                         paddingLeft: 10}}>{label}
                         </Text>
                         <View style={[styles.flex1]}></View>
                         <Icon  name="arrow-drop-down" style={[{paddingRight:10}]}/>
                     </View>
                 </TouchableNativeFeedback>

             </View>
             )
     }

}
export const EbModalInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
})(InputModal);



class HiddenInput extends Component{
    constructor(){
        super();

    }
    render(){
        return(
            <View>

            </View>
        )
    }
}
export const EbHiddenInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
})(HiddenInput);



class FilePickerInput extends Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
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
    getStyles(){
        let {lines,vertical}=this.props;
        console.log(this.props);
        //styles.alignItemsCenter
        return[!lines?{height:40}:{},vertical?styles.flex1:{},vertical?styles.vertical:styles.horizontal]

    }
    render(){
        const {accentColor} = uiTheme.palette;
        let {onValueChange,forms,formName,field,label,validator,placeholder,lines,vertical}=this.props;

        return(
            <View >
                <View style={this.getStyles()}>
                    <View >
                        <Text numberOfLines={1}  style={{width: 110,
                            fontSize: 15,
                            color: '#000',
                            paddingLeft: 10,}}>
                            {label}
                        </Text>
                    </View>
                    <View style={[styles.flex1]}>

                        <TextInput
                            numberOfLines={lines||1}
                            ref={component => this.input = component}
                            placeholderTextColor={colours.paperGrey500.color}
                            placeholder={placeholder}
                            underlineColorAndroid={accentColor}
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
                                                    "TITLE": label,
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
export const EbFilePickerInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
})(FilePickerInput);







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