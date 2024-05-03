import { API_URL } from '../config';
import axios from 'axios';

import shortid from 'shortid';

// selectors
export const getAllPosts = ({ posts }) => posts.data;
export const getSearchedPosts = ({ posts }) => posts.searched;
export const getPostById = ({ posts }, id) => posts.data.find((post) => post._id === id);
export const getRequests = ({ posts }) => posts.requests;
export const getLastModified = ({ posts }) => posts.lastModified;

/* ACTIONS */

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const CLEAR_REQUESTS = createActionName('CLEAR_REQUESTS');

const LOAD_POSTS = createActionName('LOAD_POSTS');
const LOAD_SEARCHED_POSTS = createActionName('SEARCH_POSTS');
const DELETE = createActionName('DELETE');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

// action creators
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const clearRequests = payload => ({ payload, type: CLEAR_REQUESTS });

export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const loadSearchedPosts = payload => ({ payload, type: LOAD_SEARCHED_POSTS });
export const deletePostById = payload => ({type: DELETE, payload}); 
export const addPost = payload => ({type: ADD_POST, payload}); 
export const editPost = payload => ({type: EDIT_POST, payload}); 

/* THUNKS */

export const loadPostsRequest = () => {
    return async dispatch => {
  
      dispatch(startRequest({ name: 'LOAD_POSTS' }));
      try {
        let res = await axios.get(`${API_URL}/api/adds`);
        console.log('Fech data: ', res);
        dispatch(loadPosts(res.data));
        dispatch(endRequest({ name: 'LOAD_POSTS' }));
      } catch(e) {
        dispatch(errorRequest({ name: 'LOAD_POSTS', error: e.message }));
      }
    };
};

export const searchPostsRequest = (searchPhrase) => {
  return async dispatch => {

    const options = {
      searchPhrase
    };

    dispatch(startRequest({ name: 'LOAD_POSTS' }));
    try {
      let res = await axios.get(`${API_URL}/api/adds/search`, { params: options });
      console.log('Searched data: ', res);
      dispatch(loadSearchedPosts(res.data));
      dispatch(endRequest({ name: 'LOAD_POSTS' }));
    } catch(e) {
      dispatch(errorRequest({ name: 'LOAD_POSTS', error: e.message }));
    }
  };
};

export const updatePostRequest = (id, post) => {
    return async dispatch => {
  
      dispatch(startRequest({ name: 'UPDATE_POSTS' }));
      try {
        let res = await axios.put(`${API_URL}/api/adds/${id}`, post);
        console.log('Updated data: ', res);

        dispatch(editPost(res.data));
        dispatch(endRequest({ name: 'UPDATE_POSTS' }));
      } catch(e) {
        dispatch(errorRequest({ name: 'UPDATE_POSTS', error: e.message }));
      }
    };
};

export const addPostRequest = (post) => {
    return async dispatch => {
  
      dispatch(startRequest({ name: 'UPDATE_POSTS' }));
      try {
        let res = await axios.post(`${API_URL}/api/adds`, post);
        console.log('Added data: ', res);

        dispatch(addPost(res.data));
        dispatch(endRequest({ name: 'UPDATE_POSTS' }));
      } catch(e) {
        dispatch(errorRequest({ name: 'UPDATE_POSTS', error: e.message }));
      }
    };
};

export const deletePostRequest = (id) => {
    return async dispatch => {
  
      dispatch(startRequest({ name: 'UPDATE_POSTS' }));
      try {
        let res = await axios.delete(`${API_URL}/api/adds/${id}`);
        console.log('Removed data: ', res);

        dispatch(deletePostById(res.data));
        dispatch(endRequest({ name: 'UPDATE_POSTS' }));
      } catch(e) {
        dispatch(errorRequest({ name: 'UPDATE_POSTS', error: e.message }));
      }
    };
};

const postsReducer = (statePart = [], action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return { ...statePart, data: [...action.payload], lastModified: '' };
        case LOAD_SEARCHED_POSTS:
              return { ...statePart, searched: [...action.payload]};  
        case EDIT_POST:
            return {...statePart, data: statePart.data.map(post => post._id === action.payload._id ? action.payload : post)};
        case ADD_POST:
            return {...statePart, data: [...statePart.data, action.payload], lastModified: action.payload._id};
        case DELETE:
            return {...statePart, data: statePart.data.filter(post => post._id !== action.payload._id)};
        case START_REQUEST:
            return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
        case END_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
        case ERROR_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };          
        case CLEAR_REQUESTS:
            return { ...statePart, requests: {} };
        default:
            return statePart;
    };
};

export default postsReducer;