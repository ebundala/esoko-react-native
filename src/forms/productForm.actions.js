/**
 * Created by ebundala on 5/11/2017.
 */

export const PRODUCT_FORM_ACTIONS={
    VALUE_CHANGE:"EB_FORM_VALUE_CHANGE",
    FORM_SUBMIT:"EB_FORM_SUBMIT",
    FORM_CLEAR:"EB_FORM_CLEAR"
}

export const FORM_INITIAL_STATE={

}


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