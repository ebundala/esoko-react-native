/**
 * Created by ebundala on 5/11/2017.
 */
import React,{Component,PropTypes} from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableNativeFeedback,
    Modal,
    Picker,
    ScrollView,
    ListView,
    Dimensions
} from "react-native";
import {StackNavigator} from "react-navigation";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {Toolbar, Divider, Icon, ActionButton,RippleFeedback,Button} from 'react-native-material-ui';
import {Card} from 'react-native-material-design';

import styles, {typographyStyle, colorStyle, colours} from "../styles/styles"
import {uiTheme} from "../app"
import {shortenText} from '../utils/utils'
import * as actions from "./productForm.actions";
const validation=require("validator");
let ImagePicker = require('react-native-image-picker');
const Screen = {
    height: Dimensions.get('window').height - 75
};


const mergeProps = (stateProps, dispatchProp, ownProps) => {

    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProp,
    }
};
const widgetPropTypes={
    onValueChange:PropTypes.func.isRequired,
    onFormInit:PropTypes.func.isRequired,
    formName:PropTypes.string.isRequired,
    title:PropTypes.string,
    field:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    validator:PropTypes.shape({
        errorMessage: PropTypes.string,
        validator:PropTypes.oneOfType([PropTypes.string,PropTypes.func]).isRequired,
        args: PropTypes.array}),
    validate:PropTypes.bool,
    isMeta:PropTypes.bool,
    isRequired:PropTypes.bool,
    value:PropTypes.any,
    forms:PropTypes.object
}

class EBwidgetBase extends Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            isValid:true
        }
    }
    _onFormInit(values){

        let {onFormInit,forms,formName,field,isMeta}=this.props;
        let value={};
        value[field]=values;

        if(!isMeta){

            forms[formName] = {...forms[formName], ...value};
        }
        else{
            if(forms[formName]&&forms[formName].hasOwnProperty("metadata")) {

                value={...forms[formName].metadata,...value};
                forms[formName] = {...forms[formName], ...{metadata:value}};

            }
            else{

                forms[formName] = {...forms[formName],...{metadata:value}};
            }
        }

        //console.log(forms);
        //debugger;
        onFormInit(forms);
    //   debugger;
        this.setState({
            value:value[field]
        });

    }
    _onValueChange(values){

        let {onValueChange,onFormInit,forms,formName,field,isMeta}=this.props;
        let value={};
        value[field]=values;

        if(!isMeta){

            forms[formName] = {...forms[formName], ...value};
        }
        else{
            if(forms[formName]&&forms[formName].hasOwnProperty("metadata")) {

                value={...forms[formName].metadata,...value};
                forms[formName] = {...forms[formName], ...{metadata:value}};

            }
            else{

                forms[formName] = {...forms[formName],...{metadata:value}};
            }
        }

        //console.log(forms);
        onValueChange(forms);
       // debugger;
        this.setState({
            value:value[field]
        });

    }
    isValid(){
        return this.state.isValid
}
    setInvalid(){
        this.setState({
            isValid:false,
            errorMessage:this.getErrorMsg()

        });
    }
    validate() {

        let isValid = true;
        let {validator, label, isRequired}=this.props;
        if(validator)
        {
            if (isRequired) {
            if (this.state.value) {
                if (typeof validator.validator === "string") {
                    isValid = validation[validator.validator](this.state.value.toString(), {
                        min: validator.args[0],
                        max: validator.args[1]
                    })

                } else if (typeof validator.validator === "function") {
                    isValid = validator.validator(this.state.value.toString(), {
                        min: validator.args[0],
                        max: validator.args[1]
                    })
                }
            }
            else {
                isValid = false;
            }
        }
        else {
            if (this.state.value) {
                if (typeof validator.validator === "string") {
                    isValid = validation[validator.validator](this.state.value.toString(), {
                        min: validator.args[0],
                        max: validator.args[1]
                    })

                } else if (typeof validator.validator === "function") {
                    isValid = validator.validator(this.state.value.toString(), {
                        min: validator.args[0],
                        max: validator.args[1]
                    })
                }
            }
            else {
                isValid = true;
            }
        }
    }
        if(!isValid){
      this.setInvalid();
        }
        console.log("validating ",label,isValid)
            return isValid;
    }
    replaceAll(str,mapObj){
        let re = new RegExp(Object.keys(mapObj).join("|"),"gi");

        return str.replace(/\[|\]/gi,"").replace(re, function(matched){
            return mapObj[matched];
        });
    }
    getErrorMsg(){
        let {validator,label}=this.props;
        if(validator)
      return  this.replaceAll(validator.errorMessage,
            {
                "TITLE": label,
                "args0": validator.args[0],
                "args1": validator.args[1],
            })
        else
            return "";
    }
    renderError(){
        const {errorColor} = uiTheme.palette;
        if(!this.state.isValid){
            return(
                <View style={[styles.alignItemsCenter]}>
                    <Text numberOfLines={1}  style={{
                        fontSize: 12,
                        color: errorColor,
                        padding: 5,}}>
                        {this.state.errorMessage}
                    </Text>
                </View>
            )
        }

    }
    componentDidMount() {
        let {forms,formName,field,isMeta,value}=this.props;
        let values;

        let isInitialNotMeta=(!isMeta)&& (typeof forms[formName]==="undefined"
            ||(typeof forms[formName]!=="undefined"?typeof forms[formName][field] === 'undefined':false));

        let isInitialMeta=isMeta&&(typeof forms[formName]==="undefined"
            ||typeof forms[formName]['metadata']==="undefined"
            ||(typeof forms[formName]!=="undefined"?typeof forms[formName]["metadata"]!== 'undefined'?typeof forms[formName]["metadata"][field] === 'undefined':false:false));
        if(value &&( isInitialMeta||isInitialNotMeta))
        {
                this._onFormInit(value);

        }
        else{
            // get value from store
            if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined'&&!isMeta) {
                values=forms[formName][field];
                console.log("not meta",values);
                this._onValueChange(values);

            }
            else if(typeof forms[formName]!== 'undefined'&&
                typeof forms[formName]["metadata"] !== 'undefined'&&
                typeof forms[formName]["metadata"][field] !== 'undefined'&&isMeta)
            {
                values=forms[formName]["metadata"][field];
                console.log("meta",values);
                this._onValueChange(values);
            }
        }



    }
    render(){
        return(<View></View>)
    }
}
EBwidgetBase.propTypes=widgetPropTypes;


