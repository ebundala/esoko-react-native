/**
 * Created by ebundala on 5/11/2017.
 */

import {PRODUCT_FORM_ACTIONS,FORM_INITIAL_STATE} from "./product.formConsts"


export const onValueChange=(value)=>{

    return{
        type:PRODUCT_FORM_ACTIONS.VALUE_CHANGE,
        value:value
    }
}

export const onFormReset=(value)=>{

    return{
        type:PRODUCT_FORM_ACTIONS.VALUE_CHANGE,
        value:value
    }
}

export const onSubmit=(value)=>{

    return{
        type:PRODUCT_FORM_ACTIONS.VALUE_CHANGE,
        value:FORM_INITIAL_STATE
    }
}