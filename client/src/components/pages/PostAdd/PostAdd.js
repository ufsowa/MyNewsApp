import PostForm from "../../features/PostForm/PostForm";
import { useDispatch } from 'react-redux';
import { addPostRequest, clearRequests } from '../../../Redux/postsReducer.js';

import { useEffect } from "react";

const EditPage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('clear')
        dispatch(clearRequests());
    }, [dispatch]);

    const handleAddPost = async (postData) => {
        await dispatch(addPostRequest(postData));
//        dispatch(editPost({...postData, id}));
    };

    const props = {
        header: 'Add new post',
        action: handleAddPost,
    };

    return (
        <PostForm {...props}/>
    );
}

export default EditPage;