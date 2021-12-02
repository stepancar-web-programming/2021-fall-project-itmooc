import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../modules/auth/reducers';
import menuReducer from '../modules/menu/reducers';

export const store = configureStore({
    reducer: {
        join: authReducer,
        menu: menuReducer
    }
});
