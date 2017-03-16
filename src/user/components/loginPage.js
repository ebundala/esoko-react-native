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
//import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import { Button, Card,Icon } from 'react-native-material-design';
import { connect } from 'react-redux'
import styles from '../../styles/styles'
import actions from "../user.actions"
import * as activity from "../../activityIndicator/activitIndicatorAction"

class LoginSection extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }
    render(){
        let {navigate,validateEmail,onSubmit}=this.props
        return(
            <View   >
                <View section="email/pass input">
                    <View style={styles.row}>

                        <View style={styles.row}>
                            <TextInput
                                ref={component=>this.emailInput=component}
                                keyboardType="email-address"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholderTextColor='#a8aAeC'
                                placeholder="Email"
                                onSubmitEditing={()=>validateEmail(this.state.email,navigate)?
                                    this.passwordInput.focus():this.emailInput.focus()}
                                onChangeText={email => this.setState({email})}
                            />

                        </View>

                    </View>
                    <View style={styles.row}>

                        <TextInput
                            ref={component=>this.passwordInput=component}
                            style={styles.input}
                            maxLength={16}
                            secureTextEntry={true}
                            onSubmitEditing={()=>alert("submiting")}
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
                                onPress={()=>onSubmit(this.state.email,this.state.password,navigate)}>

                        </Button>

                    </View>

                    <View style={[styles.row,styles.alignItemsCenter]}>
                        <TouchableNativeFeedback onPress={()=>navigate("resetPassword")}>
                            <Text>
                                Forgot password
                            </Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>

            </View>
        )}
}
class SignUpSection extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }
    render(){
        let {navigate,validateEmail,onSubmit}=this.props;
        return(

            <View sect="sign up screen">
                <View section="email/pass input">
                    <View style={styles.row}>

                        <View style={styles.row}>
                            <TextInput
                                ref={component=>this.emailInput=component}
                                keyboardType="email-address"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholderTextColor='#a8aAeC'
                                placeholder="Email"
                                onSubmitEditing={()=>validateEmail(this.state.email,navigate)?this.passwordInput.focus():this.emailInput.focus()}
                                onChangeText={email => this.setState({email})}
                            />

                        </View>

                    </View>
                    <View style={styles.row}>

                        <TextInput
                            ref={component=>this.passwordInput=component}
                            style={styles.input}
                            maxLength={16}
                            secureTextEntry={true}
                            onSubmitEditing={()=>this.retypedPassword.focus()}
                            autoCorrect={true}
                            autoCapitalize="none"
                            placeholderTextColor='#a8aAeC'
                            placeholder="Password"

                            onChangeText={password => this.setState({password})}
                        />

                    </View>

                    <View style={styles.row}>

                        <TextInput
                            ref={component=>this.retypedPassword=component}
                            style={styles.input}
                            maxLength={16}
                            secureTextEntry={true}
                            onSubmitEditing={()=>this.comparePassword()?onSubmit(this.state.email,this.state.retypedPassword)
                                :alert("password didn't match")}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholderTextColor='#a8aAeC'
                            placeholder="Re-type Password"

                            onChangeText={retypedPassword => this.setState({retypedPassword})}
                        />

                    </View>

                    <View style={styles.row}>

                        <Button disabled={!this.comparePassword()}
                                ref={component=>this.submitButton=component}
                                raised={true}
                                text="sign up" onPress={()=>this.props.onSubmit(this.state.email,this.state.retypedPassword)}>

                        </Button>

                    </View>
                </View>


            </View>
        )}

    comparePassword(){

        // console.log("password\n one "+retypedPassword+"\ntwo"+this.state.signUpPassword)

        if((this.state.password===this.state.retypedPassword)&&(this.state.password&&this.state.retypedPassword)){

            return true
        }else{

            return false
        }
    }
}
class OauthSection extends Component{
    render(){
        let {navigate,oAuth}=this.props;
    return(
        <View >
            <View style={styles.row}>
                <Button style={styles.facebook}
                        raised={true}
                        text="LOGIN WITH FACEBOOK"
                        onPress={()=>oAuth("FACEBOOK",navigate)}>

                </Button>
            </View>
            <View style={styles.row}>
                <Button style={styles.google}
                        raised={true}
                        text="LOGIN WITH GOOGLE"
                        onPress={()=>oAuth("GOOGLE",navigate)}>

                </Button>
            </View>

            <View style={[styles.row,styles.alignItemsCenter]}><Text style={styles.title}>or</Text></View>
        </View>

    )}}

    //screens
class startScreen extends Component {

