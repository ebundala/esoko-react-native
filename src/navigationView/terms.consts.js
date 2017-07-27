/**
 * Created by ebundala on 7/27/2017.
 */


import dataSchema from "../utils/dataSchema"

export const TERM_INITIAL_STATE= {
    categories:[],
    locations:[],
    apps:[]

};
export const TERMS_ACTIONS={
    ADD_TERMS:"eb_add_terms",
    TERM_CHANGED:"eb_change_terms",
    TERM_DELETED:"eb_delete_terms",
    GET_TERMS:"eb_get_terms"
};