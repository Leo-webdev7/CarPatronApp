import {useEffect} from 'react';
import '../App.css';
import HeaderSmall from '../components/HeaderSmall';

function VehicleExpenses() {
    useEffect(() => {
        document.body.classList.add('custom-body');
    }, []);

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
}

export default VehicleExpenses;