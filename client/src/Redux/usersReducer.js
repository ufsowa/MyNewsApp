import shortid from 'shortid';

// selectors
export const getAllPosts = ({users}) => users;
export const getPostById = ({users}, id) => users.find((user) => user.id === id);

// actions
const createActionName = actionName => `app/posts/${actionName}`;
const DELETE_USER = createActionName('DELETE_USER');
const ADD_USER = createActionName('ADD_USER');
const EDIT_USER = createActionName('EDIT_USER');
// action creators
export const deleteUserById = payload => ({type: DELETE_USER, payload}); 
export const addUser = payload => ({type: ADD_USER, payload}); 
export const editUser = payload => ({type: EDIT_USER, payload}); 

const postsReducer = (statePart = [], action) => {
    switch (action.type) {
        case EDIT_USER:
            return statePart.map(user => user.id === action.payload.id ? action.payload : user);
        case ADD_USER:
            return [...statePart, {...action.payload, id: shortid()}];
        case DELETE_USER:
            return statePart.filter(user => user.id !== action.payload);
        default:
            return statePart;
    };
};

export default postsReducer;