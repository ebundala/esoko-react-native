/**
 * Created by ebundala on 2/24/2017.
 */
import { combineReducers } from 'redux';
import user from './user/user.reducer';
import activity from './activityIndicator/activityIndicatorReducers';
import {statusReducers} from "./statuses/components/statuses"
export default combineReducers({
    user,
    activity,
    notifications:statusReducers

});