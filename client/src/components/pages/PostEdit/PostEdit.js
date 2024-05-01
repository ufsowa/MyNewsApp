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
        console.log('Send req:', postData);
        const fd = new FormData();
        fd.append('title', postData.title);
        fd.append('author', postData.author);
        fd.append('address', postData.address);
        fd.append('publishedDate', postData.publishedDate);
        fd.append('content', postData.content);
        fd.append('price', postData.price);
        fd.append('image', postData.image);

        await dispatch(updatePostRequest(id, fd));
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