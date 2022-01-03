import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';1
import Spinner from '../Spinner';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading } }) => {


    // if (loading) return <Spinner />;
    console.log(isAuthenticated)
    if (isAuthenticated) return <Component />;

    return <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.loadedUser
});

export default connect(mapStateToProps)(PrivateRoute);
