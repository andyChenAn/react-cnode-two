import { createStore , applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import { asyncFetch } from '../utils';


const configureStore = function () {
    let middlewares = [];
    middlewares.push(thunk);
    middlewares.push(asyncFetch);
    const store = createStore(rootReducer , applyMiddleware(...middlewares));
    return store;
};
export default configureStore;