class InlineTextInput extends EBwidgetBase{
    constructor(props){
        super(props)
        this.state={
            value:"",
            isValid:true
        }
    }




    getStyles(){
    let {lines,vertical}=this.props;

        const {accentColor,textColor,placeholderColor} = uiTheme.palette;
    //styles.alignItemsCenter
    return[!lines?{height:40}:{},vertical?styles.flex1:{},vertical?styles.vertical:styles.horizontal]

}

    render(){
        const {accentColor,textColor,placeholderColor,inputUnderlineColor} = uiTheme.palette;
        let {onValueChange,forms,formName,field,label,validator,placeholder,lines,vertical}=this.props;

        return(
            <View >
            <View style={this.getStyles()}>
                <View >
                <Text numberOfLines={1}  style={[{width: 110,
                    fontSize: 15,
                    color: textColor,
                    padding: 10,
                }]}>
                    {label}
                </Text>
                </View>
                <View style={[styles.flex1]}>
                    <TextInput
                        numberOfLines={lines||1}
                        multiline={!!lines}
                              value={this.state.value}
                               ref="input"
                               placeholderTextColor={placeholderColor}
                               placeholder={placeholder}
                               underlineColorAndroid={inputUnderlineColor}
                               onSubmitEditing={() => {


                                   this._onValueChange(this.state.value);
                               }}

                               onBlur={()=>{
                                   this._onValueChange(this.state.value);
                               }}
                               onChangeText={value => {
                                   this.setState({value});

                                       /*validation[validator.validator](value,{min:validator.args[0],max:validator.args[1]})*/
                                       if(this.validate()){
                                           this.setState({isValid:true});
                                       }
                                       else {
                                           this.setInvalid();
                                       }

                                  // else
                                   //this.setState({value});

                               }}
                    />
                </View>
            </View>
                {this.renderError()}
                <Divider/>
            </View>

        )
    }
}

InlineTextInput.propTypes={...widgetPropTypes,...{
    lines:PropTypes.number,
    placeholder:PropTypes.string,
    vertical:PropTypes.bool

}};

