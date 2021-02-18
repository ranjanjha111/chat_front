import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { reset, resetPassword } from '../auth';
// import { Redirect } from 'react-router-dom';

const ResetPassword = ({match}) => {
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        error: '',
        success: false
    });

    const { token } = match.params;
    const { password, confirmPassword, success, error } = values;

    const init = token => {
        // console.log(token);
        reset(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
                // setValues({ ...values, error: true });
            } else {
                setValues({ ...values, password: '', confirmPassword: '' });
            }
        }).catch(err => {
            console.log(err)
        });
    };

    const validatePassword = () => {
        if(password !== confirmPassword) {
            setValues({ ...values, error: 'Password and confirm password must be same'})
            return false;
        } else if( password.length < 7) {
            setValues({ ...values, error: 'Password must be atleast 7 character.'})
            return false;
        } else if (password.search(/[0-9]/) < 0) {
            setValues({ ...values, error: 'Password must contain a number'})
            return false;
        }

        setValues({ ...values, error: ''})
        return true;
    }

    useEffect(() => {
        init(token);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();

        if(validatePassword()) {
            resetPassword(token, password).then( data => {
                if(!data.success) {
                    setValues({ ...values, error: data.message, success: false });
                } else {
                    setValues({
                        ...values,
                        success: true
                    });   
                }
            }).catch(error => {
                setValues({ ...values, error: error.message, success: false });
            });
        }
    };

    // const redirectUser = success => {
    //     if (success) {
    //         return <Redirect to="/signin" />;
    //     }
    // };

    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>

            <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input onChange={handleChange('confirmPassword')} type="password" className="form-control" value={confirmPassword} />
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
            Your password has been updated. Please <Link to="/signin">Signin</Link>
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

                    { !success && forgotPasswordForm()}
                </div>
            </div>
        </Layout>
    );
};

export default ResetPassword;
