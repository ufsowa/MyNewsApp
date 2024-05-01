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
        console.log('Send req:', postData);
        const fd = new FormData();
        fd.append('title', postData.title);
        fd.append('author', postData.author);
        fd.append('address', postData.address);
        fd.append('publishedDate', postData.publishedDate);
        fd.append('content', postData.content);
        fd.append('price', postData.price);
        fd.append('image', postData.image);
        
        await dispatch(addPostRequest(fd));
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