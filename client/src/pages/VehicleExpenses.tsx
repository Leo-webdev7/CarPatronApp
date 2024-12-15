import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
import { GET_ME, GET_EXPENSES } from '../apollo/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import moneyIcon from '../assets/icons/money.svg';
const VehicleExpenses = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<string>('');

    // Query to fetch user vehicles
    const { loading: loadingVehicles, error: errorVehicles, data: userData } = useQuery(GET_ME);

    // Query to fetch expenses for the selected vehicle
    const { loading: loadingExpenses, error: errorExpenses, data: expenseData } = useQuery(GET_EXPENSES, {
        variables: { vin: selectedVehicle },
        skip: !selectedVehicle, // Skip query if no vehicle is selected
    });

    if (loadingVehicles) return <p>Loading vehicles...</p>;
    if (errorVehicles) return <p>Error loading vehicles: {errorVehicles.message}</p>;

    const vehicles = userData?.me?.vehicles || [];
    const expenses = expenseData?.getExpenses || [];

    const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVehicle(event.target.value);
    };

    const formatDate = (date: number) => {
        const parsedDate = new Date(date * 1); 
        if (isNaN(parsedDate.getTime())) {
            return 'Invalid Date';
        }

        
        const formattedDate = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric',
            timeZone: 'UTC', 
        });

        return formattedDate; 
    };

    return (
        <div>
            <HeaderSmall />
            <img src={moneyIcon} alt="money icon" className="page-img"/>
            <h1>Vehicle Expenses</h1>
            <div className="addService-wrap">
                <label htmlFor="vehicleSelect">Select Vehicle: </label>
                <select
                    id="vehicleSelect"
                    className="service-select"
                    value={selectedVehicle}
                    onChange={handleVehicleChange}
                >
                    <option value="">-- Select a Vehicle --</option>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle: any) => (
                            <option key={vehicle.vin} value={vehicle.vin}>
                                {`${vehicle.vin} - ${vehicle.year} ${vehicle.make} ${vehicle.car_model}`}
                            </option>
                        ))
                    ) : (
                        <option disabled>No vehicles available</option>
                    )}
                </select>
            </div>

            {selectedVehicle && (
                <div className="income-source">
                    {loadingExpenses ? (
                        <p>Loading expenses...</p>
                    ) : errorExpenses ? (
                        <p>Error loading expenses: {errorExpenses.message}</p>
                    ) : expenses.length > 0 ? (
                        <table>
                            <thead>
                                <tr className="table-columns">
                                    <th>Date Last Serviced</th>
                                    <th>Cost ($)</th>
                                    <th>Mileage</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense: any, index: number) => (
                                    <tr key={index}>
                                        <td id='date'>{formatDate(expense.date_performed)}</td>
                                        <td id='cost'>{expense.cost}</td>
                                        <td id='mileage'>{expense.mileage_performed}</td>
                                        <td id='title'>{expense.name}</td>
                                        <td id='description'>{expense.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No expenses found for this vehicle.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default VehicleExpenses;
