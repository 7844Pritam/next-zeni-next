const initialState = {
  user: null,
  loading: false,
  error: null,
  isVerified: false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isVerified: action.payload.emailVerified,
        loading: false,
      };
    case 'AUTH_LOGOUT':
      return initialState;
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'AUTH_VERIFICATION_UPDATE':
      return { ...state, isVerified: action.payload };
    case 'AUTH_ADMIN_UPDATE':
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
};

export default authReducer;
