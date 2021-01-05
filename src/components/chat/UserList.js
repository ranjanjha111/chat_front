import React, { Component, Fragment } from "react";
import User from './User';

class UserList extends Component {

    onUserSelect = (user) => {
        this.props.userSelect(user)
    }

    renderUserList = () => {
        const {users} = this.props;

        if(users.length === 0) {
            return 'Loading...'
        }

        let selectedClass = '';
        return users.map( (user, index) => {
            selectedClass = user._id === this.props.selectedUserId ? 'active' : '';

            return <User 
                    key={ index } 
                    user={ user } 
                    selectedClass={ selectedClass }
                    onUserSelect={ this.onUserSelect }
                    />
        });
    };

    render() {
        return (
            <Fragment>
                <div id="conversation-list">
                    {this.renderUserList()}
                </div>

                <div id="new-message-container">
                </div>
            </Fragment>
        )
    }
}

export default UserList;