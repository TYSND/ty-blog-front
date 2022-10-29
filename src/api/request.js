import axios from 'axios'
import { notification } from 'antd';

// const baseURL = 'http://192.168.31.128:8080/sj'
const baseURL = 'http://localhost:8081/ty-home/api'


const service = axios.create({
    baseURL,
    timeout: 0,
    method: 'post'
})

service.interceptors.request.use(config => {
    let token = localStorage.getItem('ty-blog-token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
})


service.interceptors.response.use(response => {
    // if (response.headers['refresh_token']) {
    //     localStorage.setItem('hongsheng-token', response.headers['refresh_token'])
    //     // localStorage.setItem('token', response.headers['refresh_token'])
    // }
    let data = response.data
    console.log(data)
    // console.log(typeof data)
    if (data.size || typeof data === 'string') {
        return data
    }
    if (data.code === "200") {
        return response.data.data
    } else if (data.code === "401" ) {
        notification['warning']({
            message: '提示',
            description: data.msg
        });
        // history.push("/login");
        window.location.hash = '/login'
        // alert(data.msg);
        // Notification.warning({ title: '提示', message: data.msg })
        // return Promise.reject(new Error(data.msg))
    } else if (data.code === "400" || data.code === "-1") {
        notification['warning']({
            message: '提示',
            description: data.msg
        });
        return Promise.reject(new Error(data.msg))
        // alert(data.msg);
    } else {
        notification['warning']({
            message: '提示',
            description: '登录凭证过期，请重新登录'
        });
        // alert('登录凭证过期，请重新登录');
        localStorage.clear()
        // router.push('/login')
        return Promise.reject(new Error('登录凭证过期，请重新登录'))
    }
}, error => {
    if (error.response && error.response.status === "509") {
        let html = error.response.data
        let verifyWindow = window.open('', '_blank', 'height=400,width=560')
        verifyWindow.document.write(html)
        verifyWindow.document.getElementById('baseUrl').value = baseURL
    } else {
        notification['warning']({
            message: '提示',
            description: '请求超时或服务器错误'
        });
        // alert('请求超时或服务器错误');
        // Notification.warning({ title: '提示', message: '请求超时或服务器错误' })
        return Promise.reject(new Error('请求超时或服务器错误'))
    }
})

export default service
