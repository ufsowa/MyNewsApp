import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedPosts, searchPostsRequest, clearRequests } from '../../../Redux/postsReducer.js';

import PostsList from '../../features/PostsList/PostsList.js';

const Search  = () => {
    const { searchPhrase } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(getSearchedPosts);

    useEffect(()=>{
        dispatch(clearRequests());
        dispatch(searchPostsRequest(searchPhrase))    // replace with search API
    }, [dispatch]);

    return (
        <>
        <div className="d-flex justify-content-between mb-5">
            <h1>Searched posts... {searchPhrase}</h1>
        </div>
        <PostsList posts={posts} />
        </>
    );
}

export default Search;