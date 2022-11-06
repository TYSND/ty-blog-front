import { routes, searchRouteDetail } from './index'
import { useRoutes, useNavigate } from 'react-router-dom'
import {useEffect} from "react";
import { useLocation } from 'react-router-dom'
// import useNavigate from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken
    }
}


function RouterGuard (props) {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        console.log("cur router", location.pathname)
        if (searchRouteDetail(location.pathname).auth && !props.accessToken) {
            // 当前页面需要验证，且本地没有token，则跳转登录页
            navigate('/login')
        }
        if (location.pathname === '/login' && props.accessToken) {
            // 当前在登录页，但本地有token，则跳转article-list
            navigate('/article-list')
        }
    }, [location, navigate, props.accessToken])

    const routeElement = useRoutes(routes)
    return (
        <div>
            {routeElement}
        </div>

    )
}

export default connect(mapStateToProps, null)(RouterGuard);