/**
 * Created by ebundala on 2/24/2017.
 */
import { persistStore, autoRehydrate } from 'redux-persist'
import {applyMiddleware, createStore, compose} from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
//import devTools from 'remote-redux-devtools';
//import {apiCallMiddleware} from './utils/api/apiCallMiddleware';
//import {clearBodyMiddleware} from './utils/api/clearBodyMiddleware';
import rootReducer from './rootReducer';

function configStore() {


const logger = createLogger();
//console.warn(INITIAL_STATE)
const store = createStore(rootReducer,
    compose(
    applyMiddleware(/*clearBodyMiddleware, apiCallMiddleware,*/ thunk, /*logger*/),
    autoRehydrate()
    )
);
    {}
persistStore(store, {storage: AsyncStorage,blacklist: ['activity',"nav"]});
return store
}
export default configStore;





