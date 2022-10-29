import request from "../request";

export const getArticleList = data => request({
    url: '/article/get-all-article-list',
    method: 'post',
    data
})

// export default {
//     getArticleList
// }
