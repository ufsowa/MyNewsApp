import { useState, useEffect } from "react";
import { Container, Button, Form, Image } from "react-bootstrap";
import { Alert, Progress } from 'reactstrap';
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { IMGS_URL } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getRequests, clearRequests } from '../../../Redux/postsReducer.js';


// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const PostForm = ({header, action, ...props}) => {
    const [title, setTitle] = useState(props.title ?? '');
    const [author, setAuthor] = useState(props.author ?? '');
    const [address, setAddress] = useState(props.address ?? '');
    const [publishedDate, setPublishedDate ] = useState(props.publishedDate ?? new Date());
    const [content, setContent] = useState(props.content ?? '');
    const [price, setPrice] = useState(props.price ?? '');
    const [image, setImage] = useState(props.image ?? null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [isError, setIsError] = useState(false);
    const requests = useSelector(getRequests);

    const [preview, setPreview] = useState()

    const navigate = useNavigate();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        console.log('date |', publishedDate, '|');
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    useEffect(()=>{
        console.log('reroute on success ', requests);
        if (requests['UPDATE_POSTS'] && requests['UPDATE_POSTS'].success) { 
            console.log('reroute on success');
            navigate(`/post/${props._id}`);        // rerout to post view
        }
    },
    [requests])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            title,
            content,
            price,
            address,
            author: author._id,
            image: selectedFile,
            publishedDate,
        };
        if (post.title && post.content && post.price && post.address && (image || post.image)) {
            await action(post);
            console.log('update on success', requests);
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    return (
        <Container className="col-8">
            <h1 className="m-5">{header}</h1>
            { (isError) && <Alert color="warning">There are some errors in you form. Have you fill all the fields? Maybe you forgot to choose your seat?</Alert> }
            { (requests['UPDATE_POSTS'] && requests['UPDATE_POSTS'].error) && <Alert color="danger">{requests['UPDATE_POSTS'].error}</Alert> }
            { (requests['UPDATE_POSTS'] && requests['UPDATE_POSTS'].pending) && <Progress animated className="mb-5" color="primary" value={75} /> }
  
            <Form className="">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="col-md-5">

                        <Form.Group className="mt-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Author</Form.Label>
                            <span className="d-block px-2 py-1">{`${author.firstName} ${author.secondName}`}</span>
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </Form.Group>    

                        <Form.Group className="mt-2">
                            <Form.Label>Published</Form.Label>
                            <span className="d-block px-2 py-1">{format(publishedDate, "MMMM, yyyy H:mma")}</span>
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
                        {!selectedFile && image &&
                            <Image className="mt-2 mb-md-3 mb-md-0" src={`${IMGS_URL + image}`} rounded /> }
                        {selectedFile &&
                            <Image className="mt-2 mb-md-3 mb-md-0" src={preview} rounded /> }
                        <Form.Group className="mt-2">
                            { !image && <Form.Label>Select picture:</Form.Label> }
                            <Form.Control type="file" onChange={onSelectFile}/>
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