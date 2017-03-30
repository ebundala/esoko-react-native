/**
 * Created by ebundala on 3/22/2017.
 */

import {PRODUCTS_ACTIONS,initialState} from "./products.actions"



export default productsReducer=(state=initialState,action)=>{

    switch (action.type){
        case PRODUCTS_ACTIONS.GET:
            if(action.data)
            {
                //alert("ADD "+JSON.stringify(state))
               // let st=state
              //  st.push(action.data)
                return action.data||[] //{...state,products:}
            }


            return state
            break;
        case PRODUCTS_ACTIONS.ADD:
            if(action.data)
            {
                //alert("ADD "+JSON.stringify(state))
               let st=state
                st.push(action.data)
                return st||[] //{...state,products:}
            }
            return state
            break;
        case PRODUCTS_ACTIONS.DELETE:
            return state
            break;
        case PRODUCTS_ACTIONS.EDIT:
            return state
            break;
        case PRODUCTS_ACTIONS.ADD_BID:
            return state
            break;
        case PRODUCTS_ACTIONS.ADD_ORDER:
            return state
            break;
        case PRODUCTS_ACTIONS.REVIEW:
            return state
            break;
        case PRODUCTS_ACTIONS.START_CHAT:
            return state


            break;
        default:
            return state

    }
}