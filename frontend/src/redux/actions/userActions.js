import axios from "axios";
import Cookies from 'js-cookie'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    VERIFY_USER_REQUEST,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from "../constants/userConstants";

export const login = (email, password, rememberMe) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password, rememberMe }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        Cookies.set('userInfo', JSON.stringify(data), { expires: rememberMe ? 30 : 1 })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    Cookies.remove('userInfo')
    dispatch({ type: USER_LOGOUT })
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: USER_LIST_RESET })
    document.location.href = '/home'
}

export const register = (email, password, rememberMe) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/users',
            { email, password, rememberMe },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        Cookies.set('userInfo', JSON.stringify(data), { expires: rememberMe ? 30 : 1 })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/profile`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // })
        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

// Loader user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/profile/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: LOAD_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const verifyEmail = (code) => async (dispatch) => {
    try {
        dispatch({
            type: VERIFY_USER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const userInfoFromCookies = Cookies.get('userInfo')
            ? JSON.parse(Cookies.get('userInfo'))
            : null
        const userEmail = userInfoFromCookies ? userInfoFromCookies.email : null
        console.log(userEmail)
        const { data } = await axios.post(
            '/api/users/verify-email',
            { code, userEmail },
            config
        )

        document.location.href = '/update-profile'
        dispatch({
            type: VERIFY_USER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: VERIFY_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

// Forgot Password action
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/forgot-password', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
// Reset Password action
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/reset-password${token}`, passwords, config)

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
