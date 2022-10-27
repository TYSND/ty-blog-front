import request from "../request";

const getArticleList = data => request({
    url: '/article/get-all-article-list',
    method: 'post',
    data
})

export default {
    getArticleList
}
