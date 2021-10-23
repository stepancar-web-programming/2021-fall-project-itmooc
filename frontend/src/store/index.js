// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
//
// import reducer from './reducer';
//
// const is_server = typeof window === 'undefined';
// const is_production = process.env.NODE_ENV === 'production';
//
// const middleware = [thunk];
// if (!is_server && !is_production) middleware.push(createLogger({ collapsed: true }));
//
// export default createWrapper((reduxToolkitStoreOptions) =>
//     configureStore({
//         reducer,
//         middleware,
//         devTools: !is_production,
//         ...reduxToolkitStoreOptions
//     })
// );