export const EbTextInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
   return bindActionCreators(actions,dispatch);
}, mergeProps,{withRef: true})(InlineTextInput);




 class PickerInput extends EBwidgetBase {

   /*  componentDidMount() {
         let {forms,formName,field}=this.props;

         // get value from store
         if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
             let values=forms[formName][field];
             this._onValueChange(values);
         }


     }*/
    render(){
        let {items,pickerProps,label}=this.props;
        const {textColor,accentColor} = uiTheme.palette;
        const {COLOR}=uiTheme;
        return(
            <View style={[{height:40}]}>
                <View style={[styles.horizontal]}>
                    <View >
                        <Text numberOfLines={1}  style={[{width: 110,
                            fontSize: 15,
                            color: textColor,
                            padding: 10,}]}>
                            {label}
                        </Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <View style={{paddingRight:10}}>
                        <Picker {...{mode:"dropdown",style:{color:COLOR.amber500},...pickerProps,}}
                                selectedValue={this.state.value}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({value: itemValue});
                                    this._onValueChange(itemValue)

                                }}>

                            {items instanceof Array?items.map((item, i) => {
                                    return <Picker.Item key={item.label} label={item.label} value={item.value}/>

                                }):null}

                        </Picker>
                        </View>
                    </View>
                </View>
                {this.renderError()}
                <Divider/>
            </View>
        )
    }
}
PickerInput.propTypes={...widgetPropTypes,...{
    pickerProps:PropTypes.object,
    value:PropTypes.any,
    items:PropTypes.arrayOf(
        PropTypes.shape(
        {  label:PropTypes.string.isRequired,
            value:PropTypes.any.isRequired}
            ).isRequired)
}}

export const EbPickerInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
},mergeProps, {withRef: true})(PickerInput);



class OptionInput extends EBwidgetBase {

    /*  componentDidMount() {
     let {forms,formName,field}=this.props;

     // get value from store
     if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
     let values=forms[formName][field];
     this._onValueChange(values);
     }


     }*/
    render(){
        let {items,pickerProps,label}=this.props;
        const {textColor,accentColor} = uiTheme.palette;
        const {COLOR}=uiTheme;
        return(
            <View style={[{height:40}]}>
                <View style={[styles.horizontal]}>
                    <View >
                        <Text numberOfLines={1}  style={[{width: 110,
                            fontSize: 15,
                            color: textColor,
                            padding: 10,}]}>
                            {label}
                        </Text>
                    </View>
                    <View style={[styles.flex1]}>
                        <View style={{paddingRight:10}}>
                            <Picker {...{mode:"dropdown",style:{color:COLOR.amber500},...pickerProps,}}
                                    selectedValue={this.state.value}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({value: itemValue});
                                        this._onValueChange(itemValue)

                                    }}>

                                {items instanceof Array?items.map((item, i) => {
                                        return <Picker.Item key={item.label} label={item.label} value={item.value}/>

                                    }):null}

                            </Picker>
                        </View>
                    </View>
                </View>
                {this.renderError()}
                <Divider/>
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
},mergeProps, {withRef: true})(OptionInput);



