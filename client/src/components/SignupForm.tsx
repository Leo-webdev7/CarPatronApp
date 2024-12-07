import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADDUSER } from '../apollo/mutations';
// import { createUser } from '../utils/API';
import Auth from '../utils/auth';
import type { User } from '../models/User';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', phonenumber: '', vehicles: [] });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADDUSER);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const {data} = await addUser({variables: {input: userFormData}});

      if (data) {
          const token = data.addUser.token;
         Auth.login(token);
      }


    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      phonenumber: '',
      vehicles: [],
    });
  };

  return (
    <div className='signup-wrap box'>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <div className='username-input'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username || ''}
            required
          />
        </div>

        <div className='email-input'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />          
        </div>

        <div className='phone-input'>
          <label htmlFor='phonenumber'>Phone Number</label>
          <input
            type='phonenumber'
            placeholder='Your phone number'
            name='phonenumber'
            onChange={handleInputChange}
            value={userFormData.phonenumber || ''}
            required
          />         
        </div>

        <div className='password-input'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />          
        </div>
        <button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default SignupForm;