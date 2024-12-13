import React, { useState } from 'react';
import AddServiceForm from './AddServiceForm'; // Adjust path as needed
import ServiceRecordsTable from './ServiceRecordsTable'; // Adjust path as needed
import '../App.css';

function AddServiceMain() {
    const [view, setView] = useState(null); // Keeps track of what to display: null, 'addService', or 'viewRecords'

    return (
        <div>
            <div className="signup-wrap box">
                {view === null && (
                    <div>
                        <button onClick={() => setView('addService')}>Add New Service</button>
                        <button onClick={() => setView('viewRecords')}>View Existing Records</button>
                    </div>
                )}
                {view === 'addService' && <AddServiceForm />}
                {view === 'viewRecords' && <ServiceRecordsTable />}
            </div>
        </div>
    );
}

export default AddServiceMain;