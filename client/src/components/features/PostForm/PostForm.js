import { useState } from "react";
import { Container, Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { format } from "date-fns";

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const PostForm = ({header, action, ...props}) => {
    const [title, setTitle] = useState(props.title ?? '');
    const [author, setAuthor] = useState(props.author ?? '');
    const [address, setAddress] = useState(props.address ?? '');
    const [publishedDate, setPublishedDate] = useState(props.publishedDate ?? new Date());
    const [content, setContent] = useState(props.content ?? '');
    const [price, setPrice] = useState(props.price ?? '');
    const [imgPath, setImgPath] = useState(props.imgPath ?? '');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const props = {
            title,
            author,
            publishedDate,
            content,
            price,
            imgPath,
        };
        action(props);
        navigate('/');
    }

    return (
        <Container className="col-8">
            <h1 className="m-5">{header}</h1>
            <Form className="">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="col-md-5">
                        <Form.Group className="mt-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </Form.Group>                
                        <Form.Group className="mt-2">
                            <Form.Label>Published</Form.Label>
                            <span className="d-block px-2 py-1">{format(publishedDate, "MMMM do, yyyy H:mma")}</span>
                            {/* <DatePicker wrapperClassName="d-block" className="px-2 py-1" selected={publishedDate} onChange={(date) => setPublishedDate(date)} /> */}
                        </Form.Group>
                        <Form.Group className="mt-2 col-5">
                            <Form.Label>Price</Form.Label>
                            <div className="d-flex col gap-2 align-items-center">
                                <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)}/> $
                            </div>
                        </Form.Group>
                    </div>
                    <div className="d-flex col-md-6 row">
                        <Image className="mt-2 mb-md-3 mb-md-0" src={`${process.env.PUBLIC_URL}/${imgPath}`} rounded />
                        <Form.Group className="mt-2">
                            <Form.Control type="text" value={imgPath} onChange={(e) => setImgPath(e.target.value)}/>
                        </Form.Group>  
                    </div>
                </div>
                <Form.Group className="mt-2">
                    <Form.Label>Main content</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
                </Form.Group>
                <div className="d-flex mt-2 justify-content-center"> 
                    <Button className="mt-2 p-2 px-4" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            </Form>
        </Container>
    );
}

export default PostForm;