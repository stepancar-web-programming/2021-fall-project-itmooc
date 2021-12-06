import { handleActions } from 'redux-actions';
import axios from 'axios';

import { createAction } from '@reduxjs/toolkit';
import { LOGIN_URL, SIGN_UP_URL } from '../constants';
import { asyncAction } from '../../core/utils/actions';

export const login = asyncAction('AUTH/LOGIN', ({ login, password }) => axios.post(LOGIN_URL, { login, password }));

export const signUp = asyncAction('AUTH/SIGN_UP', ({ login, password, birthday, gender }) =>
    axios.post(SIGN_UP_URL, { login, password, birthday, gender })
);

export const resetState = createAction('AUTH/RESET_STATE');

const initialState = {
    loading: false,
    user: null,
    error: false
};

export default handleActions(
    {
        [login.START]: () => ({
            loading: true,
            user: null,
            error: false
        }),
        [login.SUCCESS]: (state, { payload }) => ({
            loading: false,
            user: payload?.data,
            error: false
        }),
        [login.FAILURE]: () => ({
            loading: false,
            user: null,
            error: true
        }),

        [signUp.START]: () => ({
            loading: true,
            user: null,
            error: false
        }),
        [signUp.SUCCESS]: (state, { payload }) => ({
            loading: false,
            user: payload?.data,
            error: false
        }),
        [signUp.FAILURE]: () => ({
            loading: false,
            user: null,
            error: true
        }),

        'JOIN/RESET_STATE': () => initialState
    },
    initialState
);
