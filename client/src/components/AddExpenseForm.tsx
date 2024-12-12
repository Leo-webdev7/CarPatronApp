import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../apollo/mutations';
import Auth from '../utils/auth';
import type { Expense } from '../models/Expense';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const ExpenseForm = () => {
  // set initial form state
  const [expenseFormData, setExpenseFormData] = useState<Expense>({ name: '', date: '', mileage_performed: 0, cost: 0, is_outdated: false });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addService] = useMutation(ADD_EXPENSE);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExpenseFormData({ ...expenseFormData, [name]: value });
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
      const {data} = await addService({variables: {input: expenseFormData}});

      if (data) {
          const token = data.addExpense.token;
         Auth.login(token);
      }


    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setExpenseFormData({
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
          <label htmlFor='name'>Name of Expense</label>
          <input
            type='name'
            placeholder='Expense purchased'
            name='name'
            onChange={handleInputChange}
            value={expenseFormData.name || ''}
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
            value={expenseFormData.date || ''}
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
            value={expenseFormData.mileage_performed || ''}
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
            value={expenseFormData.cost || ''}
            required
          />          
        </div>        

        <button
          disabled={!(expenseFormData.name && expenseFormData.date && expenseFormData.mileage_performed && expenseFormData.cost )}
          type='submit'
          >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default ExpenseForm;