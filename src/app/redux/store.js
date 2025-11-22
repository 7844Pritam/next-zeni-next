import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import resourceReducer from './resources/resourceReducer';
import courseReducer from './courses/courseReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  resources: resourceReducer,
  courses: courseReducer,
});

const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
