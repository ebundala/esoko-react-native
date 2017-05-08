/**
 * Created by ebundala on 2/24/2017.
 */







const INITIAL_STATE ={
      authenticated: false,
    isNewUser:true,
         user:
         {
             anonymous: false,
             emailVerified: false,
             providerId:'',
             uid:'',
             token:'',
             email:''

         }
}

import {USER_ACTIONS} from "./user.actions"

export default function userReducer(state= INITIAL_STATE, action)
{
    switch (action.type){
        case USER_ACTIONS.CREATED:
            if(action.status==="OK"){

                return {
                    ...INITIAL_STATE,
                    ...action.data,
                    isNewUser:false
                }
            }
            else
                return INITIAL_STATE;
        case USER_ACTIONS.LOGIN:
           // console.log(action.type);
            if(action.status==="OK"){

            return {
               ...INITIAL_STATE,
                ...action.data,
                isNewUser:false
                }
             }
             else
   return INITIAL_STATE;
        case USER_ACTIONS.LOGOUT:
           // console.log(action.type)
    if(action.status==="OK"){

        return {
            ...INITIAL_STATE,
            isNewUser:false
        }
    }
    else if(action.status==="Initial"){
        return {
            ...INITIAL_STATE,
            isNewUser:true
        }
    }
    else
    return state;
        case USER_ACTIONS.RESETPASSWORD:
            //console.log(action.type)
            return {...state}


        default :
           // console.log(action.type)

        return state
    }

}