import { Link } from 'react-router-dom';
import { Container, Button, InputGroup, Form } from 'react-bootstrap';
import { Progress, Alert } from 'reactstrap';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getRequests, loadPostsRequest, clearRequests } from '../../../Redux/postsReducer.js';

import styles from './Home.module.scss';

import Post from '../../features/Post/Post.js';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getAllPosts);
    const requests = useSelector(getRequests);

    useEffect(()=>{
        console.log('clear')
        dispatch(clearRequests());
        dispatch(loadPostsRequest())
    }, [dispatch]);

    return (
        <>
            <div className="d-flex justify-content-between mb-5">
                <h1>All news</h1>
                <Link to={'/post/add/'}  className="col-3 col-lg-2">
                    <Button className="w-100" variant="btn btn-outline-primary" >Add new</Button>
                </Link>
            </div>
            {/* Add error alert when add request failed */}
            <div className="d-flex justify-content-center">
            <div className="col-11 col-md-7 mb-4">
            <InputGroup >
                    <Form.Control
                    className="d-flex col-5"
                    placeholder="Looking for something?"
                    aria-label="Recipient's username with two button addons"
                    />
                <Link to={"/post/add/"} >
                    <Button variant="outline-secondary" className={styles.searchBtn}>Search</Button>
                </Link>
            </InputGroup>
            </div>
            </div>
            <Container className="d-flex justify-content-center row">
                { (requests['LOAD_POSTS'] && requests['LOAD_POSTS'].success) && posts.map(post => <Post key={post._id} {...post} />)}
                { (requests['LOAD_POSTS'] && requests['LOAD_POSTS'].pending) && <Progress animated color="primary" value={50} /> }
                { (requests['LOAD_POSTS'] && requests['LOAD_POSTS'].error) && <Alert color="warning">Couldn't load posts...</Alert> }
            </Container>
        </>
    );
}

export default Home;