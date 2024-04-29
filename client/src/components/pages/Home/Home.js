import { Link } from 'react-router-dom';
import { Container, Button, InputGroup, Form } from 'react-bootstrap';
import { Progress, Alert } from 'reactstrap';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, loadPostsRequest, clearRequests } from '../../../Redux/postsReducer.js';

import PostsList from '../../features/PostsList/PostsList.js';

import styles from './Home.module.scss';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getAllPosts);

    useEffect(()=>{
        dispatch(clearRequests());
        dispatch(loadPostsRequest())
    }, [dispatch]);

    const searchPhrase = 'test';

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
                <Link to={`/${searchPhrase}`} >
                    <Button variant="outline-secondary" className={styles.searchBtn}>Search</Button>
                </Link>
            </InputGroup>
            </div>
            </div>
            <PostsList posts={posts} />
        </>
    );
}

export default Home;