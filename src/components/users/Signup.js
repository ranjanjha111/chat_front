import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        company: '',
        country: '',
        error: '',
        isDisabled: true,
        success: false
    });

    const { name, email, password, confirm_password, company, country, success, isDisabled, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const verifySingupButton = (isChecked = false) => {
        if(name && email && password && company && country && isChecked) {
            setValues({...values, isDisabled: false})
        }else {
            setValues({...values, isDisabled: true})
        }
    }

    const handleBlur = (event) => {
        if(password !== confirm_password) {
            setValues({ ...values, error: 'Confirm password not match with password.', success: false });
        }

        verifySingupButton()
    };

    const handleCheckBox = (event) => {
        if(event.target.checked) {
            verifySingupButton(true)
        } else {
            verifySingupButton(false)
        }
    }

    const clickSubmit = event => {
        event.preventDefault();

        signup({ name, email, password, company, country }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    company: '',
                    country: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onBlur={handleBlur} onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Company</label>
                <input onBlur={handleBlur} onChange={handleChange('company')} type="text" className="form-control" value={company} />
            </div>

            {/* <div className="form-group">
                <label className="text-muted">Country</label>
                <input onBlur={handleBlur} onChange={handleChange('country')} type="text" className="form-control" value={country} />
            </div> */}

            <div className="form-group">
                <label className="text-muted">Country</label>
                <select className="form-control" onChange={handleChange('country')}>
                    <option value="0">Select Country</option>
                    <option value="USA">U.S.A.</option>
                    <option value="UK">U.K.</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                </select>
                {/* <input onBlur={handleBlur} onChange={handleChange('country')} type="text" className="form-control" value={country} /> */}
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onBlur={handleBlur} onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onBlur={handleBlur} onChange={handleChange('confirm_password')} type="password" className="form-control" value={confirm_password} />
            </div>
            <div className="form-group">
                {/* <input onChange={() => handleCheckBox(!term_and_condition)} type="checkbox" value={term_and_condition} /> */}
                <input type="checkbox" onChange={handleCheckBox} />

                <label className="text-muted">Term & condition</label>
            </div>
            <button onClick={clickSubmit} disabled={isDisabled} className="btn btn-primary">
                Sign Up
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
            Your account is created. An activation email has been sent. Please activate your account before login. 
            {/* <Link to="/signin">Signin</Link> */}
        </div>
    );

    return (
        <Layout
            title="Signup"
            description=""
            className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {signUpForm()}
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
