import axios from "axios";
import Cookies from 'js-cookie'
import {
    SAVE_NFT_DETAILS_REQUEST,
    SAVE_NFT_DETAILS_SUCCESS,
    SAVE_NFT_DETAILS_FAIL,
    ALL_NFT_REQUEST,
    ALL_NFT_SUCCESS,
    ALL_NFT_FAIL,
    ALL_NFT_RESET,
    NFT_DETAILS_FAIL,
    NFT_DETAILS_REQUEST,
    NFT_DETAILS_SUCCESS,
    NFT_DETAILS_RESET,
    CLEAR_ERRORS
} from "../constants/nftConstants";
import {
    USER_LOGOUT
} from "../constants/userConstants";

export const logout = () => (dispatch) => {
    Cookies.remove('userInfo')
    dispatch({ type: USER_LOGOUT })
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: USER_LIST_RESET })
    document.location.href = '/home'
}


export const saveNftDetails = (id, ipfsDataLink) => async (dispatch) => {
    try {
        dispatch({
            type: SAVE_NFT_DETAILS_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/nfts',
            { id, ipfsDataLink },
            config
        )

        dispatch({
            type: SAVE_NFT_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: SAVE_NFT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getNfts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_NFT_REQUEST,
        })

        // const {
        //     userLogin: { userInfo },
        // } = getState()

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        console.log(id)
        let data = null;
        if (id) {
            data = await axios.get(`http://localhost:5000/api/nfts/owned?userId=${id}`, config)
        }
        else {
            data = await axios.get(`http://localhost:5000/api/nfts/owned`, config)
        }

        dispatch({
            type: ALL_NFT_SUCCESS,
            payload: data.data,
        })
        // NFT_DETAILS_FAIL
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: ALL_NFT_FAIL,
            payload: message,
        })
    }
}

export const getNftDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: NFT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/nfts/${id}`)

        dispatch({
            type: NFT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NFT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}