/**
 * Created by ebundala on 2/27/2017.
 */
/**
 * Created by ebundala on 2/24/2017.
 */
import React, { Component,PropTypes } from 'react';

import {
    StyleSheet,
    Text,
    View,

    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
Image
    } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Card,Icon } from 'react-native-material-design';
import { connect } from 'react-redux'
import styles from '../../styles/styles'
import actions from "../user.actions"
import * as activity from "../../activityIndicator/activitIndicatorAction"
class LoginPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            signUpPassword:"",
            signUpEmail:"",
            retypedPassword:"",
            emailReset:""

        }
        let ctx=this;
        /*actions.auth.listenForAuth((evt)=>{
            // evt is the authentication event
            // it contains an `error` key for carrying the
            // error message in case of an error
            // and a `user` key upon successful authentication
            if (!evt.authenticated) {
                // There was an error or there is no user
                console.log(" user not authenticated\n"+JSON.stringify(evt))
              // ctx.props._showStart();

                //ctx.showLogout();
            } else {
                // evt.user contains the user details
                console.log('User authenticated\n', JSON.stringify(evt.user));
                //ctx.props._showLogout();

            }
        }).then(() => {
                alert('Listening for authentication changes')}
                )*/
    }
    render(){
        return(

                <Image
                    style={{flex:1,width:null,height:null}}
                    source={require('../images/background.png')}
                    resizeMode={Image.resizeMode.cover}
                >
                <View style={[styles.flex1,styles.horizontal]}>
                <View style={styles.flex1}>

                </View>

                <View style={[
                    styles.flex10,
                    styles.spaceBetween]}>
                    <View style={[styles.row,styles.alignItemsCenter]}>
                       <TouchableHighlight onPress={()=>this.props._showStart()}>
                           <Text style={styles.title}>Signin/Signup</Text>
                       </TouchableHighlight>
                    </View>



                {this.props.showStart&&
                   <View style={styles.flex1}>
                    <View section="login/signup"
                        style={[styles.horizontal,
                            styles.flex1,
                            styles.alignItemsEnd,
                            styles.spaceBetween]}>

                        <View style={[styles.row,styles.flex5]}>

                            <Button
                                text="Log In"
                                raised={true}
                                onPress={()=>this.props._showLogin()}>

                            </Button>

                        </View>

                         <View style={styles.flex2}/>

                        <View style={[styles.row,styles.flex5]}>
                            <Button text="Sign Up"
                                    raised={true}
                                    onPress={()=>this.props._showSignUp()}>

                            </Button>

                        </View>


                    </View>
    <View style={styles.row}/>
                    </View>
                    }

                {this.computeShowOauth()&&
                <View section="Oauth buttons">
                        <View style={styles.row}>
                            <Button style={styles.facebook}
                                    raised={true}
                                    text="LOGIN WITH FACEBOOK"
                                    onPress={()=>this.props.oAuth("FACEBOOK")}>

                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Button style={styles.google}
                                    raised={true}
                                    text="LOGIN WITH GOOGLE"
                                    onPress={()=>this.props.oAuth("GOOGLE")}>

                            </Button>
                        </View>

                        <View style={[styles.row,styles.alignItemsCenter]}><Text style={styles.title}>or</Text></View>
                    </View>
                    }
                {this.props.showLogin&&
                <View sect="login screen"  >
                    <View section="email/pass input">
                   <View style={styles.row}>

                       <View style={styles.row}>
                           <TextInput
                               ref="email"
                               keyboardType="email-address"
                               style={styles.input}
                               autoCorrect={true}
                               autoCapitalize="none"
                               placeholderTextColor='#a8aAeC'
                               placeholder="Email"
                               onSubmitEditing={()=>this.props.validateEmail(this.state.email)}
                               onChangeText={email => this.setState({email})}
                           />

                       </View>

                   </View>
                   <View style={styles.row}>

                       <TextInput
                           ref="password"
                           style={styles.input}
                           maxLength={16}
                           secureTextEntry={true}
                           onSubmitEditing={this.submit.bind(this)}
                           autoCorrect={false}
                           autoCapitalize="none"
                           placeholderTextColor='#a8aAeC'
                           placeholder="Password"

                           onChangeText={password => this.setState({password})}
                       />

                   </View>
                   <View style={styles.row}>

                       <Button disabled={!(this.state.email&&this.state.password)}
                               raised={true}
                           text="Log In"
                           onPress={()=>this.props.login(this.state.email,this.state.password)}>

                       </Button>

                   </View>

                        <View style={[styles.row,styles.alignItemsCenter]}>
                            <TouchableHighlight onPress={()=>this.props._showResetPassword()}>
                                <Text>
                                    Forgot password
                                </Text>
                            </TouchableHighlight>
                        </View>
               </View>

           </View>
                    }

                {this.props.showSignUp&&
                <View sect="sign up screen">
                   <View section="email/pass input">
                       <View style={styles.row}>

                           <View style={styles.row}>
                               <TextInput
                                   ref="email"
                                   keyboardType="email-address"
                                   style={styles.input}
                                   autoCorrect={false}
                                   autoCapitalize="none"
                                   placeholderTextColor='#a8aAeC'
                                   placeholder="Email"
                                   onSubmitEditing={()=>this.props.validateEmail(this.state.signUpEmail)}
                                   onChangeText={signUpEmail => this.setState({signUpEmail})}
                               />

                           </View>

                       </View>
                       <View style={styles.row}>

                           <TextInput
                               ref="signUpPassword"
                               style={styles.input}
                               maxLength={16}
                               secureTextEntry={true}
                               onSubmitEditing={this.submit.bind(this)}
                               autoCorrect={false}
                               autoCapitalize="none"
                               placeholderTextColor='#a8aAeC'
                               placeholder="Password"

                               onChangeText={signUpPassword => this.setState({signUpPassword})}
                           />

                       </View>

                       <View style={styles.row}>

                           <TextInput
                               ref="retypedPassword"
                               style={styles.input}
                               maxLength={16}
                               secureTextEntry={true}
                               onSubmitEditing={this.submit.bind(this)}
                               autoCorrect={false}
                               autoCapitalize="none"
                               placeholderTextColor='#a8aAeC'
                               placeholder="Re-type Password"

                               onChangeText={retypedPassword => this.setState({retypedPassword})}
                           />

                       </View>

                   <View style={styles.row}>

                           <Button disabled={!this.comparePassword()}
                                   raised={true}
                                   text="sign up" onPress={()=>this.props.onCreate(this.state.signUpEmail,this.state.retypedPassword)}>

                           </Button>

                       </View>
                   </View>


               </View>
                    }

                {this.props.showLogout&&
                    <View style={[styles.flex1,styles.centerJustified]}>
                <View section="logout screen" style={styles.row}>
                        <Button text="logout"
                                raised={true}
                                onPress={()=>this.props.onLogout()}>

                        </Button>
                            </View>
                    </View>
                    }
                    {this.props.showResetPass&&
                    <View sect="reset-password"  >
                        <View >
                            <View style={styles.row}>

                                <View style={styles.row}>
                                    <TextInput
                                        ref="emailReset"
                                        keyboardType="email-address"
                                        style={styles.input}
                                        autoCorrect={true}
                                        autoCapitalize="none"
                                        placeholderTextColor='#a8aAeC'
                                        placeholder="Enter Email to receive reset link"
                                        onSubmitEditing={()=>this.props.validateEmail(this.state.emailReset)}
                                        onChangeText={emailReset => this.setState({emailReset})}
                                    />

                                </View>

                            </View>

                            <View style={styles.row}>

                                <Button disabled={!(this.state.emailReset)}
                                        raised={true}
                                        text="Send Reset link"
                                        onPress={()=>this.props.resetPasswordWithEmail(this.state.emailReset)}>

                                </Button>

                            </View>
                        </View>
                    </View>
                    }
                {  8&&<View>
                    <Text style={styles.red}>
                    {JSON.stringify(this.props)}
                       </Text>
                    </View>}





                </View>

                <View style={styles.flex1}>

                </View>
            </View>

                </Image>


        )
    }
    showSignUp(){
        this.setState({
            showStart:false,
            showLogin:false,
            showSignUp:true,
            showLogout:false,
            passwordMatched:false
        })
    }
    showLogin(){
        this.setState({
            showStart:false,
            showLogin:true,
            showSignUp:false,
            showLogout:false,
            passwordMatched:false
        })
    }
    showStart(){
        this.setState({
            showStart:true,
            showLogin:false,
            showSignUp:false,
            showLogout:false,
            passwordMatched:false
        })
    }
    showLogout(){

        this.setState({
            showStart:false,
            showLogin:false,
            showSignUp:false,
            showLogout:true,
            passwordMatched:false
        })
    }
    computeShowOauth(){

        if(this.props.showSignUp||this.props.showLogin){
            return true

        }

            return false
    }
    comparePassword(){

       // console.log("password\n one "+retypedPassword+"\ntwo"+this.state.signUpPassword)

        if((this.state.signUpPassword===this.state.retypedPassword)&&(this.state.signUpPassword&&this.state.retypedPassword)){

            return true
        }else{

            return false
        }
    }
    validateEmail(){
        let em=this.state.email;
        alert("validate emaill"+em)
    }
    submit(){



        alert("submit\n"+this.state.email+"\n"+this.state.password)
    }

}


