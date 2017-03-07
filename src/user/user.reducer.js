/**
 * Created by ebundala on 2/24/2017.
 */


import INITIAL_STATE from '../initialState'


export default function userReducer(state= INITIAL_STATE.user, action)
{
    switch (action.type){
        case "USER_CREATED":
            // console.log(action.type);
            if(action.status==="OK"){


                let user=action.data;
                return {
            ...state,
                    user
            }
    }
    return state
        case "USER_LOGIN":
           // console.log(action.type);
            if(action.status==="OK"){

            return {
               ...state,
                showStart:false,
                showLogin:false,
                showSignUp:false,
                showLogout:true,
                }
             }
             else
    return state;
        case "USER_LOGOUT":
           // console.log(action.type)
    if(action.status==="OK"){

        return {
            ...state,
            showStart:true,
            showLogin:false,
            showSignUp:false,
            showLogout:false,
        }
    }
    else
    return state
        case "USER_RESET_PASSWORD":
            //console.log(action.type)
            return {...state}
        case "SHOW_LOGIN":
            return{
                ...state,
                showStart:false,
                showLogin:true,
                showSignUp:false,
                showLogout:false,
                showResetPass:false,
                showResetMail:false
            }
        case "SHOW_LOGOUT":
            return{
                ...state,
                showStart:false,
                showLogin:false,
                showSignUp:false,
                showLogout:true,
                showResetPass:false,
                showResetMail:false

            }
        case "SHOW_SIGNUP":
            return{
                ...state,
                showStart:false,
                showLogin:false,
                showSignUp:true,
                showLogout:false,
                showResetPass:false,
                showResetMail:true
            }
        case "SHOW_START":
            return{
                ...state,
                showStart:true,
                showLogin:false,
                showSignUp:false,
                showLogout:false,
                showResetPass:false,
                showResetMail:true
            }
        case "SHOW_RESET_PASSWORD":
            return{
                ...state,
                showStart:false,
                showLogin:false,
                showSignUp:false,
                showLogout:false,
                showResetPass:true,
                showResetMail:false
            }
        case "SHOW_RESET_EMAIL":
            return{
                ...state,
                showStart:false,
                showLogin:false,
                showSignUp:false,
                showLogout:false,
                showResetPass:false,
                showResetMail:true
            }
        default :
            console.log(action.type)
        return state
    }

}