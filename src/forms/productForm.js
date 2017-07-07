/**
 * Created by ebundala on 5/11/2017.
 */
import React,{Component} from "react";
import {
    Text,
    View,
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
import {Toolbar, Divider, Icon, ActionButton,RippleFeedback,Card} from 'react-native-material-ui';
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

     replaceAll(str,mapObj){
     let re = new RegExp(Object.keys(mapObj).join("|"),"gi");

     return str.replace(/\[|\]/gi,"").replace(re, function(matched){
         return mapObj[matched];
     });
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
                               ref={component => this.input = component}
                               placeholderTextColor={placeholderColor}
                               placeholder={placeholder}
                               underlineColorAndroid={inputUnderlineColor}
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
})(OptionInput);


 class InputModal extends Component{
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
                         paddingLeft: 10}}>{label}
                         </Text>
                         <View style={[styles.flex1]}></View>
                         <Icon  name="arrow-drop-down" style={[{paddingRight:10}]}/>
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
    replaceAll(str,mapObj){
        let re = new RegExp(Object.keys(mapObj).join("|"),"gi");

        return str.replace(/\[|\]/gi,"").replace(re, function(matched){
            return mapObj[matched];
        });
    }
    getStyles(){
        let {lines,vertical}=this.props;
        return[!lines?{height:40}:{},vertical?styles.flex1:{},vertical?styles.vertical:styles.horizontal]

    }
    openPicker(){
        let {onValueChange,forms,formName,field}=this.props;

        let options = {
            title: 'Select photos',
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

                let value={};
                value[field]=this.state.value;
                forms[formName]={...forms[formName],...value};

                onValueChange(forms);
                this.setState({
                    value
                });

            }
        });
    }
    componentWillMount(){

        this.ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});

    }
    componentDidMount() {
        // get value from prop
        if (typeof this.props.value !== 'undefined') {

            // return;
        }
        // get value from store

    }
    render() {
        const {textColor,errorColor} = uiTheme.palette;
       // let {onValueChange,forms,formName,field,label,validator,placeholder,lines,vertical}=this.props;

        return (


                <View style={[{height:Screen.height}]}>
                    <ListView dataSource={this.ds.cloneWithRows(this.state.value)}
                              contentContainerStyle={[styles.horizontal, styles.spaceAround, styles.flexWrap]}

                              enableEmptySections={true}
                              renderRow={(photo) =>
                                  <View style={[, {
                                      height: 220,
                                      width: 180
                                  },

                                  ]}>
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
                                                      <Text style={[styles.productTitle]}>
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

                    <ActionButton style={{padding:50}}

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
})(FilePickerInput);







export class ProductForm extends Component{

    constructor(props){
        super(props);
        this.fields=[];
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


        fields.forEach((sect,i)=>{
            for(field in sect)
            {
                item=sect[field];
                switch (item.widget){

                    case "inlineText":
                        _fields.push(
                            <EbTextInput key={field}

                                         {...{...item.props,formName,title}}
                                         field={field}
                                         label={item.hasOwnProperty("label")?item.label:""}
                                         validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );

                        break;
                    case "hidden":

                        _fields.push(
                            <EbHiddenInput key={field}
                                           {...{...item.props,formName,title}}
                                           field={field}
                                           label={item.hasOwnProperty("label")?item.label:""}
                                           validator={item.hasOwnProperty("validator")?item.validator:()=>{}}
                            />
                        );
                        break;
                    case"modal":
                        _fields.push(

                            <EbModalInput key={field}
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
                            <EbModalInput key={field}
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
        });
        return _fields;
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
       return this.fields.map((item)=>{
            return item;
        })
    }
    render(){
        return(
            <View style={[styles.flex1]}>
                {this.renderFields()}
            </View>)
    }


}