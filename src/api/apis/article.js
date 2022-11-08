import request from "../request";

export const getArticleListPage = data => request({
    url: '/article/get-all-article-list-page',
    method: 'post',
    data
})

export const getArticleListAll = data => request({
    url: '/article/get-all-article-list-all',
    method: 'post',
    data
})
export const getArticleById = params => request({
    url: '/article/get-article-by-id',
    method: 'get',
    params
})
// export default {
//     getArticleList
// }
