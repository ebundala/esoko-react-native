/**
 * Created by ebundala on 5/11/2017.
 */

import {PRODUCT_FORM_ACTIONS,FORM_INITIAL_STATE} from "./productForm.actions"


export default function productFormReducer(state=FORM_INITIAL_STATE,action) {

    switch (action.type){
        case PRODUCT_FORM_ACTIONS.FORM_CLEAR:
            return FORM_INITIAL_STATE;
            break;
        case PRODUCT_FORM_ACTIONS.VALUE_CHANGE:
            return {...state,...action.value};
            break;
        case PRODUCT_FORM_ACTIONS.FORM_SUBMIT:
            return FORM_INITIAL_STATE;
            break;
        default:
            return state;

    }

}