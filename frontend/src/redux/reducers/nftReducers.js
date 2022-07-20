import {
    SAVE_NFT_DETAILS_REQUEST,
    SAVE_NFT_DETAILS_SUCCESS,
    SAVE_NFT_DETAILS_FAIL,
    NFT_DETAILS_FAIL,
    NFT_DETAILS_REQUEST,
    NFT_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/nftConstants";

export const saveNftReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_NFT_DETAILS_REQUEST:
            return { loading: true }
        case SAVE_NFT_DETAILS_SUCCESS:
            return { loading: false, nftDetails: action.payload }
        case SAVE_NFT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}