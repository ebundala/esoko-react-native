/**
 * Created by ebundala on 2/24/2017.
 */

import userUtil from "../utils/user"
import * as activity from "../activityIndicator/activitIndicatorAction"

export const USER_ACTIONS={
    LOGIN:"USER_LOGIN",
    LOGOUT:"USER_LOGOUT",
    RESETPASSWORD:"USER_RESET_PASSWORD",
    CREATED:"USER_CREATED"

}

 class userActions extends userUtil {
  login(email,password,navigate,setPage){
    return (dispatch)=>
    {
        if(email&&password){
            dispatch(activity.startActivity("Login using "+email))

        return this.auth.signInWithEmail(email, password)
        .then((user) => {
            console.log('User successfully logged in\n', user);
            dispatch(activity.endActivity("User successfully logged in "+email))
                dispatch({
                    type:USER_ACTIONS.LOGIN,
                    status:"OK",
                    data:{
                        ...user
                    }})
            navigate("account")
            if(setPage){
                setPage("app")
            }
        })
        .catch((err) => {
           // alert('User signin error', err.message);
            dispatch(activity.activityError(err.errorMessage||'UNKNOWN ERROR'))
                dispatch({
                    type:USER_ACTIONS.LOGIN,
                    status:"error",
                    data:{
                        err
                    }})
        })

        }
    }
}
  logout(navigate,setPage){
    return(dispatch)=>
    {
        return this.auth.signOut()
        .then(res =>{
                console.log('You have been signed out\n',res)
                dispatch(
                    {
                        type:USER_ACTIONS.LOGOUT,
                        status:"OK"
                        //data:null
                    }
                )
            navigate("start")
            })
        .catch(err =>{
                //console.error('Uh oh... something weird happened')
                dispatch(
                    {
                        type:USER_ACTIONS.LOGOUT,
                        status:"error",
                        data:{
                            err
                        }
                    }
                )


            })



    }
}
  resetPasswordWithEmail(email,navigate,setPage){
    return(dispatch)=> {
        if(email){
            dispatch(activity.startActivity("Sending reset  link to "+email))

      return  this.auth.sendPasswordResetWithEmail(email)
            .then(res => {
                //console.log('Check your inbox for further instructions')
                dispatch(activity.endActivity("Check your inbox for further instructions"))
              return dispatch({
                  type: USER_ACTIONS.RESETPASSWORD,
                  status:"OK",
                  data:{
                      res
                  }
              })
          })
            .catch(err => {
                dispatch(activity.activityError(err.errorMessage||"UNKNOWN ERROR"));
              return dispatch({
                  type: USER_ACTIONS.RESETPASSWORD,
                  status:"error",
                  data:{err}
              })
              //console.log('There was an error ')})


        })
    }
}
  }
  oAuth(name,token,navigate,setPage){
    return (dispatch)=>{

        dispatch(activity.startActivity("Login using "+name))
      return  this.auth.signInWithProvider(name, token, '') // facebook need only access token.
            .then((user)=>{
             // console.log('User successfully logged in', user)
                dispatch(activity.endActivity("User successfully logged in "))
              dispatch({
                  type:USER_ACTIONS.LOGIN,
                  status:"OK",
                  data:{
                      user
                  }})
                navigate("account");
               // navigate("app")
                if(setPage){
                    setPage("app")
                }

            }).catch(err=>{

              //console.log('User logged failed', err)
              dispatch(activity.activityError(err.errorMessage||"UNKNOWN ERROR"));
              dispatch({
                  type:USER_ACTIONS.LOGIN,
                  status:"error",
                  data:{
                      err
                  }})
          })
    }
}
  create(email,password,navigate,setPage){
    return dispatch=>{
        if(email&&password){
            dispatch(activity.startActivity("Creating User "))
  return this.auth.createUserWithEmail(email, password)
        .then((user) => {
            console.log('user created', user)

            //if(!!user.authenticated&&!!user.user){

            return  this.database.ref("/users/"+user.user.uid).set({type:"normal"}).then(res=>{

                    console.log("user profile created\n",res)

                    dispatch(activity.endActivity("User Account Created "))
                    dispatch({
                        type:USER_ACTIONS.CREATED,
                        status:"OK",
                        data:{
                            ...user
                        }
                    })
                    navigate("account")
                    if(setPage){
                        setPage("app")
                    }
                })
           // }




        })
        .catch((err) => {
            //console.log('An error occurred', err);
            dispatch(activity.activityError(err.errorMessage||"UNKNOWN ERROR"))
        dispatch({
            type:USER_ACTIONS.CREATED,
            status:"error",
            data:{
                err
            }
        })
        })
        }
}
}



}
export default new userActions()