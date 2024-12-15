import '../App.css';
import { GET_SERVICE } from '../apollo/queries';
import { useQuery } from '@apollo/client';

interface AddServiceFormProps {
    vehicleVin: string;
}

const ServiceRecordsDiv = ({ vehicleVin }: AddServiceFormProps) => {
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
        <>
            <div className="income-source">
                {services.map((service: any, index: number) => (
                <ul key={index}>
                    <li>
                        <strong>Date last serviced:</strong>
                        <div id="date">{formatDate(service.date_performed)}</div>
                    </li>
                    <li>
                        <strong>Cost $</strong>
                        <div id="cost">{service.cost}</div>
                    </li>
                    <li>
                        <strong>Mileage:</strong>
                        <div id="mileage">{service.mileage_performed}</div>
                    </li>
                    <li>
                        <strong>Title:</strong>
                        <div id="title">{service.name}</div>
                    </li>
                    <li>
                        <strong>Description:</strong>
                        <div id="description">{service.description}</div>
                    </li>
                </ul>
                ))}   
            </div>
        </>
    );
}

export default ServiceRecordsDiv;