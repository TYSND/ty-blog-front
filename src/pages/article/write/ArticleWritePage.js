import { connect } from "react-redux"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import {Button, Input} from 'antd';

import "./ArticleWritePage.scss"
import {useEffect, useState} from "react";

import { getArticleListPage, getArticleListAll, getArticleById } from "../../../api/apis/article";
import { getAnthologyList } from "../../../api/apis/anthology";
import { uploadPicture } from "../../../api/apis/picture";

const mapStateToProps = (state) => {
    return {
        articleId: state.articleId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setStoreArticleId (articleId) {
            dispatch({
                type: "set_article_id",
                value: articleId
            })
        }
    }
}
const mdParser = new MarkdownIt(/* Markdown-it options */);


const handleImageUpload = (file, callback) => {
    // http://localhost:8081/ty-home/api/picture/get-picture?md5=55b9c3311de6b78645062a47f23ee8f6
    // return new Promise((resolve, reject) => {
    //     resolve('http://localhost:8081/ty-home/api/picture/get-picture?md5=55b9c3311de6b78645062a47f23ee8f6');
    // });
    console.log(file);
    let formData = new FormData();
    formData.append('picture', file);
    return uploadPicture(formData).then(res => {
        console.log("图片的md5:", res.data)
        return new Promise((resolve, reject) => {
            resolve(`http://localhost:8081/ty-home/api/picture/get-picture?md5=${res.data}`);
        });
    }).catch(err => {
        console.log(err);
    })
}
const onCustomImageUpload = (event) => {
    console.log('onCustomImageUpload', event);
    return new Promise((resolve, reject) => {
        const result = window.prompt('Please enter image url here...');
        resolve({ url: result });
        // custom confirm message pseudo code
        // YourCustomDialog.open(() => {
        //   setTimeout(() => {
        //     // setTimeout 模拟oss异步上传图片
        //     // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
        //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
        //     resolve({url: url, name: 'pic'})
        //   }, 1000)
        // })
    });
};

function ArticleWritePage (props) {
    const [anthologyList, setAnthologyList] = useState([])
    const [articleList, setArticleList] = useState([])
    const [selectedAnthologyId, setSelectedAnthologyId] = useState(1)
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [articleTitle, setArticleTitle] = useState("")
    const [articleContent, setArticleContent] = useState("")


    useEffect(() => {
        // 获取anthologyList
        getAnthologyList().then(res => {
            setAnthologyList(res.data)
        }).catch(err => {
            console.log(err)
        })
        // 查看store中是否有存储articleId，若有，则先请求articleDetail；否则请求articleList
        if (props.articleId != 0) {
            // searchArticle()
            getArticleById({
                articleId: props.articleId
            }).then(res => {
                setSelectedArticle(res.data)
            })
        } else {
            setSelectedAnthologyId(1);
            // store中没有articleId，则请求articleList
            getArticleListAll({
                anthologyId: 1
            }).then(res => {
                setArticleList(res.data)
                if (res.data.length > 0) {
                    // 默认文集有文章
                    setSelectedArticle(res.data[0])
                    getArticleById({
                        articleId: res.data[0].id
                    }).then(res => {
                        setSelectedArticle(res.data)
                    })
                } else {
                    setSelectedArticle(null)
                }
            })
        }

    }, [])

    const onChangeArticleTitle = (e) => {
        console.log(e.target.value)
        setArticleTitle(e.target.value)
    }
    // Finish!
    const handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        setArticleContent(text)
    }


    return (
        <div className="article-write-page">
            <div className="anthology-list">
                {
                    anthologyList.map(item => (
                        <div className="anthology-item" key={item.id}>
                            <div className="anthology-name">{item.name}</div>
                            div.
                        </div>
                    ))
                }
            </div>
            <div className="article-list">
                {
                    articleList.map(item => (
                        <div className="article-item" key={item.id}>{item.title}</div>
                    ))
                }
            </div>
            <div className="write-area">
                <div className="title-button-row">
                    <Input onChange={onChangeArticleTitle} defaultValue={articleTitle}/>
                    <Button>保存</Button>
                    <Button>发布</Button>
                </div>
                <MdEditor
                    style={{ height: '500px' }}
                    value={articleContent}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    onImageUpload={handleImageUpload}
                    // onCustomImageUpload={onCustomImageUpload}
                />
            </div>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(ArticleWritePage);