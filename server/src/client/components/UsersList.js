import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions';

class UsersList extends Component {
    componentDidMount () {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(u => (<li key={u.id}>{u.name}</li>))
    }

    render () {
        return (
            <div>
                List of users:
                <ul>{this.renderUsers()}</ul>
            </div>
        )
    }
};
const mapStateToProps = ({ users }) => ({ users }); 

export default connect(mapStateToProps, { fetchUsers})(UsersList);
