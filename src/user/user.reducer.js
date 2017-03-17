/**
 * Created by ebundala on 2/24/2017.
 */


const INITIAL_STATE ={
    UID:789098090,
    isNewUser:true,
    displayName:"Anonymous user",
    photoUrl:require("./images/background.png"),
    isAuthenticated:false,
}
import {USER_ACTIONS} from "./user.actions"

export default function userReducer(state= INITIAL_STATE, action)
{
    switch (action.type){
        case USER_ACTIONS.CREATED:
        case USER_ACTIONS.LOGIN:
           // console.log(action.type);
            if(action.status==="OK"){

            return {
               ...state,
                isAuthenticated:true
                }
             }
             else
   return state;
        case USER_ACTIONS.LOGOUT:
           // console.log(action.type)
   // if(action.status==="OK"){

        return {
            ...state,
            isAuthenticated:false
        }
    //}
   // else
   // return state;
        case USER_ACTIONS.RESETPASSWORD:
            //console.log(action.type)
            return {...state}


        default :
           // console.log(action.type)

        return state
    }

}