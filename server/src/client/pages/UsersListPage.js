import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { fetchUsers } from '../actions';

class UsersList extends Component {
    componentDidMount () {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(u => (<li key={u.id}>{u.name}</li>))
    }

    head() {
        return (
            <Helmet>
                <title> { `${this.props.users.length} Users loaded` } </title>
                <meta property="og:title" content="Users App" />
            </Helmet>
        );
    }

    render () {
        return (
            <div>
                { this.head() }
                List of users:
                <ul>{this.renderUsers()}</ul>
            </div>
        )
    }
};
const mapStateToProps = ({ users }) => ({ users });

const loadData = (store) => {
    return store.dispatch(fetchUsers());
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers})(UsersList)
};
