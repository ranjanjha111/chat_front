import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { activateAccount } from '../auth';

const AccountActivation = ({match}) => {
    const [values, setValues] = useState({
        error: '',
        success: false
    });

    const { token } = match.params;
    const { success, error } = values;

    const init = token => {
        activateAccount(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: '', success: true });
            }
        }).catch(err => {
            console.log(err)
            setValues({ ...values, error: err.message, success: false });
        });
    };

    useEffect(() => {
        init(token);
    });

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Your account has been activated. Please <Link to="/signin">Signin</Link>
        </div>
    );
    
    return (
        <Layout
            title="Account activation"
            description=""
            className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                </div>
            </div>
        </Layout>
    );
};

export default AccountActivation;
