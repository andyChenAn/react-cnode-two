export const storage = {
    get (name) {
        return window.localStorage.getItem(name);
    },
    set (name , value) {
        return window.localStorage.setItem(name , value);
    },
    remove (name) {
        return window.localStorage.removeItem(name);
    },
    clear () {
        return window.localStorage.clear();
    }
};

export const asyncFetch = ({dispatch , getState}) => next => action => {
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
    return callApi().then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({
                status : res.status,
                statusText : res.statusText
            });
        }
    }).then(json => {
        return dispatch(Object.assign({} , payload , {
            type : receiveType,
            data : json.data ? json.data : json
        }));
    }).catch(err => {
        return dispatch(Object.assign({} , payload , {
            type : failType,
            error : err
        }));
    });
};
