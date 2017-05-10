/**
 * Created by ebundala on 2/24/2017.
 */
import { persistStore, autoRehydrate } from 'redux-persist'
import {applyMiddleware, createStore, compose} from 'redux';

import thunk from 'redux-thunk';
import screenTracker from './screenTracker/screenTracker';
import createLogger from 'redux-logger';
//import devTools from 'remote-redux-devtools';
//import {apiCallMiddleware} from './utils/api/apiCallMiddleware';
//import {clearBodyMiddleware} from './utils/api/clearBodyMiddleware';
import rootReducer from './rootReducer';

function configStore() {


const logger = createLogger();
//console.warn(INITIAL_STATE)
return createStore(rootReducer,
    compose(
    applyMiddleware(/*screenTracker,/*clearBodyMiddleware, apiCallMiddleware,*/ thunk/*, logger*/),
    autoRehydrate()
    )
);




}
export default configStore;





