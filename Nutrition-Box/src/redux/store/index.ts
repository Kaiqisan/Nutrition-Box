import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const middleWares = [
    thunkMiddleware
];

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
    middleWares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
    applyMiddleware(...middleWares),
    // other store enhancers if any
);

export default function configStore() {
    return createStore(rootReducer, enhancer)
}
