import React, { useEffect, useState } from 'react';

const MyOrderItem = (props) => {
    const [myProductList, setMyProductList] = useState([]);
    const { _id, key, productName, status } = props.orders;

    useEffect(() => {
        fetch('https://whispering-everglades-34016.herokuapp.com/products')
            .then(response => response.json())
            .then(data => setMyProductList(data));
    }, []);
    const userOrder = myProductList.find((packageInfo) => packageInfo._id === key);
    // console.log(userBooking);

    // Delete a Orders
    const deleteMyBooking = id => {
        const proceed = window.confirm("Are you sure, you want to delete this Order?");
        if (proceed) {
            const url = `https://whispering-everglades-34016.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Successfully Deleted Order.");

                    }
                })
        }
    }

    return (
        <div className="col-md-6">
            <div className="card mb-3 border shadow-sm">
                <div className="row align-items-center" style={{ padding: "0px 5px" }}>
                    <div className="col-md-5">
                        <img src={userOrder?.img} className="img-fluid" width="100%" style={{ height: "160px" }} alt="" />
                    </div>

                    <div className="col-md-7 mb-0 ps-0 py-1 align-items-center">
                        <h5 className="fw-bold">{productName}</h5>
                        <h6 className="fw-bold my-0 text-secondary">{userOrder?.price} tk</h6>
                        <p className="my-0">Condition: {userOrder?.carCondition}</p>
                        <p className="my-0">Fuel Type: {userOrder?.fuelType}</p>
                        <p className="mt-0 mb-1">Mileage: {userOrder?.mileage} Kmph</p>

                        <div className="d-flex pb-1 align-items-center">
                            <button style={{ padding: "3px 5px", border: "none", backgroundColor: "crimson", color: "white", borderRadius: "3px", }} onClick={() => deleteMyBooking(_id)} >Cancel</button>
                            <button style={{ padding: "3px 10px", margin: "0 5px", border: "none", backgroundColor: "teal", color: "white", borderRadius: "3px", }}>Pay</button>
                            <p style={{ padding: "6px", borderRadius: "3px", fontSize: "12px" }} className="bg-dark text-white mb-0 fst-italic">{status.toUpperCase()}</p>
                            {/* <h5 className="text-success fst-italic">Approved</h5> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrderItem;