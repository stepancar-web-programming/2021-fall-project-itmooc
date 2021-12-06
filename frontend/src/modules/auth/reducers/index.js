import { combineReducers } from 'redux';

import joinReducer from './joinReducer';
import authReducer from './authReducer';

export default combineReducers({
    join: joinReducer,
    auth: authReducer
});
