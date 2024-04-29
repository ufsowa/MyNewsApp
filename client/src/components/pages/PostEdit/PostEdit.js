import PostForm from "../../features/PostForm/PostForm";
import { useDispatch, useSelector } from 'react-redux';
import { updatePostRequest, getPostById, clearRequests } from '../../../Redux/postsReducer.js';
import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router';
import { useEffect } from "react";

const EditPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams(); 
    const post = useSelector((state) => getPostById(state, id));

    useEffect(()=>{
        console.log('clear')
        dispatch(clearRequests());
    }, [dispatch]);

    const handleEditPost = async (postData) => {
        await dispatch(updatePostRequest(id, postData));
//        dispatch(editPost({...postData, id}));
    };

    const props = {
        ...post,
        header: 'Edit post',
        action: handleEditPost,
    };
    if(!post) return (<Navigate to="/" />)
    return (
        <PostForm {...props}/>
    );
}

export default EditPage;