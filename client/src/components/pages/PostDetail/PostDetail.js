import { useParams } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Progress } from 'reactstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostById, deletePostRequest, getRequests, getLastModified } from '../../../Redux/postsReducer.js';
import { Container, Button, Image } from 'react-bootstrap';
import CustomModal from '../../features/Modal/Modal.js';
import { format } from "date-fns";
import { IMGS_URL } from '../../../config';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const postData = useSelector((state) => getPostById(state, id));
    const addedPostId = useSelector(getLastModified)
    const requests = useSelector(getRequests);

    const [modal, setModal] = useState(false);

    const showModal = (event) => {
        event.preventDefault();
        setModal(true);
    }
    const removePost = async () => {
        console.log('remove');
        await dispatch(deletePostRequest(id));
        setModal(false);   
      };

      console.log('Render view: ', postData);

    if(!postData && !addedPostId) return <Navigate to="/" />
    else if (!postData && addedPostId) return <Navigate to={`/post/${addedPostId}`} />
    else return (
        <>
        <Container className="d-flex m-0 px-5 row justify-content-between">
        { (requests['UPDATE_POSTS'] && requests['UPDATE_POSTS'].error) && <Alert color="danger">{requests['UPDATE_POSTS'].error}</Alert> }
        { (requests['UPDATE_POSTS'] && requests['UPDATE_POSTS'].success) && <Alert color="success">You've updated your add! Check you email to confirm!</Alert> }
        { (requests['UPDATE_POSTS'] && requests['UPDATE_POSTS'].pending) && <Progress animated className="mb-5" color="primary" value={75} /> }
        <Image className="col-md-6 col-lg-5 mb-3 mb-md-0" src={`${IMGS_URL + postData.image}`} rounded />
        <div className="d-flex row col-md-6 col-lg-6">
            <h1 className="mb-4">{postData.title}</h1>
            {/* <h5> <b>Published: </b> {format(postData.publishedDate, "MMMM do, yyyy H:mma")}</h5> */}
            <h5> <b>Author: </b> {`${postData.author.firstName} ${postData.author.secondName}`}</h5>
            <h5> <b>Address: </b> {postData.address}</h5>
         
            <h3 className="align-bottom m-0 mt-2"> <b>Price: </b> {postData.price} $</h3>
        </div>
        <article className="m-3">
            {postData.content}
        </article>
        </Container>
        <div className="mt-3 d-flex justify-content-center">
        <div className="d-flex col-6 gap-2 justify-content-center"> 
            <Link to={"/post/edit/" + id} className="col-5">
                <Button className="w-100" variant="btn btn-outline-primary">Edit</Button>
            </Link>
            <Link onClick={showModal}  className="col-5">
                <Button className="w-100" variant="btn btn-outline-danger" >Delete</Button>
            </Link>
        </div>
        </div>
      
        <CustomModal modalStatus={modal} closeModal={setModal} action={removePost}/>
        </>
    );
}

export default PostDetail;