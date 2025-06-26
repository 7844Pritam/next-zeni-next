import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase';

export const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOADING' });
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user);
    dispatch({ type: 'AUTH_SUCCESS', payload: user });
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR', payload: err.message });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOADING' });
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch({ type: 'AUTH_SUCCESS', payload: user });
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR', payload: err.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch({ type: 'AUTH_LOGOUT' });
};

export const monitorAuth = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      dispatch({ type: 'AUTH_VERIFICATION_UPDATE', payload: user.emailVerified });
      dispatch({ type: 'AUTH_ADMIN_UPDATE', payload: !!tokenResult.claims.admin });
    } else {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  });
};
