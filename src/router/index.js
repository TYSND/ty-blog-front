import React from "react";
import { Navigate } from 'react-router-dom';

// const HomePage = React.lazy(() => import('../pages/home/HomePage'))
const LoginPage = React.lazy(() => import('../pages/login/LoginPage'))
const ArticleListPage = React.lazy(() => import('../pages/article/list/ArticleListPage'))
const ArticleWritePage = React.lazy(() => import('../pages/article/write/ArticleWritePage'))

export const routes = [
    {
        path: '/',
        auth: false,
        element: <Navigate to="/article-list" />
    },
    {
        path: '/login',
        auth: false,
        element: <LoginPage />
    },
    {
        path: '/article-list',
        auth: true,
        element: <ArticleListPage />
    },
    {
        path: '/article-write',
        auth: true,
        element: <ArticleWritePage />
    }
]

export function searchRouteDetail (routeArr, path) {
    for (let item of routeArr) {
        if (item.path === path) {
            return item
        }
        if (item.children) {
            let res = searchRouteDetail(item.children, path)
            if (res) {
                return res
            }
        }
    }
    return null;
}


// export default routes;