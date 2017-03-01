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
    Button,
    TextInput,
    TouchableHighlight,

    } from 'react-native';
import { connect } from 'react-redux'
import styles from '../../styles/styles'
import actions from "../user.actions"
//let userActions=new actions;
class LoginPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            signUpPassword:"",
            signUpEmail:"",
            retypedPassword:"",
            showStart:true,
            showLogin:false,
            showSignUp:false,
            showLogout:false,
            passwordMatched:false

        }
        let ctx=this;
        actions.auth.listenForAuth((evt)=>{
            // evt is the authentication event
            // it contains an `error` key for carrying the
            // error message in case of an error
            // and a `user` key upon successful authentication
            if (!evt.authenticated) {
                // There was an error or there is no user
                console.log(" user not authenticated\n"+JSON.stringify(evt))
               ctx.showStart();
                //ctx.showLogout();
            } else {
                // evt.user contains the user details
                console.log('User authenticated\n', JSON.stringify(evt.user));
                ctx.showLogout();

            }
        }).then(() => {
                alert('Listening for authentication changes')})
    }
    render(){
        return(
            <View style={styles.flex1,styles.horizontal}>
                <View style={styles.flex1}>

                </View>

                <View style={{flex:10,justifyContent:"space-around"}}>
                    <View style={styles.row,styles.alignItemsCenterCN}>
                        <Text style={styles.title}>Signin/Signup</Text>
                    </View>

                {!this.state.showStart&&
                <View style={styles.row}>
                        <Button  title="back" onPress={()=>this.showStart()}>

                        </Button>
                    </View>}

                {this.state.showStart&&
                   <View style={styles.flex1}>
                    <View section="login/signup"
                        style={{
                            flexDirection:"row",
                            flex:1,
                            alignItems:"flex-end",
                            justifyContent:"space-between"
                        }}>

                        <View style={styles.row,styles.flex5}>

                            <Button
                                title="Log In" onPress={()=>this.showLogin()}>

                            </Button>

                        </View>

                         <View style={styles.flex2}/>

                        <View style={styles.row,styles.flex5}>
                            <Button title="Sign Up" onPress={()=>this.showSignUp()}>

                            </Button>

                        </View>


                    </View>
    <View style={styles.row}/>
                    </View>
                    }

                {this.computeShowOauth()&&
                <View section="Oauth buttons">
                        <View style={styles.row}>
                            <Button style={styles.facebook} title="LOGIN WITH Facebook" onPress={()=>this.props.oAuth("FACEBOOK")}>

                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Button style={styles.google} title="login with Google" onPress={()=>this.props.oAuth("GOOGLE")}>

                            </Button>
                        </View>

                        <View style={styles.row,styles.alignItemsCenterCN}><Text style={styles.title}>or</Text></View>
                    </View>
                    }
                {this.state.showLogin&&
                <View sect="login screen"  >
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
                           title="Log In"
                           onPress={()=>this.props.onSubmit(this.state.email,this.state.password)}>

                       </Button>

                   </View>
               </View>
           </View>
                    }

                {this.state.showSignUp&&
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

                           <Button disabled={!this.comparePassword()} title="sign up" onPress={()=>this.props.onCreate(this.state.signUpEmail,this.state.retypedPassword)}>

                           </Button>

                       </View>
                   </View>


               </View>
                    }

                {this.state.showLogout&&
                    <View style={{
                        flex:1,
                        justifyContent:"center"
                    }}>
                <View section="logout screen" style={styles.row}>
                        <Button title="logout" onPress={()=>this.props.onLogout()}>

                        </Button>
                            </View>
                    </View>
                    }

                {  this.state.showLogout&&<View>
                    <Text style={styles.red}>
                    {JSON.stringify(this.state)}
                       </Text>
                    </View>}





                </View>

                <View style={styles.flex1}>

                </View>
            </View>)
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

        if(this.state.showSignUp||this.state.showLogin){
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
    return {
        user: state.user
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (email,password) => {
            dispatch(actions.login(email,password))
            /*dispatch({
             type:"USER_LOGIN",
             data:{email,password}
             })*/
        },
        oAuth:(name)=>{
            dispatch(actions.oAuth(name))
        },
        validateEmail:(email)=>{
            dispatch(
                actions.resetPasswordWithEmail(email)
            )
        },

        onCreate:(email,password)=>{
            dispatch(actions.create(email,password))
        },
        onLogout:()=>{
            dispatch(actions.logout())
        }
    }
}



const Oauth = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

export default Oauth






LoginPage.propTypes = {

    onSubmit: PropTypes.func.isRequired,
    validateEmail:PropTypes.func.isRequired,
    oAuth:PropTypes.func.isRequired,
    onCreate:PropTypes.func.isRequired,
    onLogout:PropTypes.func.isRequired

}