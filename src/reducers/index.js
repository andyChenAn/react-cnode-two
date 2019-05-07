import { combineReducers } from 'redux';
import { postByTopic } from './list';
import { SELECTED_TOPIC } from '../actions/index';
import { 
    REQUEST_START , 
    REQUEST_SUCCESS , 
    REQUEST_FAIL 
} from '../actions/list';
// function reducer (state = 0 , action) {
//     switch (action.type) {
//         case 'INCREMENT' : 
//         return state + 1;
//         case 'DECREMENT' : 
//         return state - 1;
//         default :
//         return state;
//     }
// };

function selectedTopic (state = 'all' , action) {
    switch (action.type) {
        case SELECTED_TOPIC :
        return action.topic;
        default :
        return state;
    }
};

function isFetching (state = false , action) {
    switch (action.type) {
        case REQUEST_START :
        return true;
        case REQUEST_SUCCESS :
        case REQUEST_FAIL :
        return false;
        default : 
        return state;
    }
};

function error (state = '' , action) {
    switch (action.type) {
        case REQUEST_FAIL :
        return action.error;
        default :
        return state;
    }
};

const rootReducer = combineReducers({
    postByTopic,
    selectedTopic,
    isFetching,
    error
});
export default rootReducer;