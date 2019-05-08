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
        let res = [];
        action.data.forEach(function (item , index) {
            res.push({
                id : item.id,
                title : item.title,
                author : item.author.loginname,
                avatar : item.author.avatar_url,
                create_at : item.create_at,
                tab : item.tab
            });
        });
        return Object.assign({} , state , {
            [action.topic] : res
        });
        default : 
        return state;
    }
};
