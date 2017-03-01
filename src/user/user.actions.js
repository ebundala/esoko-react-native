/**
 * Created by ebundala on 2/24/2017.
 */

import userUtil from "../utils/user"

 class userActions extends userUtil {
  login(email,password){
    return (dispatch)=>
    {
        if(email&&password)
        return this.auth.signInWithEmail(email, password)
        .then((user) => {
            console.log('User successfully logged in', user)
                dispatch({
                    type:"USER_LOGIN",
                    status:"OK",
                    data:{
                        user
                    }})
        })
        .catch((err) => {
            console.error('User signin error', err);
                dispatch({
                    type:"USER_LOGIN",
                    status:"error",
                    data:{
                        err
                    }})
        })


    }
}

  logout(){
    return(dispatch)=>
    {
        return this.auth.signOut()
        .then(res =>{
                console.log('You have been signed out')
                dispatch(
                    {
                        type:"USER_LOGOUT",
                        status:"OK"
                        //data:null
                    }
                )
            })
        .catch(err =>{ console.error('Uh oh... something weird happened')
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
        if(email)
      return  this.auth.sendPasswordResetWithEmail(email)
            .then(res => {console.log('Check your inbox for further instructions')
              return dispatch({
                  type: "USER_RESET_PASSWORD",
                  status:"OK",
                  data:{
                      res
                  }
              })
          })
            .catch(err => {

              return dispatch({
                  type: "USER_RESET_PASSWORD",
                  status:"error",
                  data:{err}
              })
              console.error('There was an error ')})



    }
}
oAuth(name,token){
    return (dispatch)=>{


      return  this.auth.signInWithProvider(name, token, '') // facebook need only access token.
            .then((user)=>{
              console.log('User successfully logged in', user)
              dispatch({
                  type:"USER_LOGIN",
                  status:"OK",
                  data:{
                      user
                  }})
            }).catch(err=>{
              console.log('User logged failed', err)
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
        if(email&&password)
  return this.auth.createUserWithEmail(email, password)
        .then((user) => {
            console.log('user created', user)
        dispatch({
            type:"USER_CREATED",
            status:"OK",
            data:{
                user
            }
        })


        })
        .catch((err) => {
            console.error('An error occurred', err);
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
export default new userActions()