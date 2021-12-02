import { handleActions } from 'redux-actions';
import axios from 'axios';

import { JOIN_URL } from '../constants';
import { asyncAction } from '../../core/utils/actions';

export const postCode = asyncAction('JOIN/POST_CODE', ({ code }) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    return axios.post(
        JOIN_URL,
        { code },
        {
            headers
        }
    );
});

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

        [postCode.FAILURE]: () => ({
            loading: true,
            response: null,
            error: true
        })
    },
    initialState
);
