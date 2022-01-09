import { handleActions } from 'redux-actions';
import { createAction } from '@reduxjs/toolkit';

export const setPage = createAction('QUIZ/SET_PAGE', ({ page }) => ({
    payload: page
}));
export const setAllPage = createAction('QUIZ/SET_ALL_PAGE', () => 1);

const initialState = {
    page: 0,
    allPage: 0
};

export default handleActions(
    {
        'QUIZ/SET_PAGE': (state, { payload }) => {
            console.log(payload);
            return {};
        },
        'QUIZ/SET_ALL_PAGE': (state) => ({
            ...state,
            page: 0,
            allPage: 1
        })
    },
    initialState
);
