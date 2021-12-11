import { combineReducers } from '@reduxjs/toolkit';
import quizReducer from './quizReducer';

export default combineReducers({
    quiz: quizReducer
});
