import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ FIXED
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // 👍 This is now valid
);

export default store;
