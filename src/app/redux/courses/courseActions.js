import { db } from '../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';

// Action Types
export const FETCH_COURSES_START = 'FETCH_COURSES_START';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';
export const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';

// Action Creators
export const fetchCoursesStart = () => ({ type: FETCH_COURSES_START });
export const fetchCoursesSuccess = (courses) => ({
    type: FETCH_COURSES_SUCCESS,
    payload: courses,
});
export const fetchCoursesFailure = (error) => ({
    type: FETCH_COURSES_FAILURE,
    payload: error,
});

// Thunks

// Fetch All Courses
export const fetchCourses = () => async (dispatch) => {
    dispatch(fetchCoursesStart());
    try {
        const q = query(collection(db, 'courses'));
        // orderBy('createdAt', 'desc') // Temporarily removed to avoid index issues

        const querySnapshot = await getDocs(q);
        let courses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Manual sort
        courses.sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
        });

        dispatch(fetchCoursesSuccess(courses));
    } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
    }
};

// Add Course
export const addCourse = (courseData) => async (dispatch) => {
    dispatch(fetchCoursesStart());
    try {
        await addDoc(collection(db, 'courses'), {
            ...courseData,
            createdAt: serverTimestamp(),
        });

        dispatch({ type: ADD_COURSE_SUCCESS });
        dispatch(fetchCourses()); // Refetch to update list
    } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
        throw error;
    }
};

// Update Course
export const updateCourse = (id, courseData) => async (dispatch) => {
    dispatch(fetchCoursesStart());
    try {
        const courseRef = doc(db, 'courses', id);
        await updateDoc(courseRef, courseData);

        dispatch({ type: UPDATE_COURSE_SUCCESS });
        dispatch(fetchCourses()); // Refetch
    } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
        throw error;
    }
};

// Delete Course
export const deleteCourse = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, 'courses', id));

        dispatch({ type: DELETE_COURSE_SUCCESS });
        dispatch(fetchCourses()); // Refetch
    } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
    }
};
