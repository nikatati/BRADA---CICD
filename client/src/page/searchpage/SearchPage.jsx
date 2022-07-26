import React, { useEffect, useReducer, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../../components/Rating';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';
import Button from 'react-bootstrap/Button';
import Product from '../../components/Product';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];

export default function SearchPage() {
  const navigate = useHistory();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const color = sp.get('color') || 'all';
  const type = sp.get('type') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&color=${color}&type=${type}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, color, type, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const [colors, setColors] = useState([]);
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { data } = await axios.get(`/api/products/colors`);
        setColors(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchColors();
  }, [dispatch]);

  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data } = await axios.get(`/api/products/types`);
        setTypes(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchTypes();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterColor = filter.color || color;
    const filterTypes = filter.type || type;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&color=${filterColor}&type=${filterTypes}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div style={{ backgroundColor: "#694F5D" }}>
      <Row>
        <Col md={2}>
          <h3 style={{color:"#BFD3C1"}}>Types</h3>
          <div>
            <ul>
              <li>
                <Link style={{color:"#BFD3C1"}}
                  className={'all' === type ? 'text-bold' : ''}
                  to={getFilterUrl({ type: 'all' })}
                >
                  Any
                </Link>
              </li>
              {types.map((t) => (
                <li key={t}>
                  <Link style={{color:"#BFD3C1"}}
                    className={t === type ? 'text-bold' : ''}
                    to={getFilterUrl({ type: t })}
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <h3 style={{color:"#BFD3C1"}}>Categories</h3>
          <div>
            <ul>
              <li>
                <Link style={{color:"#BFD3C1"}}
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link style={{color:"#BFD3C1"}}
                    className={c === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <h3 style={{color:"#BFD3C1"}}>Color</h3>
          <div>
            <ul>
              <li>
                <Link style={{color:"#BFD3C1"}}
                  className={'all' === color ? 'text-bold' : ''}
                  to={getFilterUrl({ color: 'all' })}
                >
                  Any
                </Link>
              </li>
              {colors.map((co) => (
                <li key={co}>
                  <Link style={{color:"#BFD3C1"}}
                    className={co === color ? 'text-bold' : ''}
                    to={getFilterUrl({ color: co })}
                  >
                    {co}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{color:"#BFD3C1"}}>Price</h3>
            <ul>
              <li >
                <Link style={{color:"#BFD3C1"}}
                  className={'all' === price ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li style={{color:"#BFD3C1"}} key={p.value}>
                  <Link style={{color:"#BFD3C1"}}
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{color:"#BFD3C1"}}>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link style={{color:"#BFD3C1"}}
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link style={{color:"#BFD3C1"}}
                  to={getFilterUrl({ rating: 'all' })}
                  className={rating === 'all' ? 'text-bold' : ''}
                >
                  <Rating caption={' & up'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : error ? (
            <MessageAlert style={{color:"#BFD3C1"}} variant="danger">{error}</MessageAlert>
          ) : (
            <>
              <Row className="justify-content-between mb-3" style={{color:"#BFD3C1"}}>
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {type !== 'all' && ' : ' + type}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {color !== 'all' && ' : Color ' + color}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate.push('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate.push(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageAlert>No Product Found</MessageAlert>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={3} className="mb-3 mr-5" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
{/* 
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <Router
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </Router>
                ))}
              </div> */}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}