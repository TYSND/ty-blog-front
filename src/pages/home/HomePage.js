import articleApi from '../../api/apis/article'
function HomePage (props) {
    let list = []
    articleApi.getArticleList({
        pageNum: 1,
        pageSize: 10
    }).then(res => {
        console.log("res: ", res);
    });
    return (
        <div>
            首页
        </div>
    )
}

export default HomePage;