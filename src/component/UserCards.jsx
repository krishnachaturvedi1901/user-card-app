import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, deleteUser, editUser } from '../redux/userSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For schema validation
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Modal from './Modal';
import './usercard.css';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);


const [Wishlist, setWishlist] = useState(false)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    website: Yup.string().url('Invalid URL').required('Website is required'),
  });

  const handleSave = (values) => {
    dispatch(editUser({ ...user, ...values }));
    closeModal();
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };


  return (
    <div className="user-card">
      <div className="avatar">
        <img
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`}
          alt="avatar"
        />
      </div>
      <h2>{user.name}</h2>
      <p>
        <MailOutlineIcon className="icon" />
        {user.email}
      </p>
      <p>
        <PhoneIcon className="icon" />
        {user.phone}
      </p>
      <p>
        <LanguageIcon className="icon" />
        {user.website}
      </p>
      <div className="button-group">
        <span
          className="icon-button"
         onClick={() => setWishlist(!Wishlist)}
        >
          {Wishlist ? (
            <FavoriteIcon style={{ color: '#ff4081' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </span>

        <span className="icon-button" onClick={openModal} title="Edit User">
          <EditIcon style={{ color: '#1976d2' }} />
        </span>
        <span className="icon-button" onClick={handleDelete} title="Delete User">
          <DeleteIcon style={{ color: '#d32f2f' }} />
        </span>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>

          <h6>Edit User Details</h6>
       
     
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            phone: user.phone,
            website: user.website,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form>
              {['name', 'email', 'phone', 'website'].map((field) => (
                <div className="form-field" key={field}>
                  <label>
                    <span style={{ color: 'red' }}>*</span> {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <Field
                    type={field === 'email' ? 'email' : field === 'website' ? 'url' : 'text'}
                    name={field}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="error"
                  />
                </div>
              ))}
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={closeModal}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}>
                  OK
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default UserCard;
