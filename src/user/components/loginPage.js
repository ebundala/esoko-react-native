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
import Button from 'apsl-react-native-button'
//import {Card, Icon,} from 'react-native-material-design';
import { Toolbar,Divider} from 'react-native-material-ui';

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


                                onPress={() => onSubmit(this.state.email, this.state.password, navigate, setPage)}>
                            <Text>{"Log In"}</Text>
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

                                raised={true}
                                text="sign up"
                                onPress={() => this.props.onSubmit(this.state.email, this.state.retypedPassword, setPage)}>
                            <Text>{"Sign up"}</Text>
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
                    <Button style={styles.facebook}
                            raised={true}
                            text="LOGIN WITH FACEBOOK"
                            onPress={() => oAuth("FACEBOOK", navigate, setPage)}>
                        <Text>{"LOGIN WITH FACEBOOK"}</Text>

                    </Button>
                </View>
                <View style={styles.row}>
                    <Button style={styles.google}
                            raised={true}
                            text="LOGIN WITH GOOGLE"
                            onPress={() => oAuth("GOOGLE", navigate, setPage)}>
                        <Text>{"LOGIN WITH GOOGLE"}</Text>
                    </Button>
                </View>

                <View style={[styles.row, styles.alignItemsCenter,{paddingTop:16}]}><Text style={styles.title}>or</Text></View>
            </View>

        )
    }
}

//screens
class startScreen extends Component {
    static navigationOptions = {

        header: ({ state, setParams ,navigate}) => {

            let style={height:0};
            return { style};
        },

    };
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
                            raised={true}
                            onPress={() => navigate("login")
                            }>
                            <Text>{"Log in"}</Text>
                        </Button>

                    </View>

                    <View style={styles.flex2}/>

                    <View style={[styles.row, styles.flex5]}>
                        <Button text="Sign Up"
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
    static   propTypes = {
        // screenProps: PropTypes.Object.isRequired,
        //navigation:PropTypes.Object.isRequired
    }
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return "Login to your account"
        },
        header: ({ state, setParams ,navigate}) => {

            let style=styles.navBarBackground;
            return { style};
        },

    };
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
    static   propTypes = {

        // screenProps: PropTypes.Object.isRequired,
        // navigation:PropTypes.Object.isRequired

    }
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return "Create New Account"
        },
        header: ({ state, setParams ,navigate}) => {

            let style=styles.navBarBackground;
            return { style};
        },

    };
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
    static  propTypes = {
        // screenProps: PropTypes.Object.isRequired,
        //  navigation:PropTypes.Object.isRequired
    }
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return "Reset Password"
        },

        header: ({ state, setParams ,navigate}) => {

            let style=styles.navBarBackground;
            return { style};
        },

    };

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
    static   propTypes = {
        // screenProps: PropTypes.Object.isRequired,
        // navigation:PropTypes.Object.isRequired
    }
    static navigationOptions = {
        title: ({state, setParams, navigate}) => {
            return "User Account"
        },
        header: ({ state, setParams ,navigate}) => {
            let  right=(
                <TouchableNativeFeedback onPress={()=>{
                    if(state.params){
                        state.params.hasOwnProperty("setPage")?state.params.setPage("app"):null;
                    }}}>
                <View styled={{padding:16}} navigate={navigate}>
                <Icon color={colours.paperGrey900.color} name="arrow-forward" />
            </View>
                </TouchableNativeFeedback>);
            let  left=(<View/>);
            let style=styles.navBarBackground;
            return { left,right,style};
        },

    };
    render() {
        let {navigate,goBack}=this.props.navigation;

        let {user, setPage,logout}=this.props.screenProps;

        return (
            <View style={[styles.flex1]}>
                <Toolbar
                    rightElement="arrow-forward"
                    rightElementPress={()=>{
                        alert("clicked")
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










