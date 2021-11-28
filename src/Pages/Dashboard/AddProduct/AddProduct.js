import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const AddProduct = () => {
    const { admin } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post("https://whispering-everglades-34016.herokuapp.com/products", data)
            .then(res => {
                if (res.data.insertedId) {
                    alert("New Product Successfully Added");

                    // RESET FORM
                    reset();
                }
            })
    };


    return (
        <>
            <div className="w-75 mx-auto text-center">
                <h3 className="text-success fst-italic fw-bold">Add a new Product</h3>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-floating mb-2">
                            <input
                                {...register("name")}
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Product Name"
                                required />
                            <label for="name">Product Name</label>
                        </div>

                        <div class="form-floating mb-2">
                            <input
                                {...register("description")}
                                type="text"
                                class="form-control"
                                id="description"
                                placeholder="Short Description"
                                required />
                            <label for="description">Short Description</label>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <div class="form-floating mb-2">
                                    <input
                                        {...register("price")}
                                        type="number"
                                        class="form-control"
                                        id="price"
                                        placeholder="Product Price"
                                        required />
                                    <label for="price">Product Price</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="form-floating mb-2">
                                    <input
                                        {...register("mileage")}
                                        type="number"
                                        class="form-control"
                                        id="mileage"
                                        placeholder="Mileage"
                                        required />
                                    <label for="mileage">Mileage</label>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <div class="form-floating mb-2">
                                    <input
                                        {...register("carCondition")}
                                        type="text"
                                        class="form-control"
                                        id="carCondition"
                                        placeholder="Car Condition (Ex: Brand New)"
                                        required />
                                    <label for="carCondition">Car Condition (Ex: Brand New)</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="form-floating mb-2">
                                    <input
                                        {...register("fuelType")}
                                        type="text"
                                        class="form-control"
                                        id="fuelType"
                                        placeholder="Fuel Type (Ex: Petrol)"
                                        required />
                                    <label for="fuelType">Fuel Type (Ex: Petrol)</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-floating mb-2">
                            <input
                                {...register("img")}
                                type="text"
                                class="form-control"
                                id="img"
                                placeholder="Image URL"
                                required />
                            <label for="img">Image URL</label>
                        </div>

                        {admin ? <input className="btn btn-dark w-100" type="submit" value="Add Package" />
                            : <p className="bg-dark text-white p-2 text-center rounded">User Can't Add Product</p>}

                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;