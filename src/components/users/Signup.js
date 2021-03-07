import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import { Link } from 'react-router-dom';

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        company: '',
        country: '',
        tc: false,
        isDisabled: true,
        error: '',
        success: false
    };

    // const { name, email, password, confirm_password, company, country, success, isDisabled, error } = values;

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, error: false });
    };

    verifySingupButton = () => {
        const { name, email, password, company, country, tc } = this.state;
        if (name && email && password && company && country && tc) {
            console.log(this.state)
            this.setState({ isDisabled: false })
        } else {
            this.setState({ isDisabled: true })
        }
    }

    handleBlur = (event) => {
        const { password, confirm_password } = this.state;
        if (password !== confirm_password) {
            this.setState({ error: 'Confirm password not match with password.', success: false });
        }

        this.verifySingupButton()
    };

    handleCheckBox = (event) => {
        this.setState({ tc: event.target.checked }, () => {
            this.verifySingupButton()
        })

    }

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password, company, country } = this.state;
        signup({ name, email, password, company, country }).then(data => {
            if (data.error) {
                this.setState({ error: data.error, success: false });
            } else {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    company: '',
                    country: '',
                    error: '',
                    tc: false,
                    success: true,
                    isDisabled: true
                });
            }
        });
    };

    signUpForm = () => {
        const { name, email, password, confirm_password, company, tc, isDisabled } = this.state;
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onBlur={this.handleBlur} onChange={this.handleChange('name')} type="text" className="form-control" value={name} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Company</label>
                    <input onBlur={this.handleBlur} onChange={this.handleChange('company')} type="text" className="form-control" value={company} />
                </div>

                {/* <div className="form-group">
                    <label className="text-muted">Country</label>
                    <input onBlur={this.handleBlur} onChange={this.handleChange('country')} type="text" className="form-control" value={country} />
                </div> */}

                <div className="form-group">
                    <label className="text-muted">Country</label>
                    <select className="form-control" onChange={this.handleChange('country')} onBlur={this.handleBlur}>
                        <option value="0">Select Country</option>
                        <option value="USA">U.S.A.</option>
                        <option value="UK">U.K.</option>
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                    </select>
                    {/* <input onBlur={this.handleBlur} onChange={this.handleChange('country')} type="text" className="form-control" value={country} /> */}
                </div>

                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onBlur={this.handleBlur} onChange={this.handleChange('email')} type="email" className="form-control" value={email} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange('password')} type="password" className="form-control" value={password} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Confirm Password</label>
                    <input onBlur={this.handleBlur} onChange={this.handleChange('confirm_password')} type="password" className="form-control" value={confirm_password} />
                </div>
                <div className="form-group">
                    {/* <input onChange={this.() => handleCheckBox(!term_and_condition)} type="checkbox" value={term_and_condition} /> */}
                    <input
                        type="checkbox"
                        checked={tc}
                        onChange={this.handleCheckBox}
                    />

                    <label className="text-muted">
                        <Link to="term-and-conditions">&nbsp; Term & Conditions</Link>
                    </label>
                </div>
                <button onClick={this.clickSubmit} disabled={isDisabled} className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        )
    };

    showError = () => (
        <div className="alert alert-danger" style={{ display: this.state.error ? '' : 'none' }}>
            {this.state.error}
        </div>
    );

    showSuccess = () => (
        <div className="alert alert-info" style={{ display: this.state.success ? '' : 'none' }}>
            Your account is created. An activation email has been sent. Please activate your account before login.
            {/* <Link to="/signin">Signin</Link> */}
        </div>
    );

    render() {
        return (
            <Layout
                title="Signup"
                description=""
                className="container col-md-8 offset-md-2"
            >
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {this.showSuccess()}
                        {this.showError()}
                        {this.signUpForm()}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Signup;
