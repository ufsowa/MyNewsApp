import { useParams } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostById, deletePostById } from '../../../Redux/postsReducer.js';
import { Container, Button, Image } from 'react-bootstrap';
import CustomModal from '../../features/Modal/Modal.js';
import { format } from "date-fns";

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const postData = useSelector((state) => getPostById(state, id));
    const [modal, setModal] = useState(false);

    const showModal = (event) => {
        event.preventDefault();
        setModal(true);
    }
    const removePost = () => {
        console.log('remove');
        dispatch(deletePostById(id));
        setModal(false);   
      };

    if(!postData) return <Navigate to="/" />
    else return (
        <>
        <Container className="d-flex m-0 px-5 row justify-content-between">
        <Image className="col-md-6 col-lg-5 mb-3 mb-md-0" src={`${process.env.PUBLIC_URL}/${postData.imgPath}`} rounded />
        <div className="d-flex row col-md-6 col-lg-6">
            <h1 className="mb-4">{postData.title}</h1>
            <h5> <b>Published: </b> {format(postData.publishedDate, "MMMM do, yyyy H:mma")}</h5>
            <h5> <b>Author: </b> {postData.author}</h5>
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