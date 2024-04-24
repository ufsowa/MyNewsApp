import shortid from 'shortid';

// selectors
export const getAllPosts = ({posts}) => posts;
export const getPostById = ({posts}, id) => posts.find((post) => post.id === id);

// actions
const createActionName = actionName => `app/posts/${actionName}`;
const DELETE = createActionName('DELETE');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
// action creators
export const deletePostById = payload => ({type: DELETE, payload}); 
export const addPost = payload => ({type: ADD_POST, payload}); 
export const editPost = payload => ({type: EDIT_POST, payload}); 

const postsReducer = (statePart = [], action) => {
    switch (action.type) {
        case EDIT_POST:
            return statePart.map(post => post.id === action.payload.id ? action.payload : post);
        case ADD_POST:
            return [...statePart, {...action.payload, id: shortid()}];
        case DELETE:
            return statePart.filter(post => post.id !== action.payload);
        default:
            return statePart;
    };
};

export default postsReducer;