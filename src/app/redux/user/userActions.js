import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const saveUserProfile = (uid, data) => async (dispatch) => {
  dispatch({ type: 'USER_LOADING' });
  try {
    await setDoc(doc(db, 'users', uid), data);
    dispatch({ type: 'USER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USER_ERROR', payload: error.message });
  }
};

export const getUserProfile = (uid) => async (dispatch) => {
  dispatch({ type: 'USER_LOADING' });
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({ type: 'USER_SUCCESS', payload: docSnap.data() });
    } else {
      dispatch({ type: 'USER_ERROR', payload: 'User not found' });
    }
  } catch (error) {
    dispatch({ type: 'USER_ERROR', payload: error.message });
  }
};

export const updateUserProfile = (uid, updates) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'users', uid), updates);
    dispatch({ type: 'USER_UPDATE', payload: updates });
  } catch (error) {
    dispatch({ type: 'USER_ERROR', payload: error.message });
  }
};

export const clearUserProfile = () => (dispatch) => {
  dispatch({ type: 'USER_CLEAR' });
};
export const setEditMode = (value) => ({
  type: 'SET_EDIT_MODE',
  payload: value,
});

export const setProfileImage = (file) => ({
  type: 'SET_PROFILE_IMAGE',
  payload: file,
});

export const setShowPopup = (value) => ({
  type: 'SET_SHOW_POPUP',
  payload: value,
});

export const setMobileNumber = (value) => ({
  type: 'SET_MOBILE_NUMBER',
  payload: value,
});

export const setWriterRequest = (data) => ({
  type: 'SET_WRITER_REQUEST',
  payload: data,
});
