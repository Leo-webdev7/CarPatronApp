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

    console.log(new Date(services[0].date_performed * 1000));

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
                                <td id="date">{service.date_performed}</td>
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

    // return (
    //     <div>
    //         <div className="income-source">
    //             <table>
    //                 <tr className="table-columns">
    //                     <th>Date last serviced:</th>
    //                     <th>Cost $:</th>
    //                     <th>Mileage:</th>
    //                     <th>Title:</th>
    //                     <th>Description:</th>
    //                 </tr>
    //                 <tr>
    //                     <th id="date">24.04.2024</th>
    //                     <th id="cost">250</th>
    //                     <th id="mileage">65000</th>
    //                     <th id="title">Breaking pads</th>
    //                     <th id="description">Breaking pads replaced</th>
    //                 </tr>
    //             </table>
    //         </div>
    //     </div>
    // )
}

export default ServiceRecordsTable;