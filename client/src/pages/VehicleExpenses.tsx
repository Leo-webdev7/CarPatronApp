import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
import { GET_SERVICE } from '../apollo/queries';
import { useQuery } from '@apollo/client';

interface AddServiceFormProps {
    vehicleVin: string;
}

const VehicleExpenses = ({ vehicleVin }: AddServiceFormProps) => {
    const { loading, error, data } = useQuery(GET_SERVICE, {
        variables: { vin: vehicleVin }, 
    });

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>Error loading services: {error.message}</p>;

    const expenses = data?.getExpenses || [];

    console.log(new Date(expenses[0].date_performed * 1000));

    return (
        <div>
            <HeaderSmall />
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
                        {expenses.map((expense: any, index: number) => (
                            <tr key={index}>
                                <td id="date">{expense.date_performed}</td>
                                <td id="cost">{expense.cost}</td>
                                <td id="mileage">{expense.mileage_performed}</td>
                                <td id="title">{expense.name}</td>
                                <td id="description">{expense.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
/* function VehicleExpenses() {
    return (
        <div>
        <HeaderSmall />
            <div className="income-source">
                <table>
                    <tr className="table-columns">
                        <th>Date last serviced:</th>
                        <th>Cost $:</th>
                        <th>Mileage:</th>
                        <th>Title:</th>
                        <th>Description:</th>
                    </tr>
                    <tr>
                        <th id="date">24.04.2024</th>
                        <th id="cost">250</th>
                        <th id="mileage">65000</th>
                        <th id="title">Breaking pads</th>
                        <th id="description">Breaking pads replaced</th>
                    </tr>
                </table>
            </div>
        </div>
    )
} */

export default VehicleExpenses;