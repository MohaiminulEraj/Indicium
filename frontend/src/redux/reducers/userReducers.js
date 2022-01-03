import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

// Auth Reducers
export const authReducer = (state = { isAuthenticated: null, loading: true, user: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    // case ACCOUNT_DELETED:
    // case AUTH_ERROR:
    // case LOGOUT:
    //   return {
    //     ...state,
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false,
    //     user: null
    //   };
    default:
      return state;
  }
}

// Load user reducer
export const loadedUserReducer = (state = { loading: true, isAuthenticated: false, user: null }, action) => {
  switch (action.type) {

    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      }

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload
      }
    default:
      return state
  }
}


export const verifyUserReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_USER_REQUEST:
      return { loading: true }
    case VERIFY_USER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case VERIFY_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true }
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}