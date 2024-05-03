import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, InputGroup, Form } from 'react-bootstrap';
import { Progress, Alert } from 'reactstrap';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, loadPostsRequest, clearRequests } from '../../../Redux/postsReducer.js';

import PostsList from '../../features/PostsList/PostsList.js';

import styles from './Home.module.scss';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getAllPosts);
    const [ searchPhrase, setSearchPhrase ] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(clearRequests());
        dispatch(loadPostsRequest())
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search: ', searchPhrase);
        navigate(`/search/${searchPhrase}`)
    }

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
                    <Form onSubmit={handleSearch}>
                        <InputGroup>
                            <Form.Control
                                className="d-flex col-5"
                                placeholder="Looking for something?"
                                aria-label="Recipient's username with two button addons"
                                value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)}
                            />
                            <Button variant="outline-secondary" type="submit" className={styles.searchBtn}>Search</Button>
                        </InputGroup>
                    </Form>
                </div>
            </div>
            <PostsList posts={posts} />
        </>
    );
}

export default Home;