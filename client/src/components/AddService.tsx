import { useState } from 'react';
import AddServiceForm from './AddServiceForm'; // Adjust path as needed
import ServiceRecordsTable from './ServiceRecordsTable'; // Adjust path as needed
import '../App.css';

function AddServiceMain() {
    const [view, setView] = useState<null | 'addService' | 'viewRecords'>(null); // Explicitly define the type

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

