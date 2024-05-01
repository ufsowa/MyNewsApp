import { Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';


const Post = ({_id, title, shortDescription, content, author, publishedDate, image }) => {
    return (
        <Card className="m-2 col-md-5 col-xl-3">
            <Card.Body className="d-flex justify-content-between flex-column">
            <Image src={`${IMGS_URL + image}`} rounded />
                <div>
                    <Card.Title className="mt-4">{title}</Card.Title>
                    <Card.Subtitle className="mb-2"><b>Author:</b> {`${author.firstName} ${author.secondName}`}</Card.Subtitle>
                    {/* <Card.Subtitle className="mb-2"><b>Published:</b> {publishedDate} </Card.Subtitle> */}
                </div>
                <Link to={"/post/" + _id} className="text-center"><Button variant="primary">Read more</Button></Link>
            </Card.Body>
        </Card>
    );
}

export default Post;