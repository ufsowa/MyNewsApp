import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import initialState from './initialState.js';

//  import reducers
import postsReducer from './postsReducer.js';
import usersReducer from './usersReducer.js';

const subreducers = {
    posts: postsReducer,
    users: usersReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
    reducer,
    initialState,
    compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
  
export default store;