class InputModal extends EBwidgetBase{
     constructor(props){
         super(props);
         this.state = {
             modalVisible: false,
         }
    }
      componentWillMount(){
    let {fields}=this.props;
         this.fields=fields||[];

}
     setModalVisible(visible) {
         this.setState({modalVisible: visible});
     }
     getErrorMsg(validator,label,isRequired){


         if(validator&&validator.hasOwnProperty('errorMessage')) {
             return this.replaceAll(validator.errorMessage,
                 {
                     "TITLE": label,
                     "args0": validator.args[0],
                     "args1": validator.args[1],
                 })
         } else if(isRequired)
             return "required '"+label+"' is Invalid";
     }
//set invalid of childrens
     _setInvalid(validator,label,isRequired){
             this.setState({
                 isValid:false,
                 errorMessage:this.getErrorMsg(validator,label,isRequired)

             });
         }
    _onFormInit(key,values,isMeta,){

        let {onFormInit,forms,formName}=this.props;
        let value={};
        value[key]=values;

        if(!isMeta){

            forms[formName] = {...forms[formName], ...value};
        }
        else{
            if(forms[formName]&&forms[formName].hasOwnProperty("metadata")) {

                value={...forms[formName].metadata,...value};
                forms[formName] = {...forms[formName], ...{metadata:value}};

            }
            else{

                forms[formName] = {...forms[formName],...{metadata:value}};
            }
        }

        onFormInit(forms);
    }
     validate(){
         let field;
         let fields=this.fields;
         let status=true;

         if(fields instanceof  Array){

             for (let i=0;i<fields.length;i++) {



                 for (field in fields[i]) {


                     //console.log("modal " ,fields[i]);


                     if (!this._validate(fields[i],field))
                     {

                             status = false;

                             break;

                     }


                 }


             }
         }
        // if(!status){
            // this.setInvalid();
        // }
         return status;
     }
     _validate(item,field) {
         let isValid = true;
         let {validator, label}=item[field];
         let {isRequired, isMeta}=item[field].props;
         let {formName, forms}=this.props;
         if (validator)
         {
             if (isRequired) {

                 if (isMeta) {

                     if (forms[formName] && forms[formName]["metadata"][field]) {
                         if (typeof validator.validator === "string") {
                             isValid = validation[validator.validator](forms[formName]["metadata"][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })

                         } else if (typeof validator.validator === "function") {
                             isValid = validator.validator(forms[formName]["metadata"][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })
                         }
                     }
                     else {
                         isValid = false;
                     }
                 } else {
                     if (forms[formName] && forms[formName][field]) {
                         if (typeof validator.validator === "string") {
                             isValid = validation[validator.validator](forms[formName][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })

                         } else if (typeof validator.validator === "function") {
                             isValid = validator.validator(forms[formName][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })
                         }
                     }
                     else {
                         isValid = false;
                     }
                 }

             }
             else {
                 if (isMeta) {
                     if (forms[formName] && forms[formName]['metadata'][field]) {
                         if (typeof validator.validator === "string") {
                             isValid = validation[validator.validator](forms[formName]['metadata'][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })

                         } else if (typeof validator.validator === "function") {
                             isValid = validator.validator(forms[formName]['metadata'][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })
                         }
                     }
                     else {
                         isValid = true;
                     }
                 }
                 else {
                     if (forms[formName] && forms[formName][field]) {
                         if (typeof validator.validator === "string") {
                             isValid = validation[validator.validator](forms[formName][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })

                         } else if (typeof validator.validator === "function") {
                             isValid = validator.validator(forms[formName][field].toString(), {
                                 min: validator.args[0],
                                 max: validator.args[1]
                             })
                         }
                     }
                     else {
                         isValid = true;
                     }
                 }
             }

         if(!isValid){
             this._setInvalid(validator,label,isRequired);
         }
     }
         console.log("validating ",label,isValid);
         return isValid;
     }
    componentDidMount() {
        let {forms,formName,field}=this.props;




        let fields=this.fields;
        let key;

        if(fields instanceof  Array){

            for (let i=0;i<fields.length;i++) {



                for (key in fields[i]) {


                    let {isMeta,value}=fields[i][key].props;


                    let isInitialNotMeta=(!isMeta)&& (typeof forms[formName]==="undefined"
                        ||(typeof forms[formName]!=="undefined"?typeof forms[formName][key] === 'undefined':false));

                    let isInitialMeta=isMeta&&(typeof forms[formName]==="undefined"
                        ||typeof forms[formName]['metadata']==="undefined"
                        ||(typeof forms[formName]!=="undefined"?typeof forms[formName]["metadata"]!== 'undefined'?typeof forms[formName]["metadata"][key] === 'undefined':false:false));

                    if(value&&( isInitialMeta||isInitialNotMeta))
                    {
                        this._onFormInit(key,value,isMeta);

                    }



                }


            }
        }







       /* else{
            // get value from store
            if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined'&&!isMeta) {
                values=forms[formName][field];
                console.log("not meta",values);
                this._onValueChange(values);

            }
            else if(typeof forms[formName]!== 'undefined'&&
                typeof forms[formName]["metadata"] !== 'undefined'&&
                typeof forms[formName]["metadata"][field] !== 'undefined'&&isMeta)
            {
                values=forms[formName]["metadata"][field];
                console.log("meta",values);
                this._onValueChange(values);
            }
        }*/



    }
     render(){
         const {accentColor,textColor} = uiTheme.palette;

         let field,item;
         let {formName,title,label,isFilePicker}=this.props;
         return(
             <View style={{height:40}}>

                 <Modal ref="modal"
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
                             <Divider/>

                             <ScrollView >

                                 {isFilePicker?
                                     <EbFilePickerInput key={this.props.field}

                                                                    validate={this.state.validate}
                                                                    {...{...this.props,formName,title}}
                                                                    field={this.props.field}
                                                                    label={label}
                                                                    validator={this.props.hasOwnProperty("validator")?this.props.validator:()=>{}}
                                     />
                                     :
                                     this.fields.map((sect,i)=>{
                                     for(field in sect)
                                     {
                                         item=sect[field];
                                         switch (item.widget){

                                             case "inlineText":
                                                 return(
                                                     <EbTextInput  key={field}
                                                                   ref={field}
                                                                   {...{...item.props,formName,title}}
                                                                   field={field}
                                                                   label={item.hasOwnProperty("label")?item.label:""}
                                                                   validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                                                   validate={this.state.validate}

                                                     />
                                                 );

                                                 break;
                                             case "hidden":

                                                 return(
                                                     <EbHiddenInput  key={field}
                                                                     ref={field}
                                                                     validate={this.state.validate}
                                                                     {...{...item.props,formName,title}}
                                                                     field={field}
                                                                     label={item.hasOwnProperty("label")?item.label:""}
                                                                     validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                                     />
                                                 );
                                                 break;
                                             case"modal":
                                                 return(

                                                     <EbModalInput
                                                         key={field}
                                                         ref={field}
                                                         validate={this.state.validate}
                                                         {...{...item.props,formName,title}}
                                                         field={field}
                                                         fields={item.props.fields instanceof Array?this.getFields(item.props.fields):[]}
                                                         label={item.hasOwnProperty("label")?item.label:""}
                                                         validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                                     />

                                                 );
                                                 break;
                                             case"filePicker":



                                                 return(
                                                     <EbModalInput  key={field}
                                                                    ref={field}
                                                                    validate={this.state.validate}
                                                                    {...{...item.props,formName,title}}
                                                                    field={field}
                                                                    isFilePicker={true}
                                                                    label={item.hasOwnProperty("label")?item.label:""}
                                                                    validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                                     />
                                                 );
                                                 break;
                                             case "option":
                                                 return(
                                                     <EbOptionInput
                                                         validate={this.state.validate}
                                                         key={field}
                                                         ref={field}
                                                         {...{...item.props,formName,title}}
                                                         field={field}
                                                         fields={item.props.fields instanceof Array?this.getFields(item.props.fields):[]}
                                                         label={item.hasOwnProperty("label")?item.label:""}
                                                         validator={item.hasOwnProperty("validator")?item.validator:()=>{}}                            />
                                                 );
                                                 break;
                                             default:

                                                 return null;

                                         }


                                     }
                                 })}
                             </ScrollView>
                         </View>

                 </Modal>

                 <TouchableNativeFeedback onPress={() => {
                     this.setModalVisible(true)
                 }}>
                     <View style={[styles.flex1,styles.horizontal]}>
                     <Text style={{width: 110,
                         fontSize: 15,
                         color: textColor,
                         padding: 10}}>{label}
                         </Text>
                         {this.renderError()}
                         <View style={[styles.flex1]}/>
                         <Icon  name="arrow-drop-down" style={[{padding:10}]}/>
                     </View>
                 </TouchableNativeFeedback>
                 <Divider/>
             </View>
             )
     }

}
InputModal.propTypes={...widgetPropTypes,...{

    isFilePicker:PropTypes.bool,
    fields:PropTypes.arrayOf(
        PropTypes.object.isRequired
        )
}}

