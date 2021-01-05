import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
import { listUsers } from "./apiAdmin";
import moment from "moment";

const Users = () => {
    const [users, setUsers] = useState([]);

    const { user, token } = isAuthenticated();

    const loadUsers = () => {
        listUsers(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    useEffect(() => {
        loadUsers();
    });

    const showUsers = () => {
        return users.map((user, i) => {
            return (
                <Fragment>
                    <tr>
                        <th scope="row">{ i + 1 }</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.company}</td>
                        <td>{user.country}</td>
                        <td>{moment(user.last_login).fromNow()}</td>
                    </tr>
                </Fragment>
            )
        });
    }

    const userHtml = () => {
        return (
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Company</th>
                        <th scope="col">Country</th>
                        <th scope="col">Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    {showUsers()}
                </tbody>
            </table>
        )
    }

    const showUsersLength = () => {
        if (users.length > 0) {
            return (
                <h5>
                    Total users: {users.length}
                </h5>
            );
        } else {
            return <h1 className="text-danger">No users</h1>;
        }
    };

    return (
        <Layout
            title="Users"
            description={`G'day ${
                user.name
            }, you can view all the users here`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {userHtml()}
                    {showUsersLength()}                   
                </div>
            </div>
        </Layout>
    );
};

export default Users;