    render(){
        let {navigate}=this.props.navigation;
        let user=this.props;
        return(

            <View style={styles.flex1}>
                <Text>{JSON.stringify(user)}</Text>
                <View
                    style={[styles.horizontal,
                        styles.flex1,
                        styles.alignItemsEnd,
                        styles.spaceBetween]}>

                    <View style={[styles.row, styles.flex5]}>

                        <Button
                            text="Log In"
                            raised={true}
                            onPress={() => navigate("login")}>

                        </Button>

                    </View>

                    <View style={styles.flex2}/>

                    <View style={[styles.row, styles.flex5]}>
                        <Button text="Sign Up"
                                raised={true}
                                onPress={() => navigate("signup")}>

                        </Button>

                    </View>


                </View>
                <View style={styles.row}/>
            </View>

        )
    }
}

class LoginScreen extends Component{
    render(){
        let {navigate}=this.props.navigation;
        let user=this.props.screenProps;
        return(
    <View>
    <OauthSection oAuth={user.oAuth} navigate={navigate}/>
   <LoginSection onSubmit={user.login}  navigate={navigate} validateEmail={user.validateEmail}/>
    </View>
)}}
class SignUpScreen extends Component{
    render(){
        let {navigate}=this.props.navigation;
        let user=this.props.screenProps;
    return(
    <View>
        <OauthSection oAuth={user.oAuth} navigate={navigate}/>
        <SignUpSection onSubmit={user.signUp} validateEmail={user.validateEmail} navigate={navigate}/>

    </View>
)}}

class resetPasswordScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            email:""
        }
    }
    render(){
        let {navigate}=this.props.navigation;
        let user=this.props.screenProps;
    return(

        <View style={[styles.flex1,styles.centerJustified]}>
            <View style={styles.row}>

                <View style={styles.row}>
                    <TextInput
                        ref={component=>this.emailReset=component}
                        keyboardType="email-address"
                        style={styles.input}
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholderTextColor='#a8aAeC'
                        placeholder="Enter Email to receive reset link"
                        onSubmitEditing={()=>user.validateEmail(this.state.email,navigate)}
                        onChangeText={email => this.setState({email})}
                    />

                </View>

            </View>

            <View style={styles.row}>

                <Button disabled={!(this.state.email)}
                        raised={true}
                        text="Send Reset link"
                        onPress={()=>user.resetPasswordWithEmail(this.state.email,navigate)}>

                </Button>

            </View>
        </View>

)}}
class AccountScreen extends Component{
    render(){
        let {navigate}=this.props.navigation;
        let user=this.props.screenProps;
    return(
    <View style={[styles.flex1,styles.centerJustified]}>
        <View  style={styles.row}>
            <Button text="logout"
                    raised={true}
                    onPress={()=>user.logout(navigate)}>

            </Button>
        </View>
    </View>
)}}




const routes={
    start:{screen:startScreen},
    login:{screen:LoginScreen},
    signup:{screen:SignUpScreen},
    resetPassword:{screen:resetPasswordScreen},
    account:{screen:AccountScreen}
}
const stackConfig={
    headerMode:"none"
}
const LoginPage=StackNavigator(routes,stackConfig);

const mapStateToProps = (state) => {
    return{...state.user}
}
const mapDispatchToProps = (dispatch) => {
    return{

        login: (email,password,navigate={}) => {
            dispatch(activity.startActivity("loging user in"))
            dispatch(actions.login(email,password,navigate))
            /*dispatch({
             type:"USER_LOGIN",
             data:{email,password}
             })*/
        },
        oAuth:(name,navigate)=>{

            dispatch(activity.startActivity("loging user in"));
            dispatch(actions.oAuth(name,token="",navigate))
        },
        validateEmail:(email,navigate)=>{
            dispatch(
                {type:"VALIDATE_EMAIL",data:{email}}
           )
return true
        },
        resetPasswordWithEmail:(email,navigate)=>{
            dispatch(activity.startActivity("reset Password With Email"+email))
        dispatch(actions.resetPasswordWithEmail(email,navigate)
        )
    },
        signUp:(email,password,navigate)=>{
           dispatch(activity.startActivity("creating user account"))
            dispatch(actions.create(email,password,navigate))
        },
        logout:(navigate)=>{
            dispatch(actions.logout(navigate))
        },
        _showSignUp:(navigate)=>{

        },
        _showLogin:(navigate)=>{

        },
        _showStart:(navigate)=>{

        },
        _showLogout:(navigate)=>{


        },
        _showResetPassword:(navigate)=>{


        },
        _showResetMail:(navigate)=>{


        }

    }

}

const mergeProps=(stateProps,dispatchProp,ownProps)=>{
return{
    ...ownProps,
    screenProps:{
     ...stateProps,
    ...dispatchProp,
    }
}
}

const Oauth= connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(LoginPage);

export default  Oauth

/*LoginPage.propTypes = {

    login: PropTypes.func.isRequired,
    validateEmail:PropTypes.func.isRequired,
    oAuth:PropTypes.func.isRequired,
    onCreate:PropTypes.func.isRequired,
    onLogout:PropTypes.func.isRequired

}*/







class LoginPagex extends Component{

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