export const EbModalInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
}, mergeProps,{withRef: true})(InputModal);



class HiddenInput extends EBwidgetBase{

   /* componentDidMount() {
        let {forms,formName,field}=this.props;

        // get value from store
        if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
            let values=forms[formName][field];
            this._onValueChange(values);
        }


    }*/

    render(){

        return(
            <View>

            </View>
        )
    }
}
HiddenInput.propTypes={...widgetPropTypes,...{
label:PropTypes.string,
}}

export const EbHiddenInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
},mergeProps, {withRef: true})(HiddenInput);



class FilePickerInput extends EBwidgetBase{
    constructor(props){
        super(props);
        this.state={
            value:[],
            isValid:true
        }
    }
    renderError(){
        const {errorColor} = uiTheme.palette;
        if(!this.state.isValid){
            return(
                <View style={[styles.alignItemsCenter]}>
                    <Text numberOfLines={1}  style={{
                        fontSize: 12,
                        color: errorColor,
                        paddingLeft: 10,}}>
                        {this.state.errorMessage}
                    </Text>
                </View>
            )
        }

    }
   /* replaceAll(str,mapObj){
        let re = new RegExp(Object.keys(mapObj).join("|"),"gi");

        return str.replace(/\[|\]/gi,"").replace(re, function(matched){
            return mapObj[matched];
        });
    }*/
    getStyles(){
        let {lines,vertical}=this.props;
        return[!lines?{height:40}:{},vertical?styles.flex1:{},vertical?styles.vertical:styles.horizontal]

    }
    openPicker(){
        let {onValueChange,forms,formName,field}=this.props;

        let options = {
            title: 'Add photos',
            mediaType: "photo",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert(response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                // response = {...response,data: 'data:image/jpeg;base64,'+response.data };



                let files = this.state.value;
                files.push(response);

                this._onValueChange(files);

            }
        });
    }
    componentWillMount(){

        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    }
    /*componentDidMount() {
        let {forms,formName,field}=this.props;

        // get value from store
        if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
            let values=forms[formName][field];
            this._onValueChange(values);
        }


    }*/
    /*onValueChange(files){
        let {onValueChange,forms,formName,field}=this.props;
        let value={};
        value[field]=files;
        forms[formName]={...forms[formName],...value};

        onValueChange(forms);
        this.setState({
            value:value[field]
        });
    }
    componentDidMount() {
         let {forms,formName,field}=this.props;

        // get value from store
        if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
            let files=forms[formName][field];
            this.onValueChange(files);
        }


    }*/
    render() {
        const {accentColor} = uiTheme.palette;
       // let {onValueChange,forms,formName,field,label,validator,placeholder,lines,vertical}=this.props;

        return (


                <View style={[{height:Screen.height}]}>
                    <ListView dataSource={this.ds.cloneWithRows(this.state.value)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}

                              enableEmptySections={true}
                              renderRow={(photo,sectID,rowID) =>
                                  <View key={photo.uri} style={[{
                                      height: 220,
                                      width: 180
                                  },]}>
                                      <Card style={[styles.flex1]}>

                                          <View style={[styles.flex1]}>
                                              <Image style={[{
                                                  marginTop: 16, marginBottom: 8,
                                                  width: 132, height: 132,
                                                  resizeMode: Image.resizeMode.stretch,
                                                  backgroundColor: colours.paperGrey300.color
                                              }]}
                                                     source={{uri: photo.uri}}>



                                              </Image>
                                              <View style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text numberOfLines={1} style={[styles.productTitle]}>
                                                          {shortenText(photo.fileName)}
                                                      </Text>
                                                  </View>
                                                  <View
                                                      style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                      <Text style={[styles.currency]}>

                                                      </Text>
                                                      <Text style={[styles.price]}>
                                                          {photo.width + "x" + photo.height}
                                                      </Text>
                                                      <TouchableNativeFeedback onPress={(e)=>{
                                                          let newlist=this.state.value;
                                                          newlist.splice(rowID,1);
                                                          this.setState({value:newlist});
                                                          this._onValueChange(this.state.value);

                                                      }}>
                                                          <View style="">
                                                          <Icon name="delete"  />
                                                          </View>
                                                      </TouchableNativeFeedback>
                                                  </View>
                                              </View>
                                          </View>

                                      </Card>
                                  </View>
                              }
                    />

                    <ActionButton

                                  icon="add"
                                  onPress={(text) => {

                                      this.openPicker();


                                  }}
                    />
                </View>

        );
    }

}
export const EbFilePickerInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
},mergeProps, {withRef: true})(FilePickerInput);

