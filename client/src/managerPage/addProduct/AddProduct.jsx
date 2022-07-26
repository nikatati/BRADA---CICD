import { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddProduct = () => {
    // here some logic
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');


    useEffect(() => {

    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/manager/addproduct`, {
                title,
                image,
                brand,
                category,
                color,
                size,
                type,
                description,
                price,
                countInStock,
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
                                <div className="card mb-3" itemID="check">
                                    <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                        <h2 className="text-uppercase text-center mb-5" style={{color:"#D8E2DC"}}>Add Product</h2>

                                        <Form onSubmit={submitHandler}>

                                            {/* TOPIC */}
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{color:"#D8E2DC"}}>Product Name<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    required type="text"
                                                    placeholder="Product Name"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{color:"#D8E2DC"}}>Product Image<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    required type="text"
                                                    placeholder="Product Image URL"
                                                    value={image}
                                                    onChange={(e) => setImage(e.target.value)} />
                                            </Form.Group>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Brand</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Brand"
                                                            required
                                                            value={brand}
                                                            onChange={(e) => setBrand(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-3">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Type</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Type"
                                                            required
                                                            value={type}
                                                            onChange={(e) => setType(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-3">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Category</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Category"
                                                            required
                                                            value={category}
                                                            onChange={(e) => setCategory(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-3">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Size</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Size"
                                                            required
                                                            value={size}
                                                            onChange={(e) => setSize(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Color</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Color"
                                                            pattern="[A-Za-z]{1,20}"
                                                            title="Must contain only letters, max length 20"
                                                            required
                                                            value={color}
                                                            onChange={(e) => setColor(e.target.value)} />
                                                    </Form.Group>
                                                </div>

                                                <div className="col-md-4">
                                                    <Form.Group className="mb-4" controlId="formBasicStreetNumber">
                                                        <Form.Label style={{color:"#D8E2DC"}}>Count In Stock</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="count In Stock"
                                                            pattern="[0-9]{1,8}"
                                                            title="Must contain only digits, max length 8"
                                                            required
                                                            value={countInStock}
                                                            onChange={(e) => setCountInStock(e.target.value)} />
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
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)} />
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{color:"#D8E2DC"}}>Description<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    as="textarea" rows={3}
                                                    required type="text"
                                                    placeholder="Enter product description."
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)} />
                                            </Form.Group>

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

export default AddProduct;
