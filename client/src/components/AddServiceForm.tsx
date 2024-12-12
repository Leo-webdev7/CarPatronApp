import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../apollo/mutations';
import Auth from '../utils/auth';
import type { Service } from '../models/Service';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const AddServiceForm = () => {
  // set initial form state
  const [serviceFormData, setServiceFormData] = useState<Service>({ name: '', date: '', mileage_performed: 0, cost: 0, is_outdated: false });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addService] = useMutation(ADD_SERVICE);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServiceFormData({ ...serviceFormData, [name]: value });
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
      const {data} = await addService({variables: {input: serviceFormData}});

      if (data) {
          const token = data.addService.token;
         Auth.login(token);
      }


    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setServiceFormData({
      name: '', date: '', mileage_performed: 0, cost: 0, is_outdated: false 
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

        <div className='name-input'>
          <label htmlFor='name'>Name of Service</label>
          <input
            type='name'
            placeholder='Service performed'
            name='name'
            onChange={handleInputChange}
            value={serviceFormData.name || ''}
            required
          />
        </div>

        <div className='model-input'>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            placeholder='Service date'
            name='date'
            onChange={handleInputChange}
            value={serviceFormData.date || ''}
            required
          />          
        </div>

        <div className='mileage-input'>
          <label htmlFor='mileage'>Mileage</label>
          <input
            type='mileage'
            placeholder='Mileage as of service'
            name='mileage'
            onChange={handleInputChange}
            value={serviceFormData.mileage_performed || ''}
            required
          />         
        </div>

        <div className='cost-input'>
          <label htmlFor='cost'>Cost</label>
          <input
            type='cost'
            placeholder='Service cost'
            name='cost'
            onChange={handleInputChange}
            value={serviceFormData.cost || ''}
            required
          />          
        </div>        

        <button
          disabled={!(serviceFormData.name && serviceFormData.date && serviceFormData.mileage_performed && serviceFormData.cost )}
          type='submit'
          >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default AddServiceForm;