/**
 * Created by ebundala on 3/8/2017.
 */
const INITIAL_STATE={
    isLoading:false,
    isError:false,
    message:""
}

export default function activityReducer(state=INITIAL_STATE,action) {
    switch (action.type){
        case "START_LOADING":
            return{
                ...state,
                isLoading:true,
                isError:false,
                message:action.data
            }
        case "END_LOADING":
            return{
                ...state,
                isLoading:false,
                isError:false,
                message:action.data
            }
        case "ERROR_LOADING":
            return{
                ...state,
                isLoading:true,
                isError:true,
                message:action.data
            }
        default:
            return state
    }

}