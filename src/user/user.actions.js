/**
 * Created by ebundala on 2/24/2017.
 */

import userUtil from "../utils/user"
import * as activity from "../activityIndicator/activitIndicatorAction"
 class userActions extends userUtil {
  login(email,password){
    return (dispatch)=>
    {
        if(email&&password){
            dispatch(activity.startActivity("Login using "+email))

        return this.auth.signInWithEmail(email, password)
        .then((user) => {
            //console.log('User successfully logged in', user)
            dispatch(activity.endActivity("User successfully logged in "+email))
                dispatch({
                    type:"USER_LOGIN",
                    status:"OK",
                    data:{
                        //user
                    }})
        })
        .catch((err) => {
           // alert('User signin error', err.message);
            dispatch(activity.activityError(err.errorMessage||'UNKNOWN ERROR'))
                dispatch({
                    type:"USER_LOGIN",
                    status:"error",
                    data:{
                        err
                    }})
        })

        }
    }
}

  logout(){
    return(dispatch)=>
    {
        return this.auth.signOut()
        .then(res =>{
                //console.log('You have been signed out')
                dispatch(
                    {
                        type:"USER_LOGOUT",
                        status:"OK"
                        //data:null
                    }
                )
            })
        .catch(err =>{
                //console.error('Uh oh... something weird happened')
                dispatch(
                    {
                        type:"USER_LOGOUT",
                        status:"error",
                        data:{
                            err
                        }
                    }
                )


            })



    }
}

  resetPasswordWithEmail(email){
    return(dispatch)=> {
        if(email){
            dispatch(activity.startActivity("Sending reset  link to "+email))

      return  this.auth.sendPasswordResetWithEmail(email)
            .then(res => {
                //console.log('Check your inbox for further instructions')
                dispatch(activity.endActivity("Check your inbox for further instructions"))
              return dispatch({
                  type: "USER_RESET_PASSWORD",
                  status:"OK",
                  data:{
                      res
                  }
              })
          })
            .catch(err => {
                dispatch(activity.activityError(err.errorMessage||"UNKNOWN ERROR"));
              return dispatch({
                  type: "USER_RESET_PASSWORD",
                  status:"error",
                  data:{err}
              })
              //console.log('There was an error ')})


        })
    }
}
  }
oAuth(name,token){
    return (dispatch)=>{

        dispatch(activity.startActivity("Login using "+name))
      return  this.auth.signInWithProvider(name, token, '') // facebook need only access token.
            .then((user)=>{
             // console.log('User successfully logged in', user)
                dispatch(activity.endActivity("User successfully logged in "))
              dispatch({
                  type:"USER_LOGIN",
                  status:"OK",
                  data:{
                      user
                  }})
            }).catch(err=>{

              //console.log('User logged failed', err)
              dispatch(activity.activityError(err.errorMessage||"UNKNOWN ERROR"));
              dispatch({
                  type:"USER_LOGIN",
                  status:"error",
                  data:{
                      err
                  }})
          })
    }
}
create(email,password){
    return dispatch=>{
        if(email&&password){
            dispatch(activity.startActivity("Creating User "))
  return this.auth.createUserWithEmail(email, password)
        .then((user) => {
           // console.log('user created', user)
            dispatch(activity.endActivity("User Account Created "))
        dispatch({
            type:"USER_CREATED",
            status:"OK",
            data:{
                //user
            }
        })


        })
        .catch((err) => {
            //console.log('An error occurred', err);
            dispatch(activity.activityError(err.errorMessage||"UNKNOWN ERROR"))
        dispatch({
            type:"USER_CREATED",
            status:"error",
            data:{
                err
            }
        })
        })
        }
}
}


     showSignUp(data){
        return{
             type:"SHOW_SIGNUP",
             data:data
         }
     }
     showLogin(data){
         return{
             type:"SHOW_LOGIN",
             data:data
         }
     }
     showStart(data){
         return{
             type:"SHOW_START",
             data:data
         }
     }
     showLogout(data){

         return{
             type:"SHOW_lOGOUT",
             data:data
         }
     }
     showResetPassword(data){

         return{
             type:"SHOW_RESET_PASSWORD",
             data:data
         }
     }
}
export default new userActions()