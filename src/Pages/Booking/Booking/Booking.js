import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';

const Booking = () => {
    const { user, admin } = useAuth();
    const { id } = useParams();
    const [bookingInfo, setBookingInfo] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch("https://whispering-everglades-34016.herokuapp.com/products")
            .then(response => response.json())
            .then(data => setBookingInfo(data))
    }, []);

    const bookingProduct = bookingInfo.find(product => product._id === id);

    const onSubmit = data => {
        const key = bookingProduct?._id;
        const status = "Pending...";
        const img = bookingProduct?.img;
        data.status = status;
        data.key = key;
        data.img = img;
        // console.log(data);
        axios.post("https://whispering-everglades-34016.herokuapp.com/orders", data)
            .then(res => {
                if (res.data.insertedId) {
                    alert("Order Confirmed Successfully");
                    // RESET FORM
                    reset();
                }
            })
    };


    return (
        <>
            <Header></Header>
            <div className="container my-3">
                <div className="row g-5 py-4">
                    <div className="col-md-6">


                        <img src={bookingProduct?.img} className="img-fluid img-thumbnail" width="100%" alt="Not Found Product Banner" />
                        <h3 className="fw-bold mt-1">{bookingProduct?.name}</h3>

                        <p style={{ padding: "2px 5px", borderRadius: "3px", fontSize: "13px" }} className="fw-bold me-2 bg-danger d-inline text-white">{bookingProduct?.carCondition.toUpperCase()}</p>

                        <p style={{ padding: "2px 5px", borderRadius: "3px", fontSize: "13px" }} className="fw-bold me-2 bg-success d-inline text-white"><SpeedIcon style={{ fontSize: "20px", marginBottom: "3px", marginLeft: "-4px" }} />{bookingProduct?.mileage.toUpperCase()} Km</p>

                        <p style={{ padding: "2px 5px", borderRadius: "3px", fontSize: "13px" }} className="fw-bold me-2 bg-primary d-inline text-white"><LocalGasStationIcon style={{ fontSize: "20px", marginBottom: "3px", marginLeft: "-4px" }} />{bookingProduct?.fuelType.toUpperCase()}</p>

                        <p className="text-secondary my-1">{bookingProduct?.description}</p>
                        <h3 className="fw-bold text-secondary">{bookingProduct?.price} tk</h3>
                    </div>


                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)}>


                            <div className="form-floating mb-2">
                                <input
                                    {...register("userName")}
                                    defaultValue={user?.displayName}
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    placeholder="Name"
                                    readOnly />
                                <label htmlFor="userName">Name</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input
                                    {...register("userEmail")}
                                    defaultValue={user?.email}
                                    type="email"
                                    className="form-control"
                                    id="userEmail"
                                    placeholder="Email"
                                    readOnly />
                                <label htmlFor="userEmail">Email</label>
                            </div>

                            {bookingProduct?.name &&
                                <div className="form-floating mb-2">
                                    <input
                                        {...register("productName")}
                                        defaultValue={bookingProduct?.name}
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        placeholder="Product Name"
                                        readOnly />
                                    <label htmlFor="productName">Product Name</label>
                                </div>
                            }

                            <div className="form-floating mb-2">
                                <input
                                    {...register("address")}
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="Address"
                                    required />
                                <label htmlFor="address">Address</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input
                                    {...register("phoneNumber")}
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    required />
                                <label htmlFor="phoneNumber">Phone Number</label>
                            </div>

                            {admin ? <p className="bg-dark text-white p-2 text-center rounded">Admin Can't Make Order</p> : <input className="btn btn-dark w-100" type="submit" value="Confirm Order" />}
                        </form>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Link to="/exploreproducts">
                        <button className="btn btn-secondary">Explore Other Products</button>
                    </Link>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Booking;