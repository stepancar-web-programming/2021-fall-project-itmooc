import { createAction } from '@reduxjs/toolkit';

export const asyncAction = (type, requestFunc) => {
    const TYPE_START = `${type}_START`;
    const TYPE_SUCCESS = `${type}_SUCCESS`;
    const TYPE_FAILURE = `${type}_FAILURE`;

    const actions = {
        [TYPE_START]: createAction(
            TYPE_START,
            () => ({}),
            (input) => input
        ),
        [TYPE_SUCCESS]: createAction(
            TYPE_SUCCESS,
            (input, response) => ({
                payload: {
                    data: response?.data || response
                }
            }),
            (input) => input
        ),
        [TYPE_FAILURE]: createAction(
            TYPE_FAILURE,
            (input, error) => ({
                payload: {
                    input,
                    error: error?.message,
                    errorCode: error?.response?.status
                }
            }),
            (input) => input
        )
    };

    const thunkAction = (input) => async (dispatch) => {
        dispatch(actions[TYPE_START](input));

        return requestFunc(input)
            .then((response) => {
                dispatch(actions[TYPE_SUCCESS](input, response));
                return response;
            })
            .catch((error) => {
                dispatch(actions[TYPE_FAILURE](input, error));
                return { error };
            });
    };
    thunkAction.START = actions[TYPE_START].toString();
    thunkAction.SUCCESS = actions[TYPE_SUCCESS].toString();
    thunkAction.FAILURE = actions[TYPE_FAILURE].toString();

    return thunkAction;
};
