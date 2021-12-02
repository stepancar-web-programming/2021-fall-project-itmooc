import { handleActions } from 'redux-actions';
import { createAction } from '@reduxjs/toolkit';

export const getMenuData = (state) => state?.menu?.menu;

export const toggleMenu = createAction('MENU/TOGGLE_MENU');

const initialState = {
    open: false
};

export default handleActions(
    {
        'MENU/TOGGLE_MENU': (state) => ({
            ...state,
            open: !state.open
        })
    },
    initialState
);
