import { handleActions } from 'redux-actions';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { JOIN_URL, JOIN_PASSWORD_URL } from '../constants';
import { asyncAction } from '../../core/utils/actions';

export const postCode = asyncAction('JOIN/POST_CODE', ({ code }) => axios.post(JOIN_URL, { code }));

export const postPassword = asyncAction('JOIN/POST_PASSWORD', ({ code, password }) =>
    axios.post(JOIN_PASSWORD_URL, { code, password })
);

export const resetState = createAction('JOIN/RESET_STATE');

const initialState = {
    loading: false,
    response: null,
    error: false
};

export default handleActions(
    {
        [postCode.START]: () => ({
            loading: true,
            response: null,
            error: false
        }),
        [postCode.SUCCESS]: (state, { payload }) => ({
            loading: false,
            response: payload?.data,
            error: false
        }),
        [postCode.FAILURE]: (state, { payload }) => ({
            loading: false,
            response: payload?.error,
            error: true
        }),

        [postPassword.START]: () => ({
            loading: true,
            response: null,
            error: false
        }),
        [postPassword.SUCCESS]: (state, { payload }) => ({
            loading: false,
            response: payload?.data,
            error: false
        }),
        [postPassword.FAILURE]: (state, { payload }) => ({
            loading: false,
            response: payload?.error,
            error: true
        }),

        'JOIN/RESET_STATE': () => initialState
    },
    initialState
);
