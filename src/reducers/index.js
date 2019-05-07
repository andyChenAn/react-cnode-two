import { combineReducers } from 'redux';
function reducer (state = 0 , action) {
    switch (action.type) {
        case 'INCREMENT' : 
        return state + 1;
        case 'DECREMENT' : 
        return state - 1;
        default :
        return state;
    }
};
const rootReducer = combineReducers({
    selectedTopic : selectedTopicReducer
})
export default reducer;