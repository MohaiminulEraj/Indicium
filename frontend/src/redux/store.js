import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    coverPhotoUpdateReducer,
    verifyUserReducer,
    // loadedUserReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    // authReducer,
} from './reducers/userReducers'
import {
    saveNftReducer,
    getNftReducer,
    nftDetailsReducer
} from './reducers/nftReducers'
import { alertReducer } from './reducers/alert'
import Cookies from 'js-cookie'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    coverPhotoUpdate: coverPhotoUpdateReducer,
    verifyUser: verifyUserReducer,
    // loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    // resetPassword: resetPasswordReducer,
    alert: alertReducer,
    // auth: authReducer
    // NFT
    saveNft: saveNftReducer,
    getNft: getNftReducer,
    nftDetails: nftDetailsReducer,
})

const userInfoFromCookies = Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null
const initialState = {
    userLogin: { userInfo: userInfoFromCookies },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store