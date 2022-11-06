import { createStore } from 'redux';

let defaultState = {
    accessToken: localStorage.getItem('ty-blog-token') ? localStorage.getItem('ty-blog-token') : '',
    articleId: localStorage.getItem('ty_blog_article-id') ? localStorage.getItem('ty_blog_article-id') : 0
}


let reducers = (state = defaultState, action) => {
    switch (action.type) {
        case "set_access_token":
            console.log("set_access_token")
            localStorage.setItem("ty-blog-token", action.value)
            return {
                accessToken: action.value
            }
        case "set_article_id":
            console.log("set_article_id")
            localStorage.setItem("ty_blog_article-id", action.value)
            return {
                articleId: action.value
            }
        default:
            return state
    }
}

const store = createStore(reducers);
export default store;