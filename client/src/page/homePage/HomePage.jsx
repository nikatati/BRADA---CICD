// import { useEffect, useState } from 'react';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../../components/Product';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';
import HomeCategory from '../../components/HomeCategory';



const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className=' bg-image' style={{ backgroundColor: "#BFD3C1" }}>
      <div className="mb-3 d-flex justify-content-center">
        <h1 style={{color:"#694F5D"}}>Brada Home Page</h1>
      </div>
      <HomeCategory></HomeCategory>
      <div className="products" >
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <MessageAlert variant="danger">{error}</MessageAlert>
        ) : (
          <Row lg={8} className="mb-3 d-flex justify-content-center">
            <Col sm={6} md={8} lg={3}>
              <Carousel variant="dark">
                {products.map((product) => (
                  // <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  //   <Product product={product}></Product>
                  // </Col>
                  <Carousel.Item >
                    <Link to={`/product/${product.slug}`}>
                      <img src={product.image} className="card-img-top" alt={product.name} />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>

        )}
      </div>
    </div>
  );
}
export default HomePage;


