import PostForm from "../../features/PostForm/PostForm";
import { useDispatch, useSelector } from 'react-redux';
import { editPost, getPostById } from '../../../Redux/postsReducer.js';
import { Navigate} from 'react-router-dom';
import { useParams } from 'react-router';

const EditPage = () => {
    const {id} = useParams(); 
    console.log(id)
    const post = useSelector((state) => getPostById(state, id));

    const dispatch = useDispatch();
    const handleEditPost = (postData) => {
        dispatch(editPost({...postData, id}));
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