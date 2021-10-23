import { configureStore } from '@reduxjs/toolkit';
import joinReducer from '../modules/join/reducers';

export const store = configureStore({
    reducer: {
        join: joinReducer
    }
});
