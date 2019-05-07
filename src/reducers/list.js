import { 
    REQUEST_SUCCESS
} from '../actions/list';
export function postByTopic (state = {
    all : [],
    good : [],
    share : [],
    ask : [],
    job : []
} , action) {
    switch (action.type) {
        case REQUEST_SUCCESS :
        return Object.assign({} , state , {
            [action.topic] : action.data
        });
        default : 
        return state;
    }
};
