import { Container, Button, InputGroup, Form } from 'react-bootstrap';
import { Progress, Alert } from 'reactstrap';

import { useSelector } from 'react-redux';
import { getRequests } from '../../../Redux/postsReducer.js';

import Post from '../Post/Post.js';

const PostsList = ({ posts }) => {
    const requests = useSelector(getRequests);

    return (
        <Container className="d-flex justify-content-center row">
            { (requests['LOAD_POSTS'] && requests['LOAD_POSTS'].success) && posts.map(post => <Post key={post._id} {...post} />)}
            { (requests['LOAD_POSTS'] && requests['LOAD_POSTS'].pending) && <Progress animated color="primary" value={50} /> }
            { (requests['LOAD_POSTS'] && requests['LOAD_POSTS'].error) && <Alert color="warning">Couldn't load posts...</Alert> }
        </Container>
    );
}

export default PostsList;