const mapStateToProps = (state) => {
    return{...state.user}
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: (email,password) => {
           // dispatch(activity.startActivity("loging user in"))
            dispatch(actions.login(email,password))
            /*dispatch({
             type:"USER_LOGIN",
             data:{email,password}
             })*/
        },
        oAuth:(name)=>{
           // dispatch(activity.startActivity("loging user in"))
            dispatch(actions.oAuth(name))
        },
        validateEmail:(email)=>{
           // dispatch(
               // actions.resetPasswordWithEmail(email)
          //  )
        },
        resetPasswordWithEmail:(email)=>{
        dispatch(
            actions.resetPasswordWithEmail(email)
        )
    },
        onCreate:(email,password)=>{
         //   dispatch(activity.startActivity("creating user account"))
            dispatch(actions.create(email,password))
        },
        onLogout:()=>{
            dispatch(actions.logout())
        },
        _showSignUp:()=>{
            dispatch(actions.showSignUp())
        },
        _showLogin:()=>{
            dispatch(actions.showLogin())
        },
        _showStart:()=>{
            dispatch(actions.showStart())
        },
        _showLogout:()=>{
            dispatch(actions.showLogout())

        },
        _showResetPassword:()=>{
            dispatch(actions.showResetPassword())

        },
        _showResetMail:()=>{
            dispatch(actions.showResetMail())

        }
    }
}



const Oauth = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

export default Oauth






LoginPage.propTypes = {

    login: PropTypes.func.isRequired,
    validateEmail:PropTypes.func.isRequired,
    oAuth:PropTypes.func.isRequired,
    onCreate:PropTypes.func.isRequired,
    onLogout:PropTypes.func.isRequired

}