class submitInput extends EBwidgetBase{
    constructor(props){
        super(props);
        this.state={
            value:[],
            isValid:true
        }
    }
    renderError(){
        const {errorColor} = uiTheme.palette;
        if(!this.state.isValid){
            return(
                <View style={[styles.alignItemsCenter]}>
                    <Text numberOfLines={1}  style={{
                        fontSize: 12,
                        color: errorColor,
                        paddingLeft: 10,}}>
                        {this.state.errorMessage}
                    </Text>
                </View>
            )
        }

    }
    /*replaceAll(str,mapObj){
        let re = new RegExp(Object.keys(mapObj).join("|"),"gi");

        return str.replace(/\[|\]/gi,"").replace(re, function(matched){
            return mapObj[matched];
        });
    }*/
    getStyles(){
        let {lines,vertical}=this.props;
        return[!lines?{height:40}:{},vertical?styles.flex1:{},vertical?styles.vertical:styles.horizontal]

    }
    openPicker(){
        let {onValueChange,forms,formName,field}=this.props;

        let options = {
            title: 'Add photos',
            mediaType: "photo",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert(response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                // response = {...response,data: 'data:image/jpeg;base64,'+response.data };



                let files = this.state.value;
                files.push(response);

                this.onValueChange(files);

            }
        });
    }
    componentWillMount(){

        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    }
    /*componentDidMount() {
        let {forms,formName,field}=this.props;

        // get value from store
        if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
            let values=forms[formName][field];
            this._onValueChange(values);
        }


    }*/
    /*onValueChange(files){
     let {onValueChange,forms,formName,field}=this.props;
     let value={};
     value[field]=files;
     forms[formName]={...forms[formName],...value};

     onValueChange(forms);
     this.setState({
     value:value[field]
     });
     }
     componentDidMount() {
     let {forms,formName,field}=this.props;

     // get value from store
     if (typeof forms[formName]!== 'undefined'&&typeof forms[formName][field] !== 'undefined') {
     let files=forms[formName][field];
     this.onValueChange(files);
     }


     }*/
    render() {
        const {textColor,errorColor} = uiTheme.palette;
        // let {onValueChange,forms,formName,field,label,validator,placeholder,lines,vertical}=this.props;

        return (


            <View style={[{height:Screen.height}]}>
                <ListView dataSource={this.ds.cloneWithRows(this.state.value)}
                          contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}

                          enableEmptySections={true}
                          renderRow={(photo) =>
                              <View style={[{
                                  height: 220,
                                  width: 180
                              },]}>
                                  <Card style={[styles.flex1]}>

                                      <View style={[styles.flex1]}>
                                          <Image style={[{
                                              marginTop: 16, marginBottom: 8,
                                              width: 132, height: 132,
                                              resizeMode: Image.resizeMode.stretch,
                                              backgroundColor: colours.paperGrey300.color
                                          }]}
                                                 source={{uri: photo.uri}}>

                                          </Image>
                                          <View style={[styles.spaceAround, styles.alignItemsCenter, {height: 40}]}>
                                              <View
                                                  style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                  <Text numberOfLines={1} style={[styles.productTitle]}>
                                                      {shortenText(photo.fileName)}
                                                  </Text>
                                              </View>
                                              <View
                                                  style={[styles.horizontal, styles.alignItemsCenter, styles.centerJustified]}>
                                                  <Text style={[styles.currency]}>

                                                  </Text>
                                                  <Text style={[styles.price]}>
                                                      {photo.width + "x" + photo.height}
                                                  </Text>
                                              </View>
                                          </View>
                                      </View>

                                  </Card>
                              </View>
                          }
                />

                <ActionButton

                    icon="add"
                    onPress={(text) => {

                        this.openPicker();


                    }}
                />
            </View>

        );
    }

}
export const EbSubmitInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
    return bindActionCreators(actions,dispatch);
}, mergeProps,{withRef: true})(submitInput)





