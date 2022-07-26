import { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Store } from "../../Store";
import { getError } from "../../utils";
import { Chart } from "react-google-charts";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Dashboard = () => {
    // here some logic
    const history = useHistory();
    const options = {
        title: "Most Sellin Items",
    };
    const [date, setDate] = useState('allTime');
    const [totalIncome, setTotalIncome] = useState(0);
    const [pieData, setPieData] = useState([]);


    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            let tot = 0;
            let arr = [["product", "total sales"]];
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/manager/staristic/${date}`,
                );
                data.forEach(element => {
                    tot += element.totalPrice;
                    console.log(element);
                });
                setTotalIncome(tot);

                data.forEach(orderItems => {
                    orderItems.orderItems.forEach(item => {
                        if (arr.some(row => row.includes(item.title))) {
                            var index = arr.findIndex(x => x.includes(item.title))
                            arr[index][1] += item.quantity;
                        }
                        else {
                            let temp = [item.title, item.quantity];
                            arr.push(temp);
                        }
                    });
                });
                setPieData(arr);
                console.log(pieData);

            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
            setTotalIncome(tot);

        };

        fetchData();
    }, [date]);

    const submitHandler = async () => {

    };

    if (userInfo && userInfo.isAdmin)
        return (
            <div >
                <div className=" bg-image" style={{ backgroundColor: "#694F5D" }}  >
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-xl-10 m-5">
                                    <div className="card" itemID="check">
                                        <div className="card-body p-5" style={{ backgroundColor: "#BFD3C1" }} >
                                            <h2 className="text-uppercase text-center mb-5" style={{ color: "#D8E2DC" }}>Statistics</h2>
                                            <div className="row d-flex justify-content-center align-items-center">
                                                <Col lg={6}>
                                                    <Form.Select
                                                        aria-label="Rating"
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    >
                                                        <option value="allTime">All Time</option>
                                                        <option value="1month">Month</option>
                                                        <option value="6month">6 Month</option>
                                                        <option value="year">Year</option>
                                                    </Form.Select>
                                                </Col>
                                                <div>
                                                    <h1 className="m-3 row d-flex justify-content-center align-items-center" >Total Incomes:</h1>
                                                    <h2 className="m-3 row d-flex justify-content-center align-items-center">${totalIncome}</h2>
                                                </div>
                                                <div className="m-3 row d-flex justify-content-center align-items-center">
                                                    <Row>
                                                        <Chart
                                                            chartType="PieChart"
                                                            data={pieData}
                                                            options={options}
                                                            width={"100%"}
                                                            height={"400px"}
                                                        />
                                                    </Row>
                                                </div>
                                            </div>
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

export default Dashboard;
