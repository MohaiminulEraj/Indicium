import axios from "axios";
import Cookies from 'js-cookie'
import {
    SAVE_NFT_DETAILS_REQUEST,
    SAVE_NFT_DETAILS_SUCCESS,
    SAVE_NFT_DETAILS_FAIL,
    NFT_DETAILS_FAIL,
    NFT_DETAILS_REQUEST,
    NFT_DETAILS_SUCCESS,
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