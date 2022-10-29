import { getArticleList } from "../../../api/apis/article";

function ArticleListPage () {

    getArticleList({
        "pageNum": 1,
        "pageSize": 10
    })


    return (
        <div>
            文章列表
        </div>
    )
}

export default ArticleListPage;