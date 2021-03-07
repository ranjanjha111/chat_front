import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './components/users/Signin'
import Signup from './components/users/Signup';
import AccountActivation from './components/users/AccountActivation'
import Home from './components/core/Home';
import About from './components/pages/About';
import Contact from './components/contact/Contact';
import TermAndCondition from './components/pages/TermAndCondition';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './components/users/UserDashboard';
import Profile from './components/users/Profile';
import ForgotPassword from './components/users/ForgotPassword';
import ResetPassword from './components/users/ResetPassword';
import AdminRoute from './components/auth/AdminRoute';
import AdminDashboard from './components/users/AdminDashboard';
import Users from './components/admin/Users';
import Chat from './components/chat/Chat';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/activate/:token' exact component={AccountActivation} />
                <Route path='/auth/recover' exact component={ForgotPassword} />
                <Route path='/auth/reset/:token' exact component={ResetPassword} />
                <Route path='/about' exact component={About} />
                <Route path='/contact' exact component={Contact} />
                <Route path='/term-and-conditions' exact component={TermAndCondition} />

                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/users" exact component={Users} />
                <PrivateRoute path="/chat" exact component={Chat} />
                <PrivateRoute path="/chat/:userId" exact component={Chat} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;