/**
 * Created by ebundala on 2/24/2017.
 */

//import userUtil from "../utils/user"
import * as activity from "../activityIndicator/activitIndicatorAction"
import Firestack from "react-native-firestack";
const firestack =new Firestack();
const validator=require("validator")
//import { isEmail } from 'validator/lib/isEmail';

export const USER_ACTIONS={
    LOGIN:"USER_LOGIN",
    LOGOUT:"USER_LOGOUT",
    RESETPASSWORD:"USER_RESET_PASSWORD",
    CREATED:"USER_CREATED"

}

 //class userActions extends userUtil {
  export const  login=(email, password, navigate, setPage)=> {
         return (dispatch) => {
             if (email && password) {
                 dispatch(activity.startActivity("Login using " + email))

                 return firestack.auth.signInWithEmail(email, password)
                     .then((user) => {
                        // console.log('User successfully logged in\n', user);
                         dispatch(activity.endActivity("User successfully logged in " + email))
                      /*   dispatch({
                             type: USER_ACTIONS.LOGIN,
                             status: "OK",
                             data: {
                                 ...user
                             }
                         })*/
                       navigate("account")
                         if (setPage) {
                             setPage("app")
                         }

                     })
                     .catch((err) => {
                         // alert('User signin error', err.message);
                         dispatch(activity.activityError(err.errorMessage || 'UNKNOWN ERROR'))
                         dispatch({
                             type: USER_ACTIONS.LOGIN,
                             status: "error",
                             data: {
                                 err
                             }
                         })
                     })

             }
         }
     }

export const  logout=(navigate, setPage)=> {
         return (dispatch) => {
             return firestack.auth.signOut()
                 .then(res => {
                     console.log('You have been signed out\n', res)
                    /* dispatch(
                         {
                             type: USER_ACTIONS.LOGOUT,
                             status: "OK"
                             //data:null
                         }
                     )*/
                     navigate("start")
                 })
                 .catch(err => {
                     //console.error('Uh oh... something weird happened')
                     dispatch(
                         {
                             type: USER_ACTIONS.LOGOUT,
                             status: "error",
                             data: {
                                 err
                             }
                         }
                     )


                 })


         }
     }

export const   resetPasswordWithEmail=(email, navigate, setPage)=> {
         return (dispatch) => {
             if (email) {
                 dispatch(activity.startActivity("Sending reset  link to " + email))

                 return firestack.auth.sendPasswordResetWithEmail(email)
                     .then(res => {
                         //console.log('Check your inbox for further instructions')
                         dispatch(activity.endActivity("Check your inbox for further instructions"))
                         return dispatch({
                             type: USER_ACTIONS.RESETPASSWORD,
                             status: "OK",
                             data: {
                                 res
                             }
                         })
                     })
                     .catch(err => {
                         dispatch(activity.activityError(err.errorMessage || "UNKNOWN ERROR"));
                         return dispatch({
                             type: USER_ACTIONS.RESETPASSWORD,
                             status: "error",
                             data: {err}
                         })
                         //console.log('There was an error ')})


                     })
             }
         }
     }

export const    oAuth=(name, token, navigate, setPage)=> {
         return (dispatch) => {

             dispatch(activity.startActivity("Login using " + name))
             return firestack.auth.signInWithProvider(name, token, '') // facebook need only access token.
                 .then((user) => {
                     // console.log('User successfully logged in', user)
                     dispatch(activity.endActivity("User successfully logged in "))
                     dispatch({
                         type: USER_ACTIONS.LOGIN,
                         status: "OK",
                         data: {
                             user
                         }
                     })
                     navigate("account");
                     // navigate("app")
                     if (setPage) {
                         setPage("app")
                     }

                 }).catch(err => {

                     //console.log('User logged failed', err)
                     dispatch(activity.activityError(err.errorMessage || "UNKNOWN ERROR"));
                     dispatch({
                         type: USER_ACTIONS.LOGIN,
                         status: "error",
                         data: {
                             err
                         }
                     })
                 })
         }
     }

export const    signUp=(email, password, navigate, setPage)=> {
         return dispatch => {
             if (email && password) {
                 dispatch(activity.startActivity("Creating User "))
                 return firestack.auth.createUserWithEmail(email, password)
                     .then((user) => {
                         console.log('user created', user)

                         //if(!!user.authenticated&&!!user.user){

                         return this.database.ref("/users/" + user.user.uid).set({type: "normal"}).then(res => {

                             console.log("user profile created\n", res)

                             dispatch(activity.endActivity("User Account Created "))
                             dispatch({
                                 type: USER_ACTIONS.CREATED,
                                 status: "OK",
                                 data: {
                                     ...user
                                 }
                             })
                             navigate("account")
                             if (setPage) {
                                 setPage("app")
                             }
                         })
                         // }


                     })
                     .catch((err) => {
                         //console.log('An error occurred', err);
                         dispatch(activity.activityError(err.errorMessage || "UNKNOWN ERROR"))
                         dispatch({
                             type: USER_ACTIONS.CREATED,
                             status: "error",
                             data: {
                                 err
                             }
                         })
                     })
             }
         }
     }

export const   userLoggedIn=(user, navigate, setPage)=> {
         return (dispatch) => {
             console.log('User successfully logged in\n', user);
             // dispatch(activity.endActivity("User successfully logged in "+email))
             dispatch({
                 type: USER_ACTIONS.LOGIN,
                 status: "OK",
                 data: {
                     ...user
                 }
             });
             navigate("account");
             if (setPage) {
                 setPage("app")
             }
         }
     }

export const   userLoggedOut=(user, navigate)=> {
         return(dispatch)=>{
             console.log('You have been signed out\n', res);
         dispatch(
             {
                 type: USER_ACTIONS.LOGOUT,
                 status: "OK"
                 //data:null
             }
         )
         navigate("start")
     }
 }


//}
//export default new userActions()