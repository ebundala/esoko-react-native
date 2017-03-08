/**
 * Created by ebundala on 3/8/2017.
 */

 export function startActivity(data) {
     return {
         type:"START_LOADING",
         data:data
     }

}
export function activityError(data) {
    return {
        type:"ERROR_LOADING",
        data:data
    }

}
export function endActivity(data) {
    return {
        type:"END_LOADING",
        data:data
    }

}