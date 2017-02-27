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
            password:""
        }
    }
    render(){
        return(
            <View style={styles.main}>
                <View style={styles.space}>

                </View>
                <View style={styles.mid}>
                    <View style={styles.row,styles.center}><Text style={styles.title}>Signin/Signup</Text></View>
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

                        <Button title="SignInn" onPress={()=>this.props.onSubmit(this.state.email,this.state.password)}>

                        </Button>

                    </View>
                    <View style={styles.row}>

                        <Button title="SignUp" onPress={()=>this.props.onCreate(this.state.email,this.state.password)}>

                        </Button>

                    </View>
                    <View style={styles.row}>

                        <Button title="logout" onPress={()=>this.props.onLogout()}>

                        </Button>

                    </View>
                    <View style={styles.row,styles.center}><Text style={styles.title}>or</Text></View>

                    <View style={styles.row}>
                        <Button style={styles.facebook} title="LOGIN WITH Facebook" onPress={()=>this.props.oAuth("FACEBOOK")}>

                        </Button>
                    </View>
                    <View style={styles.row}>
                        <Button style={styles.google} title="login with Google" onPress={()=>this.props.oAuth("GOOGLE")}>

                        </Button>
                    </View>
                    <View style={styles.row}>
                        <Button style={styles.twitter} title="login with TWITTER" onPress={()=>this.props.oAuth("TWITTER")}>

                        </Button>
                    </View>
                    <View style={styles.row}>
                        <Button style={styles.instagram} title="login with INSTAGRAM" onPress={()=>this.props.oAuth("INSTAGRAM")}>

                        </Button>
                    </View>
                </View>

                <View style={styles.space}>

                </View>
            </View>)
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
    main:{
        flexDirection:"row",
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        // backgroundColor:'blue'

    },
    space:{
        flex:1,
        // alignItems: 'center',
        // backgroundColor:'white'
    },
    mid:{
        flex:10,
        flexDirection:"column",
        // alignItems: 'center',
        // backgroundColor:'yellow'
    },
    row:{
        // flex:12,
        flexDirection:"column",
        //alignItems: 'center',
        // backgroundColor:'green',
        height:40,
        //width:260

    }
    ,
    center:{
        alignItems: 'center'
    },
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