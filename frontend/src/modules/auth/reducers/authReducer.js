import { handleActions } from 'redux-actions';
import axios from 'axios';

import { createAction } from '@reduxjs/toolkit';
import { LOGIN_URL, SIGN_UP_URL } from '../constants';
import { asyncAction } from '../../core/utils/actions';

export const signIn = asyncAction('AUTH/LOGIN', ({ login, password }) => axios.post(LOGIN_URL, { login, password }));

export const signUp = asyncAction('AUTH/SIGN_UP', ({ login, password, birthday, gender }) => {
    console.log(login, password, birthday, gender);
    return axios.post(SIGN_UP_URL, { login, password, birthday, gender });
});

export const resetState = createAction('AUTH/RESET_STATE');

const initialState = {
    loading: false,
    user: null,
    response: null,
    error: false
};

export default handleActions(
    {
        [signIn.START]: () => ({
            loading: true,
            user: null,
            response: null,
            error: false
        }),
        [signIn.SUCCESS]: (state, { payload }) => ({
            loading: false,
            user: payload?.data,
            response: null,
            error: false
        }),
        [signIn.FAILURE]: (state, { payload }) => ({
            loading: false,
            user: null,
            response: payload?.error,
            error: true
        }),

        [signUp.START]: () => ({
            loading: true,
            user: null,
            response: null,
            error: false
        }),
        [signUp.SUCCESS]: (state, { payload }) => ({
            loading: false,
            user: payload?.data,
            response: null,
            error: false
        }),
        [signUp.FAILURE]: (state, { payload }) => ({
            loading: false,
            user: null,
            response: payload?.error,
            error: true
        }),

        'AUTH/RESET_STATE': () => initialState
    },
    initialState
);
