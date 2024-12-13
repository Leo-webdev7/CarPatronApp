

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../apollo/queries';
import { User } from '../models/User'; // Make sure this import is correct
import AddServiceForm from './AddServiceForm'; // Adjust path as needed
import ServiceRecordsTable from './ServiceRecordsTable'; // Adjust path as needed
import '../App.css';

function AddServiceMain() {
    const [view, setView] = useState<null | 'addService' | 'viewRecords'>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<string>(''); // Initialize as empty string

    // Use Apollo's useQuery hook to fetch user data, including vehicles
    const { loading, error, data } = useQuery<{ me: User }>(GET_ME);

    // Handle loading and error states
    if (loading) return <p>Loading vehicles...</p>;
    if (error) return <p>Error loading vehicles: {error.message}</p>;

    const vehicles = data?.me?.vehicles || [];

    const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const vehicleVin = event.target.value;
        setSelectedVehicle(vehicleVin);
    };

    return (
        <div>
            <div className="addService-wrap">
                <label htmlFor="vehicleSelect">Select Vehicle: </label>
                <select className='service-select'
                    id="vehicleSelect"
                    value={selectedVehicle}  // This will now be an empty string or vehicle vin string
                    onChange={handleVehicleChange}
                >
                    <option value="">--Select a Vehicle--</option>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => (
                            <option key={vehicle.vin} value={vehicle.vin ?? ''}>
                                {`${vehicle.year} ${vehicle.make} ${vehicle.car_model} (Mileage: ${vehicle.mileage})`}
                            </option>
                        ))
                    ) : (
                        <option disabled>No vehicles available</option>
                    )}
                </select>

                {selectedVehicle && <p>Selected Vehicle VIN: {selectedVehicle}</p>}

                {view === null && (
                    <div>
                        <div>
                            <button className='saveButton' onClick={() => setView('addService')}>Add New Service</button>
                        </div>
                        <div>
                            <button  className='saveButton' onClick={() => setView('viewRecords')}>View Existing Records</button>
                        </div>
                    </div>
                )}
                {view === 'addService' && <AddServiceForm vehicleVin={selectedVehicle}/>}
                {view === 'viewRecords' && <ServiceRecordsTable vehicleVin={selectedVehicle}/>}
            </div>
        </div>
    );
}

export default AddServiceMain;
