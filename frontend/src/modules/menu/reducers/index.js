import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from './menuReducer';

export default combineReducers({
    menu: menuReducer
});
