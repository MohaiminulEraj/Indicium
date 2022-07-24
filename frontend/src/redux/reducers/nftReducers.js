import {
    SAVE_NFT_DETAILS_REQUEST,
    SAVE_NFT_DETAILS_SUCCESS,
    SAVE_NFT_DETAILS_FAIL,
    NFT_DETAILS_FAIL,
    NFT_DETAILS_REQUEST,
    NFT_DETAILS_SUCCESS,
    NFT_DETAILS_RESET,
    CLEAR_ERRORS
} from "../constants/nftConstants";

export const saveNftReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_NFT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SAVE_NFT_DETAILS_SUCCESS:
            return { loading: false, nftDetails: action.payload }
        case SAVE_NFT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ownedNftReducer = (state = {}, action) => {
    switch (action.type) {
        case NFT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case NFT_DETAILS_SUCCESS:
            return { loading: false, nft: action.payload }
        case NFT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        // case NFT_DETAILS_RESET:
        //     return { nft: {} }
        default:
            return state
    }
}