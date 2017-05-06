/**
 * Created by ebundala on 2/27/2017.
 */
/**
 * Created by ebundala on 2/24/2017.
 */
import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Text,
    View,

    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';
//import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//import Button from 'apsl-react-native-button'
//import {Card, Icon,} from 'react-native-material-design';
import { Toolbar,Divider,Button} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import styles,{colours} from '../../styles/styles'
import actions from "../user.actions"
import * as activity from "../../activityIndicator/activitIndicatorAction"


class LoginSection extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
        , onSubmit: PropTypes.func.isRequired,
        validateEmail: PropTypes.func.isRequired,
        setPage: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        let {navigate, validateEmail, onSubmit, setPage}=this.props;
        return (
            <View   >
                <View section="email/pass input">
                    <View style={styles.row}>
                            <TextInput
                                ref={component => this.emailInput = component}
                                keyboardType="email-address"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholderTextColor={colours.paperGrey500.color}
                                underlineColorAndroid="transparent"

                                placeholder="Email"
                                onSubmitEditing={() => validateEmail(this.state.email, navigate) ?
                                    this.passwordInput.focus() : this.emailInput.focus()}
                                onChangeText={email => this.setState({email})}
                            />
                    </View>
                    <Divider/>
                    <View style={styles.row}>

                        <TextInput
                            underlineColorAndroid="transparent"

                            ref={component => this.passwordInput = component}
                            style={styles.input}
                            maxLength={16}
                            secureTextEntry={true}
                            onSubmitEditing={() => alert("submiting")}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholderTextColor={colours.paperGrey500.color}
                            placeholder="Password"

                            onChangeText={password => this.setState({password})}
                        />

                    </View>
                    <Divider/>
                    <View style={[styles.row,{paddingTop:8}]}>

                        <Button disabled={!(this.state.email && this.state.password)}
                                primary
                                raised={true}
                                text={"Log In"}
                                onPress={() => onSubmit(this.state.email, this.state.password, navigate, setPage)}>

                        </Button>

                    </View>

                    <View style={[styles.alignItemsCenter]}>
                        <TouchableNativeFeedback onPress={() => navigate("resetPassword")}>
                            <Text>
                                Forgot password
                            </Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>

            </View>
        )
    }
}

class SignUpSection extends Component {
    static  propTypes = {
        navigate: PropTypes.func.isRequired
        , onSubmit: PropTypes.func.isRequired,
        validateEmail: PropTypes.func.isRequired,
        setPage: PropTypes.func.isRequired,

    }

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        let {navigate, validateEmail, onSubmit, setPage}=this.props;
        return (

            <View sect="sign up screen">
                <View section="email/pass input">
                    <View style={styles.row}>


                            <TextInput
                                underlineColorAndroid="transparent"

                                ref={component => this.emailInput = component}
                                keyboardType="email-address"
                                style={styles.input}
                                autoCorrect={true}
                                autoCapitalize="none"
                                placeholderTextColor={colours.paperGrey500.color}
                                placeholder="Email"
                                onSubmitEditing={() => validateEmail(this.state.email, navigate) ? this.passwordInput.focus() : this.emailInput.focus()}
                                onChangeText={email => this.setState({email})}
                            />



                    </View>
                    <Divider/>
                    <View style={styles.row}>

                        <TextInput
                            underlineColorAndroid="transparent"

                            ref={component => this.passwordInput = component}
                            style={styles.input}
                            maxLength={16}
                            secureTextEntry={true}
                            onSubmitEditing={() => this.retypedPassword.focus()}
                            autoCorrect={true}
                            autoCapitalize="none"
                            placeholderTextColor={colours.paperGrey500.color}
                            placeholder="Password"

                            onChangeText={password => this.setState({password})}
                        />

                    </View>
                    <Divider/>
                    <View style={styles.row}>

                        <TextInput
                            underlineColorAndroid="transparent"

                            ref={component => this.retypedPassword = component}
                            style={styles.input}
                            maxLength={16}
                            secureTextEntry={true}
                            onSubmitEditing={() => this.comparePassword() ? onSubmit(this.state.email, this.state.retypedPassword, setPage)
                                : alert("password didn't match")}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholderTextColor={colours.paperGrey500.color}
                            placeholder="Re-type Password"

                            onChangeText={retypedPassword => this.setState({retypedPassword})}
                        />

                    </View>
                    <Divider/>
                    <View style={[styles.row,{paddingVertical:16}]}>

                        <Button disabled={!this.comparePassword()}
                                primary
                                raised={true}
                                text={"Sign up"}
                                onPress={() => this.props.onSubmit(this.state.email, this.state.retypedPassword, setPage)}>

                        </Button>

                    </View>
                </View>


            </View>
        )
    }

    comparePassword() {

        // console.log("password\n one "+retypedPassword+"\ntwo"+this.state.signUpPassword)

        if ((this.state.password === this.state.retypedPassword) && (this.state.password && this.state.retypedPassword)) {

            return true
        } else {

            return false
        }
    }
}

