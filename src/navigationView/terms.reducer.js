/**
 * Created by ebundala on 6/12/2017.
 */
import {TERMS_ACTIONS,TERM_INITIAL_STATE} from "./terms.consts"

import {REHYDRATE} from 'redux-persist/constants'

export default termsReducer=(state=TERM_INITIAL_STATE,action)=>{

    switch (action.type)
    {
        case TERMS_ACTIONS.GET_TERMS:
            //debugger;
            if(action.value.hasOwnProperty("name")){
                let newState={}
                newState[action.value.name]=action.value.value||[];
               return state={...state,...newState}
            }
            return state;
            break;
        case TERMS_ACTIONS.ADD_TERMS:
        case TERMS_ACTIONS.TERM_CHANGED:
        case TERMS_ACTIONS.TERM_DELETED:

        default:
            return state;
        //console.log("catergo",state)

    }
}