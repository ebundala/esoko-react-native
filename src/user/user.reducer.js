/**
 * Created by ebundala on 2/24/2017.
 */




const INITIAL_STATE={
    isLoggedIn: false,
    hasSkippedLogin: false,
    sharedSchedule: null,
    id: null,
    name: null
}
export default function userReducer(state = INITIAL_STATE, action={type:""})
{
    switch (action.type){
        case "USER_LOGIN":
            console.log(action.type)
            return {
               ...state,
               isLoggedIn:true
                }
        case "USER_LOGOUT":
            console.log(action.type)
            return INITIAL_STATE
        case "USER_RESET_PASSWORD":
            console.log(action.type)
            return {...state}
        default :
            console.log(action.type)
        return state
    }

}