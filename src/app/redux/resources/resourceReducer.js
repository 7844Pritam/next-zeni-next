import {
    FETCH_RESOURCES_START,
    FETCH_RESOURCES_SUCCESS,
    FETCH_RESOURCES_FAILURE,
    ADD_RESOURCE_SUCCESS,
    UPDATE_RESOURCE_SUCCESS,
    DELETE_RESOURCE_SUCCESS,
} from './resourceActions';

const initialState = {
    resources: [],
    loading: false,
    error: null,
};

const resourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESOURCES_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_RESOURCES_SUCCESS:
            return {
                ...state,
                loading: false,
                resources: action.payload,
            };
        case FETCH_RESOURCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_RESOURCE_SUCCESS:
            return {
                ...state,
                loading: false,
                // We don't necessarily need to update the list here if we refetch or if it's pending
            };
        case UPDATE_RESOURCE_SUCCESS:
        case DELETE_RESOURCE_SUCCESS:
            return {
                ...state,
                loading: false,
                resources: action.payload,
            };
        default:
            return state;
    }
};

export default resourceReducer;