export class ProductForm extends Component{

    constructor(props){
        super(props);
        this.fields=[];
        this.state={validate:false,isValid:false}
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
    getFields(fields){
        return this.sortFieldsOrder(fields);
    }
    sortFieldsOrder(arr){
        return  arr.sort((a,b)=>{
            let keyA=Object.keys(a)[0];
            let keyB=Object.keys(b)[0];
            if(a[keyA]["order"]<b[keyB]["order"])return 1;
            if(a[keyA]["order"]>b[keyB]["order"])return -1;
            return 0;
        });
    }
    componentWillMount(){

        let {fields}=this.props;
        this.fields=this.getFields(fields)

    }
    renderFields(){

        this.fields.map((sect,i)=>{
            for(field in sect)
            {
                item=sect[field];
                switch (item.widget){

                    case "inlineText":
                        return(
                            <EbTextInput  key={field}

                                          {...{...item.props,formName,title}}
                                          field={field}
                                          label={item.hasOwnProperty("label")?item.label:""}
                                          validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );

                        break;
                    case "hidden":

                        return(
                            <EbHiddenInput  key={field}
                                            {...{...item.props,formName,title}}
                                            field={field}
                                            label={item.hasOwnProperty("label")?item.label:""}
                                            validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );
                        break;
                    case"modal":
                        return(

                            <EbModalInput
                                key={field}
                                {...{...item.props,formName,title}}
                                field={field}
                                fields={item.props.fields instanceof Array?this.getFields(item.props.fields):[]}
                                label={item.hasOwnProperty("label")?item.label:""}
                                validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />

                        );
                        break;
                    case"filePicker":

                        let  picker=<EbFilePickerInput key={field}
                                                       {...{...item.props,formName,title}}
                                                       field={field}
                                                       label={item.hasOwnProperty("label")?item.label:""}
                                                       validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                        />;
                        picker=[picker];

                        return(
                            <EbModalInput  key={field}
                                           {...{...item.props,formName,title}}
                                           field={field}
                                           fields={picker}
                                           label={item.hasOwnProperty("label")?item.label:""}
                                           validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );
                        break;
                    case "option":
                        return(
                            <EbOptionInput

                                key={field}
                                {...{...item.props,formName,title}}
                                field={field}
                                fields={item.props.fields instanceof Array?this.getFields(item.props.fields):[]}
                                label={item.hasOwnProperty("label")?item.label:""}
                                validator={item.hasOwnProperty("validator")?item.validator:()=>{}}                            />
                        );
                        break;
                    default:


                }


            }
        });
    }
    validateForm(){
        let field;
        let fields=this.fields;
        let status=true;

        if(fields instanceof  Array){

       for (let i=0;i<fields.length;i++) {



           for (field in fields[i]) {



               if (this.refs[field].getWrappedInstance()["validate"]) {
                   if (!this.refs[field].getWrappedInstance().validate()) {
                       status = false;
                       console.log("valid form cheki"+field);
                       break;
                   }
               }
               else {
                   console.log("no validator");
               }

           }


       }
    }
       return status;
    }
    render(){
        let field,item;
        let {formName,title}=this.props;
        return(

            <View ref="wrapper" style={[styles.flex1]}>


                {this.fields.map((sect,i)=>{
                    for(field in sect)
                    {
                        item=sect[field];
                        switch (item.widget){

                            case "inlineText":
                                return(
                                    <EbTextInput  key={field}
                                                  ref={field}
                                                  {...{...item.props,formName,title}}
                                                  field={field}
                                                  label={item.hasOwnProperty("label")?item.label:""}
                                                  validator={item.hasOwnProperty("validator")?item.validator:null}
                                                  validate={this.state.validate}

                                    />
                                );

                                break;
                            case "hidden":

                                return(
                                    <EbHiddenInput  key={field}
                                                    ref={field}
                                                    validate={this.state.validate}
                                                    {...{...item.props,formName,title}}
                                                    field={field}
                                                    label={item.hasOwnProperty("label")?item.label:""}
                                                    validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                    />
                                );
                                break;
                            case"modal":
                                return(

                                    <EbModalInput
                                        key={field}
                                        ref={field}
                                        validate={this.state.validate}
                                        {...{...item.props,formName,title}}
                                        field={field}
                                        fields={item.props.fields instanceof Array?this.getFields(item.props.fields):[]}
                                        label={item.hasOwnProperty("label")?item.label:""}
                                        validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                    />

                                );
                                break;
                            case"filePicker":



                                return(
                                    <EbModalInput  key={field}
                                                   ref={field}
                                                   validate={this.state.validate}
                                                   {...{...item.props,formName,title}}
                                                   field={field}
                                                   isFilePicker={true}
                                                   label={item.hasOwnProperty("label")?item.label:""}
                                                   validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                    />
                                );
                                break;
                            case "picker":
                                return(
                                    <EbPickerInput
                                        validate={this.state.validate}
                                        key={field}
                                        ref={field}
                                        {...{...item.props,formName,title}}
                                        field={field}
                                        label={item.hasOwnProperty("label")?item.label:""}
                                        validator={item.hasOwnProperty("validator")?item.validator:()=>{}}                            />
                                );
                                break;
                            case "option":
                                return(
                                    <EbOptionInput
                                        validate={this.state.validate}
                                        key={field}
                                        ref={field}
                                        {...{...item.props,formName,title}}
                                        field={field}
                                        label={item.hasOwnProperty("label")?item.label:""}
                                        validator={item.hasOwnProperty("validator")?item.validator:()=>{}}                            />
                                );
                                break;
                            default:

                                return null;

                        }


                    }
                })}
                <Button text="Submit" onPress={(e)=>{
                    if(this.validateForm()){
                        alert("valid form")
                    }
                    else
                        alert("invalid form")
                }}> </Button>
            </View>)
    }


}
ProductForm.propTypes={
    formName:PropTypes.string.isRequired,
    title:PropTypes.string,
    fields:PropTypes.arrayOf(PropTypes.object).isRequired
}