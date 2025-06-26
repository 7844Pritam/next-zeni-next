// src/app/ReduxProvider.jsx
'use client';

import { Provider } from 'react-redux';
import store from '../app/redux/store'; // update path as needed

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
