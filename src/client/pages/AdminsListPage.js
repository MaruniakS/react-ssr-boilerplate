import React, { Component } from 'react';
import { connect } from 'react-redux';

import requireAuth from '../components/hocs/requireAuth';

import { fetchAdmins } from '../actions';
import { wasFetchedInitially } from '../helpers/initialPath';

class AdminsList extends Component {
    componentDidMount () {
        if (!wasFetchedInitially(this.props.route.path)) {
            this.props.fetchAdmins();
        }
    }

    renderAdmins() {
        return this.props.admins.map(a => (<li key={a.id}>{a.name}</li>))
    }

    render () {
        return (
            <div>
                <h3>List of admins:</h3>
                <ul>{this.renderAdmins()}</ul>
            </div>
        )
    }
};
const mapStateToProps = ({ admins }) => ({ admins });

export default {
    loadData: ({ dispatch }) => dispatch(fetchAdmins()),
    component: connect(mapStateToProps, { fetchAdmins })(
        requireAuth(AdminsList)
    )
};
