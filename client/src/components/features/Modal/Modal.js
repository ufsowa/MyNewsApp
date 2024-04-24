import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({modalStatus, closeModal, action}) => {

  const handleClose = () => closeModal(false);
  const handleDelete = (event) => {
    event.preventDefault();
    action();
  };

  return (
      <Modal show={modalStatus} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you going to completly remove this post from the the blog {"\n"} Are you sure you want to do that?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CustomModal;