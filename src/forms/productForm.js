/**
 * Created by ebundala on 5/11/2017.
 */
import React,{Component} from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableNativeFeedback,
    Modal,
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

class EBwidgetBase extends Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            isValid:true
        }
    }
    _onValueChange(values){

        let {onValueChange,forms,formName,field,isMeta}=this.props;
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

        onValueChange(forms);
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
    validate(){

        let isValid=true;
        let {validator,label,isRequired}=this.props;
        if(isRequired) {
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
        else{
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
    componentDidMount() {
        let {forms,formName,field,isMeta}=this.props;
        let values;
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
    render(){
        return(<View></View>)
    }
}



class InlineTextInput extends EBwidgetBase{
    constructor(props){
        super(props)
        this.state={
            value:"",
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
                        padding: 5,}}>
                        {this.state.errorMessage}
                    </Text>
                </View>
            )
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
                    padding: 10,}]}>
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
export const EbTextInput=connect((state)=>{
    return{
        forms:{...state.forms}
    }
},(dispatch)=>{
   return bindActionCreators(actions,dispatch);
}, mergeProps,{withRef: true})(InlineTextInput);




 class OptionInput extends EBwidgetBase{
     constructor(props){
         super(props)
    }
   /*  componentDidMount() {
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
                <Text>
                    TEXT INPUT
                </Text>
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

     childrenWithProps() {
         let {formName,title,fields} =this.props;

        return fields.map((item)=>{
             return item
        })
     }


     setModalVisible(visible) {
         this.setState({modalVisible: visible});
     }
     render(){
         const {accentColor,textColor} = uiTheme.palette;
         let {label}=this.props;

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
                             <Divider/>
                             <ScrollView>
                                 {this.childrenWithProps()}
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
                         <View style={[styles.flex1]}/>
                         <Icon  name="arrow-drop-down" style={[{padding:10}]}/>
                     </View>
                 </TouchableNativeFeedback>
                 <Divider/>
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

     let {formName,title}=this.props;

        let field,_fields=[],item;

        fields= this.sortFieldsOrder(fields);


        /*fields.forEach((sect,i)=>{
            for(field in sect)
            {
                item=sect[field];
                switch (item.widget){

                    case "inlineText":
                        _fields.push(
                            <EbTextInput  key={field}

                                         {...{...item.props,formName,title}}
                                         field={field}
                                         label={item.hasOwnProperty("label")?item.label:""}
                                         validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );

                        break;
                    case "hidden":

                        _fields.push(
                            <EbHiddenInput  key={field}
                                           {...{...item.props,formName,title}}
                                           field={field}
                                           label={item.hasOwnProperty("label")?item.label:""}
                                           validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );
                        break;
                    case"modal":
                        _fields.push(

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

                        _fields.push(
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
                        _fields.push(
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
        });*/
        return fields;
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

                                let  picker=<EbFilePickerInput key={field}

                                                               validate={this.state.validate}
                                                               {...{...item.props,formName,title}}
                                                               field={field}
                                                               label={item.hasOwnProperty("label")?item.label:""}
                                                               validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                                />;
                                picker=[picker];

                                return(
                                    <EbModalInput  key={field}
                                                   ref={field}
                                                   validate={this.state.validate}
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