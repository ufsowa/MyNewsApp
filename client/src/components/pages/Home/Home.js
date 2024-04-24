import { Link } from 'react-router-dom';
import { Container, Button, InputGroup, Form } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { getAllPosts } from '../../../Redux/postsReducer.js';

import styles from './Home.module.scss';

import Post from '../../features/Post/Post.js';

const Home = () => {
   const posts = useSelector(getAllPosts)

    return (
        <>
            <div className="d-flex justify-content-between mb-5">
                <h1>All news</h1>
            </div>
                           
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
                {posts.map(post => <Post key={post.id} {...post} />)}
            </Container>
        </>
    );
}

export default Home;