import { getArticleListPage } from "../../../api/apis/article";
import { getAnthologyList } from "../../../api/apis/anthology";
import {useEffect, useState} from "react";
import {Button, Input, Pagination} from 'antd';
import { connect } from 'react-redux'


import './ArticleListPage.scss'
import {useNavigate} from "react-router-dom";

function mapStateToProps (state) {
    return {
        articleId: state.articleId
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setStoreArticleId (articleId) {
            dispatch({
                type: "set_article_id",
                value: articleId
            })
        }
    }
}

function ArticleListPage (props) {
    let [articleList, setArticleList] = useState([])
    let [anthologyList, setAnthologyList] = useState([])
    let [totalNum, setTotalNum] = useState(100)
    let [pageNum, setPageNum] = useState(1)
    let [pageSize, setPageSize] = useState(10)
    let [title, setTitle] = useState('')
    let [anthologyId, setAnthologyId] = useState(0)

    const navigate = useNavigate()


    const onSearch = (value) => {
        console.log(value);
        setTitle(value);
        getArticleListOuter(value, anthologyId).then(res => {
            setArticleList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const onPageNumChange = (pageNum) => {
        console.log('pageNum', pageNum);
        setPageNum(pageNum)
    };
    const onPageSizeChange = (pageSize) => {
        console.log('pageSize', pageSize)
        setPageSize(pageSize)
    }
    const getAnthologyListOuter = () => getAnthologyList()
    const getArticleListOuter = (title, anthologyId) => getArticleListPage({
        "title": title,
        "anthologyId": anthologyId,
        "pager": {
            "pageNum": pageNum,
            "pageSize": pageSize
        }
    })
    const clickAnthology = (anthologyId) => {
        setAnthologyId(anthologyId)
        getArticleListOuter(title, anthologyId).then(res => {
            setArticleList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const goToWrite =  (articleId = 0) => {
        props.setStoreArticleId(articleId)
        navigate('/article-write')
    }

    useEffect(() => {
        getAnthologyListOuter().then(res => {
            setAnthologyList(res.data)
            setTotalNum(res.totalNum)
            console.log("after set value ", anthologyList)
            return getArticleListOuter(title, anthologyId)
        }).then(res => {
            setArticleList(res.data)
        }).catch(err => {
            console.log(err);
        })
        // getArticleList({
        //     "title": title,
        //     "anthologyId": anthologyId,
        //     "pager": {
        //         "pageNum": pageNum,
        //         "pageSize": pageSize
        //     }
        // }).then(res => {
        //     console.log("article list res ", res);
        //     setArticleList(res.data)
        // }).catch(err => {
        //     console.log(err)
        // })
    }, [])


    return (
        <div className="article-list-page">
            <div className="search-form">
                <Input.Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
                <Button className="go-write-button" type="primary" shape="round" size="large" onClick={e => goToWrite(0)} style={{ background: "#ff8000", borderColor: "#ff8000" }}>
                    写文章
                </Button>
            </div>
            <div className="list-area">
                <div className="anthology-list">
                    {
                        anthologyList.map(item => {
                            console.log("item", item);
                            return <div className={["anthology-item", item.id === anthologyId ? "selected-anthology-item": ""].join(' ')} key={item.id} onClick={(e) => clickAnthology(item.id)} >{item.name}</div>
                        })
                    }
                </div>
                <div className="article-list">
                    {
                        articleList.map(item => {
                            return (
                                <div className="article-item" key={item.id} onClick={(e) => {goToWrite(item.id)}}>
                                    <div className="article-title">{item.title}</div>
                                    <div className="article-desc">{item.description}</div>
                                </div>
                            )
                        })
                    }
                    <Pagination className="pagination" showQuickJumper defaultCurrent={pageNum} pageSize={pageSize} total={totalNum} onChange={onPageNumChange} onShowSizeChange={onPageSizeChange} />
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListPage);