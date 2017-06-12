/**
 * Created by ebundala on 6/12/2017.
 */
import {CATEGORY_ACTIONS,initialState} from "./categories.actions"

import {REHYDRATE} from 'redux-persist/constants'

export default categoriesReducer=(state=initialState,action)=>{

    switch (action.type){

        default:
            return state
        //console.log("catergo",state)

    }
}