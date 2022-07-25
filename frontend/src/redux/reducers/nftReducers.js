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
    NFT_OWNER_REQUEST,
    NFT_OWNER_SUCCESS,
    NFT_OWNER_FAIL,
} from "../constants/userConstants";

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

export const getNftReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_NFT_REQUEST:
            return { ...state, loading: true }
        case ALL_NFT_SUCCESS:
            return { loading: false, nfts: action.payload }
        case ALL_NFT_FAIL:
            return { loading: false, error: action.payload }
        // case NFT_DETAILS_RESET:
        //     return { nfts: {} }
        default:
            return state
    }
}

export const nftDetailsReducer = (state = { nft: {} }, action) => {
    switch (action.type) {
        case NFT_DETAILS_REQUEST:
        case NFT_OWNER_REQUEST:
            return { ...state, loading: true }
        case NFT_DETAILS_SUCCESS:
        case NFT_OWNER_SUCCESS:
            return { loading: false, nft: action.payload }
        case NFT_DETAILS_FAIL:
        case NFT_OWNER_FAIL:
            return { loading: false, error: action.payload }
        // case NFT_DETAILS_RESET:
        //     return { nft: {} }
        default:
            return state
    }
}