// import { useEffect, useState } from 'react';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Button, Col, Table } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
// import { Button } from 'bootstrap';




const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, deliveries: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function DeliveryOptions() {
    const [{ loading, error, deliveries }, dispatch] = useReducer(logger(reducer), {
        deliveries: [],
        loading: true,
        error: '',
    });
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/manager/deliveries');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, []);
    const deleteHandler = async (delivery) => {
        const deliveryName = delivery.deliveryName;
        window.alert(deliveryName);
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/manager/delivery/${deliveryName}`, {
                    deliveryName,
                });
                toast.success('Delivery deleted successfully');
                window.location.reload();
            } catch (error) {
                toast.error(getError(error));
            }
        }
        
    };


    return (
        <div>
            <h1>Deliveries</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Delivery Name</th>
                        <th>Min Days</th>
                        <th>Max Days</th>
                        <th>Delivery Price</th>
                    </tr>
                </thead>
                {deliveries.map((delivery) => (

                    <tbody>
                        <tr>
                            <td><Button onClick={() => deleteHandler(delivery)}><Trash></Trash></Button></td>
                            <td>{delivery.deliveryName}</td>
                            <td>{delivery.minDays}</td>
                            <td>{delivery.maxDays}</td>
                            <td>${delivery.deliveryPrice}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>

        </div>
    );
}
export default DeliveryOptions;

