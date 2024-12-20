import '../App.css';
import { GET_SERVICE } from '../apollo/queries';
import { useQuery } from '@apollo/client';

interface AddServiceFormProps {
    vehicleVin: string;
}

const ServiceRecordsTable = ({ vehicleVin }: AddServiceFormProps) => {
    const { loading, error, data } = useQuery(GET_SERVICE, {
        variables: { vin: vehicleVin }, 
    });

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>Error loading services: {error.message}</p>;

    const services = data?.getServices || [];

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
            <div className="income-source">
                <table>
                    <thead>
                        <tr className="table-columns">
                            <th>Date last serviced:</th>
                            <th>Cost $:</th>
                            <th>Mileage:</th>
                            <th>Title:</th>
                            <th>Description:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service: any, index: number) => (
                            <tr key={index}>
                                <td id="date">{formatDate(service.date_performed)}</td>
                                <td id="cost">{service.cost}</td>
                                <td id="mileage">{service.mileage_performed}</td>
                                <td id="title">{service.name}</td>
                                <td id="description">{service.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ServiceRecordsTable;