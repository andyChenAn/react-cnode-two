import { createStore , applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';

const asyncFetch = ({dispatch , getState}) => next => action => {
    let {
        types,
        shouldCallApi = () => true,
        callApi,
        payload = {},
        success = () => {},
        fail = () => {}
    } = action;
    // 如果没有types，那么就跳过这个中间件
    if (!types) {
        return next(action);
    };
    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
        throw new Error('Expected an array of three string types.');
    };
    if (typeof callApi !== 'function') {
        throw new Error('callApi must be function');
    };
    if (!shouldCallApi(getState())) {
        return;
    }
    let [startType , receiveType , failType] = types;
    dispatch(Object.assign({} , payload , {
        type : startType
    }));
    callApi().then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({
                status : res.status,
                statusText : res.statusText
            });
        }
    }).then(json => {
        dispatch(Object.assign({} , payload , {
            type : receiveType,
            data : json.data
        }));
        success.call(this , payload);
    }).catch(err => {
        dispatch(Object.assign({} , payload , {
            type : failType,
            error : err
        }));
        fail.call(this , err);
    });
}

const configureStore = function () {
    let middlewares = [];
    middlewares.push(thunk);
    middlewares.push(asyncFetch);
    const store = createStore(rootReducer , applyMiddleware(...middlewares));
    return store;
};
export default configureStore;