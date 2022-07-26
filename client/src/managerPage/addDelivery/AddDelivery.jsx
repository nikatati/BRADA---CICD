import { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddDelivery = () => {
    // here some logic
    const history = useHistory();

    const [deliveryName, setDdeliveryName] = useState('');
    const [minDays, setMminDays] = useState('');
    const [maxDays, setMmaxDays] = useState('');
    const [deliveryPrice, setDdeliveryPrice] = useState('');


    useEffect(() => {

    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/manager/adddelivery`, {
                deliveryName,
                minDays,
                maxDays,
                deliveryPrice,
            });
            toast.success(data.message);
        } catch (err) {
            toast.error(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
        history.push('/');
    };

    return (
        <div >
            <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{color:"#D8E2DC"}}>Add Delivery Option</h2>

                                        <Form onSubmit={submitHandler}>

                                            {/* TOPIC */}
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{color:"#D8E2DC"}}>Delivery Name<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    required type="text"
                                                    placeholder="Delivery Name"
                                                    value={deliveryName}
                                                    onChange={(e) => setDdeliveryName(e.target.value)} />
                                            </Form.Group>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Min Days</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Min Days"
                                                            pattern="[0-9]{1,3}"
                                                            title="Must contain only digits, max length 3"
                                                            required
                                                            value={minDays}
                                                            onChange={(e) => setMminDays(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-4">
                                                <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Max Days</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Max Days"
                                                            pattern="[0-9]{1,3}"
                                                            title="Must contain only digits, max length 3"
                                                            required
                                                            value={maxDays}
                                                            onChange={(e) => setMmaxDays(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-4">
                                                <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Price</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Price"
                                                            pattern="[0-9]{1,5}"
                                                            title="Must contain only digits, max length 5"
                                                            required
                                                            value={deliveryPrice}
                                                            onChange={(e) => setDdeliveryPrice(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>


                                            <div className="mb-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Add</Button>
                                            </div>

                                        </Form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default AddDelivery;
