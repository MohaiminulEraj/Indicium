import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    verifyUserReducer,
    loadedUserReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    authReducer,
} from './reducers/userReducers'
import { alertReducer } from './reducers/alert'
import Cookies from 'js-cookie'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    verifyUser: verifyUserReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    alert: alertReducer,
    auth: authReducer
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