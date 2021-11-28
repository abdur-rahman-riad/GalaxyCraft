import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const { admin } = useAuth();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlur = event => {
        setEmail(event.target.value);
    }

    const handleAdminSubmit = event => {
        event.preventDefault();
        const user = { email };
        fetch("https://whispering-everglades-34016.herokuapp.com/users/admin", {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                }
                console.log(data);
            })

        document.getElementById('emailId').value = "";
    }

    return (
        <div className="text-center">
            <h3 className="fst-italic fw-bold text-success">Make a New Admin</h3>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">

                    <form onSubmit={handleAdminSubmit}>

                        <div className="mb-3">
                            <TextField
                                fullWidth
                                id="emailId"
                                type="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                onBlur={handleOnBlur}
                                required
                            />
                        </div>

                        {admin ? <div>
                            <Button
                                className="mb-3"
                                type="submit"
                                fullWidth
                                variant="contained"
                            >Add</Button>
                        </div> :
                            <p className="bg-dark text-white p-2 text-center rounded">User Can't Make Admin</p>
                        }

                    </form>

                    {success && <Alert severity="success">Admin Made Successfully</Alert>}

                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
};

export default MakeAdmin;