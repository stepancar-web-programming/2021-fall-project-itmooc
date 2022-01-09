import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../modules/auth/reducers';
import menuReducer from '../modules/menu/reducers';
import quizReducer from '../modules/quiz/reducers';
import homeReducer from '../modules/home/reducers';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        quiz: quizReducer,
        home: homeReducer
    }
});
