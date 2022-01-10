import { handleActions } from 'redux-actions';
import axios from 'axios';

import { createAction } from '@reduxjs/toolkit';
import { LOGIN_URL, ME_URL, SIGN_UP_URL, UPDATE_INFO_URL } from '../constants';
import { asyncAction } from '../../core/utils/actions';

export const signIn = asyncAction('AUTH/LOGIN', ({ login, password }) => axios.post(LOGIN_URL, { login, password }));

export const signUp = asyncAction('AUTH/SIGN_UP', ({ login, password, birthday, gender }) =>
    axios.post(SIGN_UP_URL, { login, password, birthday, gender })
);

export const updateInfo = asyncAction('AUTH/UPDATE_INFO', ({ password, newPassword, birthday, gender }) =>
    axios.post(UPDATE_INFO_URL, { password, newPassword, birthday, gender })
);

export const me = asyncAction('AUTH/ME', () => axios.get(ME_URL));

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

        [updateInfo.START]: () => ({
            loading: true,
            user: null,
            response: null,
            error: false
        }),
        [updateInfo.SUCCESS]: (state, { payload }) => ({
            loading: false,
            user: payload?.data,
            response: null,
            error: false
        }),
        [updateInfo.FAILURE]: (state, { payload }) => ({
            loading: false,
            user: null,
            response: payload?.error,
            error: true
        }),

        [me.START]: () => ({
            loading: true,
            user: null,
            response: null,
            error: false
        }),
        [me.SUCCESS]: (state, { payload }) => ({
            loading: false,
            user: payload?.data,
            response: null,
            error: false
        }),
        [me.FAILURE]: (state, { payload }) => ({
            loading: false,
            user: null,
            response: payload?.error,
            error: true
        }),

        'AUTH/RESET_STATE': () => initialState
    },
    initialState
);
