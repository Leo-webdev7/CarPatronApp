import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../apollo/mutations';
import type { Service } from '../models/Service';

interface AddServiceFormProps {
  vehicleVin: string;
}

const AddServiceForm = ({ vehicleVin }: AddServiceFormProps) => {
  const [serviceFormData, setServiceFormData] = useState<Service>({
    vin: vehicleVin,
    name: '',
    serviceType: 'SERVICE',
    date_performed: '',
    mileage_performed: 0,
    cost: 0,
    description: '',
    is_overdue: false,
  });

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addService] = useMutation(ADD_SERVICE);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServiceFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setServiceFormData((prevData) => ({
      ...prevData,
      serviceType: event.target.value as 'SERVICE' | 'EXPENSE',
    }));
  };

  const prepareFormData = () => {
    const formattedDate = serviceFormData.date_performed
      ? new Date(serviceFormData.date_performed).toISOString().split('T')[0]
      : null;

    return {
      ...serviceFormData,
      mileage_performed: Number(serviceFormData.mileage_performed),
      cost: parseFloat(serviceFormData.cost.toString().replace(/[^0-9.]/g, '')),
      date_performed: formattedDate,
    };
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const preparedData = prepareFormData();
      const response = await addService({ variables: { input: preparedData } });

      if (response) {
        console.log('Service Record Added successfully');
        navigate('/HomePage'); // Redirect after successful submission
      } else {
        console.error('Failed to add Service Record');
      }
    } catch (error) {
      console.error('Error adding Service Record:', error);
      setShowAlert(true);
    }
  };

  return (
    <div className="">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
          Something went wrong while adding the service record!
        </Alert>

        <p className="input-label">Add Service Record:</p>

        <Form.Group className="mb-3">
          <Form.Label>Name of Service</Form.Label>
          <Form.Control
            type="text"
            placeholder="Service performed"
            name="name"
            value={serviceFormData.name || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Service Type</Form.Label>
          <Form.Select
            value={serviceFormData.serviceType}
            onChange={handleServiceTypeChange}
            required
          >
            <option value="SERVICE">Service</option>
            <option value="EXPENSE">Expense</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date_performed"
            value={serviceFormData.date_performed || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mileage</Form.Label>
          <Form.Control
            type="number"
            placeholder="Mileage as of service"
            name="mileage_performed"
            value={serviceFormData.mileage_performed || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="text"
            placeholder="Service cost"
            name="cost"
            value={serviceFormData.cost || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Service/Expense Description"
            name="description"
            value={serviceFormData.description || ''}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <button
          className="btn btn-primary"
          disabled={
            !(
              serviceFormData.name &&
              serviceFormData.date_performed &&
              serviceFormData.serviceType &&
              serviceFormData.description &&
              serviceFormData.mileage_performed &&
              serviceFormData.cost
            )
          }
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default AddServiceForm;
