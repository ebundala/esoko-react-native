/**
 * Created by ebundala on 2/24/2017.
 */
import {combineReducers} from 'redux';
import user from './user/user.reducer';
import activity from './activityIndicator/activityIndicatorReducers';
import {statusReducers} from "./statuses/components/statuses";
import  {routeReducers, oauthRouteReducers} from "./app";
import productsReducer from "./products/products.reducer";
import productForm from "./forms/productForm.reducer";
import termsReducer from "./navigationView/terms.reducer";
export default combineReducers({
    user,
    activity,
    notifications: statusReducers,
    nav: routeReducers,
    navOauth: oauthRouteReducers,
    products:productsReducer,
    forms:productForm,
    terms:termsReducer
});