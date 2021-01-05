import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { recoverPassword } from '../auth';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: 'ranjanjha111@gmail.com',
        error: '',
        success: false
    });

    const { email, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        recoverPassword(email).then(data => {
            if (!data.success) {
                setValues({ ...values, error: data.message, success: false });
            } else {
                setValues({
                    ...values,
                    email: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Password reset link has been sent on your email. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Reset password"
            description=""
            className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {forgotPasswordForm()}
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
