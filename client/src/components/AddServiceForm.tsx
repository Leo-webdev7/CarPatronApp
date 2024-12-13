import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate} from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../apollo/mutations';
// import Auth from '../utils/auth';
import type { Service } from '../models/Service';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const AddServiceForm = () => {
  // set initial form state
  const [serviceFormData, setServiceFormData] = useState<Service>({ name: '', serviceType: 'SERVICE', date_performed: '', mileage_performed: 0, cost: 0, description: '', is_outdated: false });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addService] = useMutation(ADD_SERVICE);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServiceFormData({ ...serviceFormData, [name]: value });
  };
  const handleServiceTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setServiceFormData({ ...serviceFormData, serviceType: event.target.value as 'SERVICE' | 'EXPENSE' });
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await addService({variables: {input: serviceFormData}});

      if (response) {
            console.log('Service Record Added successfully');
            navigate('/ServiceRecords'); // Redirect to service records page
        } else {
            console.error('Failed to add Service Record');
        }
      } catch (error) {
          console.error('Error adding Service Record:', error);
      }
  };

  return (
    <div className='signup-wrap'>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>
        <div>
          <p className='input-label'>Add Service Record:</p>
        </div>
        <div className='name-input'>
          <label htmlFor='name'>Name of Service</label>
          <input
            type='text'
            placeholder='Service performed'
            name='name'
            onChange={handleInputChange}
            value={serviceFormData.name || ''}
            required
          />
        </div>

        <div className='service-select'>
          <label htmlFor="serviceType">Service Type:</label>
          <select value={serviceFormData.serviceType} onChange={handleServiceTypeChange}>
            <option value="SERVICE">Service</option>
            <option value="EXPENSE">Expense</option>
          </select>       
        </div>

        <div className='model-input'>
          <label htmlFor='date'>Date</label>
          <input
            type='text'
            placeholder='Service date'
            name='date_performed'
            onChange={handleInputChange}
            value={serviceFormData.date_performed || ''}
            required
          />          
        </div>

        <div className='mileage-input'>
          <label htmlFor='mileage'>Mileage</label>
          <input
            type='text'
            placeholder='Mileage as of service'
            name='mileage_performed'
            onChange={handleInputChange}
            value={serviceFormData.mileage_performed || ''}
            required
          />         
        </div>

        <div className='cost-input'>
          <label htmlFor='cost'>Cost</label>
          <input
            type='text'
            placeholder='Service cost'
            name='cost'
            onChange={handleInputChange}
            value={serviceFormData.cost || ''}
            required
          />          
        </div>  

        <div className='descripition-input'>
          <label htmlFor='cost'>Description</label>
          <input
            type='text'
            placeholder='Service/Expense Description'
            name='description'
            onChange={handleInputChange}
            value={serviceFormData.description || ''}
            required
          />          
        </div>       

        <button
          disabled={!(serviceFormData.name && serviceFormData.date_performed && serviceFormData.serviceType && serviceFormData.description && serviceFormData.mileage_performed && serviceFormData.cost )}
          type='submit'
          >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default AddServiceForm;