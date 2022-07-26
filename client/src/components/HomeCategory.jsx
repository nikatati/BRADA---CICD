import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
function HomeCategory() {
    return (
        <Col>
            <Row sm={6} lg={4} className="mx-3 my-3 d-flex justify-content-center">
                <Card className="mx-3 my-3" style={{background: "#694F5D"}} >
                    <Link to={'/search?type=Male'}>
                        <img src='https://images.unsplash.com/photo-1532649638930-537fbd3a11ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwYmFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
                            className="card-img-top" />
                    </Link>
                    <Card.Body>
                        <Link style={{color:"#694F5D"}} to={'/search?type=Male'}>
                            <Card.Title className="mb-3 d-flex justify-content-center" style={{color:"#D8E2DC"}}>Male</Card.Title>
                        </Link>
                    </Card.Body>
                </Card>
                <Card className="mx-3 my-3" style={{background: "#694F5D"}}>
                    <Link to={'/search?type=Female'}>
                        <img src='https://images.unsplash.com/photo-1593592023995-a857ecf39076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
                            className="card-img-top" />
                    </Link>
                    <Card.Body>
                        <Link style={{color:"#694F5D"}} to={'/search?type=Female'}>
                            <Card.Title className="mb-3 d-flex justify-content-center" style={{color:"#D8E2DC"}}>Female</Card.Title>
                        </Link>
                    </Card.Body>
                </Card>
                <Card className="mx-3 my-3" style={{background: "#694F5D"}} >
                    <Link to={'/search?type=Suitcase'}>
                        <img src='https://images.unsplash.com/photo-1534534573898-db5148bc8b0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VpdGNhc2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
                            className="card-img-top" />
                    </Link>
                    <Card.Body>
                        <Link style={{color:"#694F5D"}} to={'/search?type=Suitcase'}>
                            <Card.Title className="mb-3 d-flex justify-content-center" style={{color:"#D8E2DC"}}>Suitcase</Card.Title>
                        </Link>
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    )
};
export default HomeCategory;
