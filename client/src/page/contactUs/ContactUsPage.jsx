import { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ContactUsPage = () => {
    // here some logic
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {

    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/email`, {
                name,
                email,
                topic,
                message,
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
                                        <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Contact Us</h2>

                                        <Form onSubmit={submitHandler}>
                                            {/* FIRST NAME */}

                                            <Form.Group className="mb-4" controlId="formBasicFirstName">
                                                <Form.Label style={{ color: "#D8E2DC" }} >Name<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    required type="text"
                                                    pattern="[A-Za-z' ']{1,40}"
                                                    title="Must contain only letters"
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>


                                            {/* EMAIL */}
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Email address<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    required type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>

                                            {/* TOPIC */}
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Topic<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    required type="text"
                                                    placeholder="Topic"
                                                    value={topic}
                                                    onChange={(e) => setTopic(e.target.value)} />
                                            </Form.Group>

                                            {/* MESSAGE */}
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label style={{ color: "#D8E2DC" }}>Message<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    as="textarea" rows={3}
                                                    required type="text"
                                                    placeholder="Enter your message here."
                                                    value={message}
                                                    style={{ color: "#D8E2DC" }}
                                                    onChange={(e) => setMessage(e.target.value)} />
                                            </Form.Group>


                                            <div className="mb-3 d-flex justify-content-center">
                                                <Button style={{ backgroundColor: "#694F5D" }} type="submit">Send</Button>
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

export default ContactUsPage;
