import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import ProductEdit from '../../components/ProductEdit';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';

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


  function EditCatalog() {
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
      <div>
        <h1 className="d-flex justify-content-center" style={{color:"#694F5D"}}>Edit Catalog</h1>
        <div className="products">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <MessageAlert variant="danger">{error}</MessageAlert>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <ProductEdit product={product}></ProductEdit>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
  export default EditCatalog;
  