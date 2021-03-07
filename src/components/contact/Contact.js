import React, { Component } from 'react';
import Layout from '../core/Layout';
import { contactUs } from './apiContact';
import { isAuthenticated } from "../auth";

class Contact extends Component {
    state = {
        company: '',
        subject: '',
        message: '',
        userId: '',
        error: '',
        success: false
    }

    componentDidMount() {
        const { user, token } = isAuthenticated();
        if (user) {
            this.setState({ userId: user._id, company: user.company })
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, error: false });
    };

    contactForm = () => {
        const { company, subject, message } = this.state;
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Company</label>
                    <input
                        type="text"
                        onChange={this.handleChange('company')}
                        className="form-control"
                        value={company}
                        style={{ width: '300px' }}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Subject</label>
                    <input
                        type="text"
                        onChange={this.handleChange('subject')}
                        className="form-control"
                        value={subject}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Message</label>
                    <textarea
                        className="form-control"
                        value={message}
                        onChange={this.handleChange('message')}
                        rows="8"
                        cols="5"
                    />
                </div>

                <button onClick={this.clickSubmit} className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    }

    showError = () => (
        <div className="alert alert-danger" style={{ display: this.state.error ? '' : 'none' }}>
            {this.state.error}
        </div>
    );

    showSuccess = () => (
        <div className="alert alert-info" style={{ display: this.state.success ? '' : 'none' }}>
            Thank you for contacting us. We will get back to you shortly.
        </div>
    );

    clickSubmit = event => {
        event.preventDefault();
        const { company, subject, message, userId } = this.state;
        contactUs({ company, subject, message, userId }).then(data => {
            if (data.error) {
                this.setState({ error: data.error, success: false });
            } else {
                this.setState({
                    subject: '',
                    message: '',
                    error: '',
                    success: true,
                });
            }
        });
    };

    render() {
        return (
            <Layout title="Contact" description="">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {this.showSuccess()}
                        {this.showError()}
                        {this.contactForm()}
                    </div>
                </div>
            </Layout>
        );
    }
}
export default Contact;