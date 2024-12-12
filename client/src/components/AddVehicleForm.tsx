import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_VEHICLE } from '../apollo/mutations';
import Auth from '../utils/auth';
import type { Vehicle } from '../models/Vehicle';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const VehicleForm = () => {
  // set initial form state
  const [vehicleFormData, setVehicleFormData] = useState<Vehicle>({ make: '', car_model: '', year: '', vin: '', mileage: 0, services: [], expenses: [] });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [AddVehicle] = useMutation(ADD_VEHICLE);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVehicleFormData({ ...vehicleFormData, [name]: value });
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
      const {data} = await AddVehicle({variables: {input: {
        make: vehicleFormData.make,
        car_model: vehicleFormData.car_model,
        year: vehicleFormData.year,
        vin: vehicleFormData.vin,
        mileage: Number(vehicleFormData.mileage)
      }}});

      if (data) {
          const token = data.addUser.token;
         Auth.login(token);
      }


    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setVehicleFormData({
      make: '',
      car_model: '',
      year: '',
      vin: '',
      mileage: 0,
      services: [], 
      expenses: []
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

        <div className='make-input'>
          <label htmlFor='make'>Make</label>
          <input
            type='text'
            placeholder='Vehicle make'
            name='make'
            onChange={handleInputChange}
            value={vehicleFormData.make || ''}
            required
          />
        </div>

        <div className='model-input'>
          <label htmlFor='car_model'>Model</label>
          <input
            type='car_model'
            placeholder='Vehicle model'
            name='car_model'
            onChange={handleInputChange}
            value={vehicleFormData.car_model || ''}
            required
          />          
        </div>

        <div className='year-input'>
          <label htmlFor='year'>Year</label>
          <input
            type='year'
            placeholder='Vehicle year manufactured'
            name='year'
            onChange={handleInputChange}
            value={vehicleFormData.year || ''}
            required
          />         
        </div>

        <div className='vin-input'>
          <label htmlFor='vin'>VIN</label>
          <input
            type='vin'
            placeholder='VIN'
            name='vin'
            onChange={handleInputChange}
            value={vehicleFormData.vin || ''}
            required
          />          
        </div>

        <div className='mileage-input'>
          <label htmlFor='mileage'>VIN</label>
          <input
            type='mileage'
            placeholder='Current vehicle mileage'
            name='mileage'
            onChange={handleInputChange}
            value={vehicleFormData.mileage || ''}
            required
          />          
        </div>
        <button
          disabled={!(vehicleFormData.make && vehicleFormData.car_model && vehicleFormData.year && vehicleFormData.vin && vehicleFormData.mileage)}
          type='submit'
          >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default VehicleForm;