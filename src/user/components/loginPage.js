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
import actions from "../user.actions"
let userActions=new actions;
class LoginPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            signUpPassword:"",
            retypedPassword:"",
            showStart:true,
            showLogin:false,
            showSignUp:false,
            showLogout:false,
            passwordMatched:false

        }
    }
    render(){
        return(
            <View style={styles.main,styles.horizontal}>
                <View style={styles.flex1}>

                </View>
                <View style={styles.flex10}>
                    <View style={styles.row,styles.center}><Text style={styles.title}>Signin/Signup</Text></View>

                {this.state.showStart?<View section="login/signup" style={styles.horizontal}>
                        <View style={styles.flex1}/>
                        <View style={styles.row,styles.flex4}>

                            <Button title="Log In" onPress={()=>this.showLogin()}>

                            </Button>

                        </View>


                        <View style={styles.flex2}/>
                        <View style={styles.row,styles.flex4}>
                            <Button title="Sign Up" onPress={()=>this.showSignUp()}>

                            </Button>

                        </View>

                        <View style={styles.flex1}/>
                    </View>:null}

                {this.computeShowOauth()?<View section="Oauth buttons">
                        <View style={styles.row}>
                            <Button style={styles.facebook} title="LOGIN WITH Facebook" onPress={()=>this.props.oAuth("FACEBOOK")}>

                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Button style={styles.google} title="login with Google" onPress={()=>this.props.oAuth("GOOGLE")}>

                            </Button>
                        </View>

                        <View style={styles.row,styles.center}><Text style={styles.title}>or</Text></View>
                    </View>:null}
                {this.state.showLogin?<View sect="login screen"  >
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

                       <Button title="Log In" onPress={()=>this.props.onSubmit(this.state.email,this.state.password)}>

                       </Button>

                   </View>
               </View>
           </View>:null}


                {this.state.showSignUp&&<View sect="sign up screen">
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

                   {this.comparePassword()?<View style={styles.row}>

                           <Button title="sign up" onPress={()=>this.props.onSubmit(this.state.email,this.state.password)}>

                           </Button>

                       </View>:null}
                   </View>


               </View>}





                {this.state.showLogout&&<View section="logout screen" style={styles.row}>
                        <Button title="logout" onPress={()=>this.props.onLogout()}>

                        </Button>
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

        if(this.state.showSignUp){
            return true

        }
        else if(this.state.showLogin){
            return true
        }
        else{
            return false
        }
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
            dispatch(userActions.login(email,password))
            /*dispatch({
             type:"USER_LOGIN",
             data:{email,password}
             })*/
        },
        oAuth:(name)=>{
            dispatch(userActions.oAuth(name))
        },
        validateEmail:(email)=>{
            dispatch(
                userActions.resetPasswordWithEmail(email)
            )
        },

        onCreate:(email,password)=>{
            dispatch(userActions.create(email,password))
        },
        onLogout:()=>{
            dispatch(userActions.logout())
        }
    }
}



const Oauth = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

export default Oauth


const  styles=StyleSheet.create({
   //layouts
    horizontal:{
        flexDirection:"row"
    },
    vertical:{
        flexDirection:"column"
    },

    //flex factors
    flex1:{
        flex:1
    },
    flex2:{
        flex:2
    },
    flex3:{
        flex:3
    },
    flex4:{
        flex:4
    },
    flex5:{
        flex:5
    },
    flex6:{
        flex:6
    },
    flex7:{
        flex:7
    },
    flex8:{
        flex:8
    },
    flex9:{
        flex:9
    },
    flex10:{
        flex:10
    },
    flex11:{
        flex:11
    },
    flex12:{
        flex:12
    },

    //content justify
spaceBetween:{
    justifyContent: 'space-between'
},
    flexStart:{
        justifyContent: 'flex-start'
    },
    flexEnd:{
        justifyContent: 'flex-end'
    },
    spaceAround:{
        justifyContent: 'space-around'
    },
    centerJustified:{
        justifyContent: 'center'
    },
    center:{
        alignItems:'center'
    },

    row:{
        // flex:2,

        //alignItems: 'center',
        // backgroundColor:'green',
       height:50,
        //width:260

    }
    ,

    input:{
        // flex: 4,
        paddingHorizontal: 10,
        // height:40,
    },
    title:{
        fontSize:16,
        fontWeight:"bold",
        color:"grey"
    },
    google:{
        backgroundColor:'red',
    },
    facebook:{
        // backgroundColor:'green',
    },
    twitter:{
        backgroundColor:'blue',
    },
    instagram:{
        backgroundColor:'brown',
    }
})



LoginPage.propTypes = {

    onSubmit: PropTypes.func.isRequired,
    validateEmail:PropTypes.func.isRequired,
    oAuth:PropTypes.func.isRequired,
    onCreate:PropTypes.func.isRequired,
    onLogout:PropTypes.func.isRequired

}