import { createStore , applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
const configureStore = function () {
    let middlewares = [];
    middlewares.push(thunk);
    const store = createStore(rootReducer , applyMiddleware(...middlewares));
    return store;
};
export default configureStore;