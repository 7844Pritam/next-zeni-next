import { db } from '../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';

// Action Types
export const FETCH_RESOURCES_START = 'FETCH_RESOURCES_START';
export const FETCH_RESOURCES_SUCCESS = 'FETCH_RESOURCES_SUCCESS';
export const FETCH_RESOURCES_FAILURE = 'FETCH_RESOURCES_FAILURE';
export const ADD_RESOURCE_SUCCESS = 'ADD_RESOURCE_SUCCESS';
export const UPDATE_RESOURCE_SUCCESS = 'UPDATE_RESOURCE_SUCCESS';
export const DELETE_RESOURCE_SUCCESS = 'DELETE_RESOURCE_SUCCESS';

// Action Creators
export const fetchResourcesStart = () => ({ type: FETCH_RESOURCES_START });
export const fetchResourcesSuccess = (resources) => ({
    type: FETCH_RESOURCES_SUCCESS,
    payload: resources,
});
export const fetchResourcesFailure = (error) => ({
    type: FETCH_RESOURCES_FAILURE,
    payload: error,
});

// Thunks

// Fetch Approved Resources (Public)
export const fetchApprovedResources = () => async (dispatch) => {
    dispatch(fetchResourcesStart());
    try {
        const q = query(
            collection(db, 'resources'),
            where('status', '==', 'approved')
            // orderBy('createdAt', 'desc') // Commented out to avoid index issues for now
        );
        const querySnapshot = await getDocs(q);
        let resources = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Sort manually if needed
        resources.sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
        });

        dispatch(fetchResourcesSuccess(resources));
    } catch (error) {
        dispatch(fetchResourcesFailure(error.message));
    }
};

// Fetch All Resources (Admin)
export const fetchAllResources = () => async (dispatch) => {
    dispatch(fetchResourcesStart());
    try {
        const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const resources = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        dispatch(fetchResourcesSuccess(resources));
    } catch (error) {
        dispatch(fetchResourcesFailure(error.message));
    }
};

// Add Resource
export const addResource = (resourceData) => async (dispatch) => {
    dispatch(fetchResourcesStart());
    try {
        const docRef = await addDoc(collection(db, 'resources'), {
            ...resourceData,
            status: 'pending', // Default status
            createdAt: serverTimestamp(),
        });

        // We can either refetch or just dispatch success with the new item
        // For simplicity, let's refetch to ensure sync
        // But to be more efficient, we could just add it to state if we had the full object
        // Since we need serverTimestamp, refetching or just notifying success is easier.

        dispatch({ type: ADD_RESOURCE_SUCCESS });
        return docRef.id;
    } catch (error) {
        dispatch(fetchResourcesFailure(error.message));
        throw error;
    }
};

// Update Resource Status (Approve/Reject)
export const updateResourceStatus = (id, status) => async (dispatch, getState) => {
    try {
        const resourceRef = doc(db, 'resources', id);
        await updateDoc(resourceRef, { status });

        // Optimistic update in state
        const { resources } = getState().resources;
        const updatedResources = resources.map(res =>
            res.id === id ? { ...res, status } : res
        );

        dispatch({
            type: UPDATE_RESOURCE_SUCCESS,
            payload: updatedResources
        });
    } catch (error) {
        dispatch(fetchResourcesFailure(error.message));
    }
};

// Delete Resource
export const deleteResource = (id) => async (dispatch, getState) => {
    try {
        await deleteDoc(doc(db, 'resources', id));

        const { resources } = getState().resources;
        const updatedResources = resources.filter(res => res.id !== id);

        dispatch({
            type: DELETE_RESOURCE_SUCCESS,
            payload: updatedResources
        });
    } catch (error) {
        dispatch(fetchResourcesFailure(error.message));
    }
};
