import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import { JoinPage, Page404, SignInPage, SignUpPage, QuizPage, HomePage } from './pages';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <LogoOnlyLayout />,
            children: [
                { path: '', element: <JoinPage /> },
                { path: 'sign-in', element: <SignInPage /> },
                { path: 'sign-up', element: <SignUpPage /> },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        {
            path: '/quiz',
            children: [{ path: '', element: <QuizPage /> }]
        },
        {
            path: '/home',
            children: [{ path: '', element: <HomePage /> }]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
