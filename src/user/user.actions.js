/**
 * Created by ebundala on 2/24/2017.
 */



export const login=user=>{
    return(dispatch)=>
    {
    return dispatch({
        type:"USER_LOGIN",
        data:user
    })
    }
}

export const logout=()=>{
    return(dispatch)=>
    {
        return dispatch(
    {

        type:"USER_LOGOUT",
        data:null
    }
        )
    }
}

export const resetPassword=()=>{
    return(dispatch)=> {
        return dispatch({
            type: "USER_RESET_PASSWORD"
        })
    }
}