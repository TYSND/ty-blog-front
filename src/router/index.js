import React from "react";
import { Navigate } from 'react-router-dom';

const HomePage = React.lazy(() => import('../pages/home/HomePage'))
const LoginPage = React.lazy(() => import('../pages/login/LoginPage'))
const ArticleListPage = React.lazy(() => import('../pages/article/list/ArticleListPage'))
const ArticleWritePage = React.lazy(() => import('../pages/article/write/ArticleWritePage'))

const routes = [
    {
        path: '/',
        element: <Navigate to="/article-list" />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/article-list',
        element: <ArticleListPage />
    },
    {
        path: '/article-write',
        element: <ArticleWritePage />
    }
]

export default routes;