/**
 * Created by ebundala on 2/24/2017.
 */




const INITIAL_STATE={
    user:{
        isAuthenticated:false
    }
}
export default function userReducer(state= INITIAL_STATE, action={type:""})
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


            let user=action.data;
            return {
               ...state,
               user
                }
             }
    return state
        case "USER_LOGOUT":
           // console.log(action.type)
    if(action.status==="OK"){
        return INITIAL_STATE
    }
    return state
        case "USER_RESET_PASSWORD":
            //console.log(action.type)
            return {...state}
        default :
            console.log(action.type)
        return state
    }

}