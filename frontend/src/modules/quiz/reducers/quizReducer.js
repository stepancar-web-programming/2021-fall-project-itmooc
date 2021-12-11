import { handleActions } from 'redux-actions';
import { createAction } from '@reduxjs/toolkit';

export const setPage = createAction('QUIZ/SET_PAGE', () => 1);
export const setAllPage = createAction('QUIZ/SET_ALL_PAGE', () => 1);

const initialState = {
    page: 0,
    allPage: 0
};

export default handleActions(
    {
        'QUIZ/SET_PAGE': (state) => ({
            ...state,
            page: 1
        }),
        'QUIZ/SET_ALL_PAGE': (state) => ({
            ...state,
            page: 0,
            allPage: 1
        })
    },
    initialState
);
