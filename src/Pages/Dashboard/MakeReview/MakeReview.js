import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import review2 from '../../../images/review2.png';
import axios from 'axios';

const MakeReview = () => {
    const { user, admin } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        axios.post("https://whispering-everglades-34016.herokuapp.com/reviews", data)
            .then(res => {
                if (res.data.insertedId) {
                    alert("Your Review Successfully Posted");

                    // RESET FORM
                    reset();
                }
            })
    };

    return (
        <div className="text-center">
            <div className="row g-3 align-items-center">

                <div className="col-md-8">
                    <h3 className="fst-italic fw-bold text-success">Make a Review</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-floating mb-2">
                            <input
                                {...register("name")}
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Name"
                                defaultValue={user?.displayName}
                                required
                                readOnly />
                            <label for="name">Name</label>
                        </div>

                        <div class="form-floating mb-2">
                            <input
                                {...register("profession")}
                                type="text"
                                class="form-control"
                                id="profession"
                                placeholder="profession"
                                required />
                            <label for="profession">Profession</label>
                        </div>

                        <div class="form-floating mb-2">
                            <input
                                {...register("rating")}
                                type="number"
                                class="form-control"
                                id="rating"
                                step="any"
                                placeholder="Rating Out of 5"
                                required />
                            <label for="rating">Rating Out of 5</label>
                        </div>

                        <div class="mb-2">
                            <textarea
                                {...register("review")}
                                type="text"
                                className="form-control"
                                placeholder="Write Your Valuable Review"
                                rows="3"
                                required />
                        </div>

                        {admin ? <p className="bg-dark text-white p-2 text-center rounded">Admin Can't Post Review</p> : <input className="btn btn-dark w-100" type="submit" value="Post Review" />}

                    </form>
                </div>

                <div className="col-md-4">
                    <img src={review2} className="img-fluid" width="100%" alt="" />
                </div>
            </div>
        </div>
    );
};

export default MakeReview;