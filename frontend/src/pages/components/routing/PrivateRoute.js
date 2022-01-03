import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner';

const PrivateRoute = ({ component: Component }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // if (loading) return <Spinner />;
    if (userInfo) return <Component />;

    return <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.loadedUser
});

export default connect(mapStateToProps)(PrivateRoute);
