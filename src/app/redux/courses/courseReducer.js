import {
    FETCH_COURSES_START,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    ADD_COURSE_SUCCESS,
    UPDATE_COURSE_SUCCESS,
    DELETE_COURSE_SUCCESS,
} from './courseActions';

const initialState = {
    courses: [],
    loading: false,
    error: null,
};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: action.payload,
            };
        case FETCH_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_COURSE_SUCCESS:
        case UPDATE_COURSE_SUCCESS:
        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default courseReducer;
