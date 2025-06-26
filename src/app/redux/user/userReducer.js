const initialState = {
  profile: null,
  loading: false,
  error: null,
  editMode: false,
  profileImage: null,
  showPopup: false,
  mobileNumber: '',
  writerRequest: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return { ...state, loading: true, error: null };
    case 'USER_SUCCESS':
      return { ...state, loading: false, profile: action.payload };
    case 'USER_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'USER_UPDATE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case 'SET_EDIT_MODE':
      return { ...state, editMode: action.payload };
    case 'SET_PROFILE_IMAGE':
      return { ...state, profileImage: action.payload };
    case 'SET_SHOW_POPUP':
      return { ...state, showPopup: action.payload };
    case 'SET_MOBILE_NUMBER':
      return { ...state, mobileNumber: action.payload };
    case 'SET_WRITER_REQUEST':
      return { ...state, writerRequest: action.payload };
    case 'USER_CLEAR':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
