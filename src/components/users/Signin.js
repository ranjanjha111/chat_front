import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

class Signin extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        rememberMe: false,
        loading: false,
        redirectToReferrer: false,
        user: {}
    };

    // const { email, password, loading, error, rememberMe, redirectToReferrer } = values;
    // const { user } = isAuthenticated();

    componentDidMount() {
        const { user } = isAuthenticated();
        this.setState({user})
        if(!user && localStorage.rememberMe && localStorage.email !== '') {
            this.setState({
                email: localStorage.email,
                password: localStorage.password,
                rememberMe: true
            })
        }
    }

    // componentDidUpdate(preProps, preState) {
    //     if(this.state.rememberMe !== preState.rememberMe) {
    //         this.setState({rememberMe: this.state.rememberMe})
    //     }
    // }

    handleChange = name => event => {
        this.setState({ error: false, [name]: event.target.value });
    };

    toggleRememberMe = (event) => {
        this.setState({rememberMe: event.target.checked}, () => {
            console.log(this.state.rememberMe)
        })
    }

    formSubmit = event => {
        event.preventDefault();
        // setValues({ ...values, error: false, loading: true });
        const { email, password, rememberMe } = this.state;

        signin({ email, password }).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                if(rememberMe) {
                    localStorage.email = email
                    localStorage.password = password
                    localStorage.rememberMe = rememberMe
                } else {
                    localStorage.clear();
                }
                authenticate(data, () => {
                    this.setState({
                        email,
                        password,
                        rememberMe,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    signinForm = () => {
        const { email, password, rememberMe } = this.state;
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        onChange={this.handleChange("email")}
                        type="email"
                        className="form-control"
                        value={email}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                        onChange={this.handleChange("password")}
                        type="password"
                        className="form-control"
                        value={password}
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="checkbox" 
                        // className="form-control" 
                        checked={rememberMe}
                        placeholder="Remember Me" 
                        onChange={this.toggleRememberMe} 
                    />
                    <label htmlFor="text-muted"> &nbsp; Remember me</label>
                </div>
                <div className="form-group">
                    <Link to="/auth/recover">Forgot Password</Link>
                </div>
                <button onClick={this.formSubmit} className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    };

    showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
        >
            {this.state.error}
        </div>
    );

    showLoading = () =>
        this.state.loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    redirectUser = () => {
        const { user } = this.state
        if (this.state.redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    render() {
        return (
            <Layout
                title="Signin"
                description=""
                className="container col-md-8 offset-md-2"
            >
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {this.showLoading()}
                        {this.showError()}
                        {this.signinForm()}
                        {this.redirectUser()}
                    </div>
                </div>
            </Layout>
        );
    }
};

export default Signin;
