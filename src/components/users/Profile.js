import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        company: '',
        country: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, company, country, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
                // setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email, company: data.company, country: data.country });
            }
        }).catch(err => {
            console.log(err)
        }); 
    };

    useEffect(() => {
        init(match.params.userId);
    });

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password, company, country }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
                // console.log(data.error);
                // alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        company: data.company,
                        country: data.country,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/user/dashboard" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} readOnly />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Company</label>
                <input type="text" onChange={handleChange('company')} className="form-control" value={company} />
            </div>
            <div className="form-group">
                <label className="text-muted">Country</label>
                <input type="text" onChange={handleChange('country')} className="form-control" value={country} />
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

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {profileUpdate(name, email, password, company, country)}
                    {redirectUser(success)}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