class OauthSection extends Component {
    static   propTypes = {
        navigate: PropTypes.func.isRequired,
        oAuth: PropTypes.func.isRequired,
        setPage: PropTypes.func.isRequired,
    }

    render() {
        let {navigate, oAuth, setPage}=this.props;
        return (
            <View >
                <View style={styles.row}>
                    <Icon.Button style={[styles.centerJustified]} name="google-plus" backgroundColor="#D84B37" onPress={() => oAuth("GOOGLE", navigate, setPage)}>
                        Login with Google
                    </Icon.Button>

                </View>
                <View style={styles.row}>
                    <Icon.Button style={[styles.centerJustified]} name="facebook" backgroundColor="#3b5998" onPress={() => oAuth("GOOGLE", navigate, setPage)}>
                        Login with Facebook
                    </Icon.Button>

                </View>

                <View style={[styles.row, styles.alignItemsCenter,{paddingTop:16}]}><Text style={styles.title}>or</Text></View>
            </View>

        )
    }
}

//screens
class startScreen extends Component {

    render() {
        let {navigate}=this.props.navigation;
        let {setPage, user}=this.props.screenProps;
        return (

            <View style={[styles.flex1,{backgroundColor:"white",padding:16}]}>

                <View
                    style={[styles.horizontal,
                        styles.flex1,
                        styles.alignItemsEnd,
                        styles.spaceBetween]}>

                    <View style={[styles.row, styles.flex5]}>

                        <Button
                            text="Log In"
                            accent
                            raised={true}
                            onPress={() => navigate("login")
                            }>
                            <Text>{"Log in"}</Text>
                        </Button>

                    </View>

                    <View style={styles.flex2}/>

                    <View style={[styles.row, styles.flex5]}>
                        <Button text="Sign Up"
                                accent
                                raised={true}
                                onPress={() => navigate("signup")}>
                            <Text>{"Sign up"}</Text>
                        </Button>

                    </View>


                </View>
                <View style={styles.row}/>

            </View>

        )
    }
}

class LoginScreen extends Component {

    render() {
        let {navigate,goBack}=this.props.navigation;
        let {setPage, user,oAuth,login,validateEmail}=this.props.screenProps;
        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement="Login to your account"

                />
                <View style={[styles.flex1,styles.centerJustified,{backgroundColor:"white",padding:16}]}>
                <OauthSection oAuth={oAuth} setPage={setPage} navigate={navigate}/>
                <LoginSection onSubmit={login} setPage={setPage} navigate={navigate}
                              validateEmail={validateEmail}/>
                </View>
            </View>
        )
    }
}

class SignUpScreen extends Component {

    render() {
        let {navigate,goBack}=this.props.navigation;
        let {setPage, user,oAuth,signUp,validateEmail}=this.props.screenProps;
        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement="Create Account"

                />
                <View style={[styles.flex1,styles.centerJustified,{backgroundColor:"white",padding:16}]}>

                <OauthSection oAuth={oAuth} setPage={setPage} navigate={navigate}/>
                <SignUpSection onSubmit={signUp} setPage={setPage} validateEmail={validateEmail}
                               navigate={navigate}/>
                </View>

            </View>
        )
    }
}

class resetPasswordScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: ""
        }
    }

    render() {
        let {navigate,goBack}=this.props.navigation;
        let {setPage, user,resetPasswordWithEmail,validateEmail}=this.props.screenProps;
        return (

            <View style={[styles.flex1]}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={()=>{
                        goBack();
                    }}
                    centerElement="Reset Password"

                />
                <View style={[styles.flex1,styles.centerJustified,{backgroundColor:"white",padding:16}]}>

                <View style={styles.row}>

                    <View style={styles.row}>
                        <TextInput
                            underlineColorAndroid="transparent"

                            ref={component => this.emailReset = component}
                            keyboardType="email-address"
                            style={styles.input}
                            autoCorrect={true}
                            autoCapitalize="none"
                            placeholderTextColor={colours.paperGrey500.color}
                            placeholder="Email"
                            onSubmitEditing={() => validateEmail(this.state.email, navigate)}
                            onChangeText={email => this.setState({email})}
                        />

                    </View>

                </View>
<Divider/>
                <View style={[styles.row,{paddingVertical:16}]}>

                    <Button disabled={!(this.state.email)}
                            accent
                            raised={true}
                            text="Send Reset link"
                            onPress={() => resetPasswordWithEmail(this.state.email, navigate, setPage)}>
                        <Text>{"Send Reset link"}</Text>
                    </Button>

                </View>
                </View>
            </View>

        )
    }
}

class AccountScreen extends Component {


    render() {
        let {navigate,goBack}=this.props.navigation;

        let {user, setPage,logout}=this.props.screenProps;

        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    rightElement="arrow-forward"
                    onRightElementPress={()=>{

                        setPage("app")
                    }}
                    centerElement="User Account"

                />
                <View style={[styles.flex1,styles.centerJustified,{backgroundColor:"white",padding:16}]}>

                <Text>{JSON.stringify(user)}</Text>
                <View style={styles.row}>
                    <Button text="logout"
                            raised={true}
                            onPress={() => logout(navigate, setPage)}>
                        <Text>{"Logout"}</Text>
                    </Button>
                </View>
                </View>
            </View>
        )
    }
    componentDidMount(){
        let {setPage}=this.props.screenProps;
        this.props.navigation.setParams({setPage})
    }
}

const routes = {
    start: {screen: startScreen},
    login: {screen: LoginScreen},
    signup: {screen: SignUpScreen},
    resetPassword: {screen: resetPasswordScreen},
    account: {screen: AccountScreen}
}
const stackConfig = {
    headerMode: "none"
}
const LoginPage = StackNavigator(routes, stackConfig);

const mapStateToProps = (state) => {
    return {...state}
}
const mapDispatchToProps = (dispatch) => {
    return {

        login: (email, password, navigate = {}, setPage) => {
            dispatch(activity.startActivity("loging user in"))
            dispatch(actions.login(email, password, navigate, setPage))
            /*dispatch({
             type:"USER_LOGIN",
             data:{email,password}
             })*/
        },
        oAuth: (name, navigate, setPage) => {

            dispatch(activity.startActivity("loging user in"));
            dispatch(actions.oAuth(name, token = "", navigate, setPage))
        },
        validateEmail: (email, navigate) => {
            /*dispatch(
             {type:"VALIDATE_EMAIL",data:{email}}
             )*/
            return true
        },
        resetPasswordWithEmail: (email, navigate, setPage) => {
            dispatch(activity.startActivity("reset Password With Email" + email))
            dispatch(actions.resetPasswordWithEmail(email, navigate, setPage)
            )
        },
        signUp: (email, password, navigate, setPage) => {
            dispatch(activity.startActivity("creating user account"))
            dispatch(actions.create(email, password, navigate, setPage))
        },
        logout: (navigate,setPage) => {
            dispatch(actions.logout(navigate, setPage))
        }


    }

}

const mergeProps = (stateProps, dispatchProp, ownProps) => {

    return {
        ...ownProps,
        screenProps: {
            ...ownProps.screenProps,
            ...stateProps,
            ...dispatchProp,

        }
    }
}

const Oauth = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(LoginPage);

export default  Oauth










