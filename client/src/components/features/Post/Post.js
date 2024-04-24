import { Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Post = ({id, title, shortDescription, content, author, publishedDate, imgPath }) => {
    return (
        <Card className="m-2 col-md-5 col-xl-3">
            <Card.Body className="d-flex justify-content-between flex-column">
            <Image src={`${process.env.PUBLIC_URL}/${imgPath}`} rounded />
                <div>
                    <Card.Title className="mt-4">{title}</Card.Title>
                    <Card.Subtitle className="mb-2"><b>Author:</b> {author}</Card.Subtitle>
                    {/* <Card.Subtitle className="mb-2"><b>Published:</b> {publishedDate} </Card.Subtitle> */}
                </div>
                <Card.Text style={{ height: '5rem' }} className="text-wrap text-truncate" dangerouslySetInnerHTML={{ __html: shortDescription }} />
                <Link to={"/post/" + id} className="text-center"><Button variant="primary">Read more</Button></Link>
            </Card.Body>
        </Card>
    );
}

export default Post;