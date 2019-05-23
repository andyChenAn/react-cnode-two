# react版本的cnode应用（第二版）
这是第二个版本的react版本的cnode应用，相比较第一版来说，这一个版本的改动主要是：
- 1、store结构上

目前的结构为：

![1.png](https://github.com/andyChenAn/react-cnode-two/raw/master/images/1.png)

- 2、容器组件负责处理数据，展示组件负责渲染，逻辑变得更加清晰。

- 3、增加测试代码
- 4、编写中间件函数，用于处理异步action

```javascript
export const asyncFetch = ({dispatch , getState}) => next => action => {
    let {
        types,
        shouldCallApi = () => true,
        callApi,
        payload = {}
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
```
## 用法

```
git clone https://github.com/andyChenAn/react-cnode-two.git
cd react-cnode-two
npm install
npm start
```
## 测试
```
npm test
```