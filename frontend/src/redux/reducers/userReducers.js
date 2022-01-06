import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
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
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  UPDATE_COVER_PHOTO_REQUEST,
  UPDATE_COVER_PHOTO_SUCCESS,
  UPDATE_COVER_PHOTO_FAIL,
  // UPDATE_COVER_PHOTO_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_ERRORS
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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
        // isUpdated: action.payload
      }
    case USER_UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case USER_UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {}
    default:
      return state
  }
}

export const coverPhotoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COVER_PHOTO_REQUEST:
      return { loading: true }
    case UPDATE_COVER_PHOTO_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case UPDATE_COVER_PHOTO_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// export const forgotPasswordReducer = (state = {}, action) => {
//   switch (action.type) {
//     case FORGOT_PASSWORD_REQUEST:
//       return { loading: true }
//     case FORGOT_PASSWORD_SUCCESS:
//       return { loading: false, userInfo: action.payload }
//     case FORGOT_PASSWORD_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {

    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      }

    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload
      }

    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}


// // Auth Reducers
// export const authReducer = (state = { isAuthenticated: null, loading: true, user: null }, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case LOAD_USER_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         loading: false,
//         user: payload
//       };
//     case USER_REGISTER_SUCCESS:
//     case USER_LOGIN_SUCCESS:
//       return {
//         ...state,
//         ...payload,
//         isAuthenticated: true,
//         loading: false
//       };
//     // case ACCOUNT_DELETED:
//     // case AUTH_ERROR:
//     // case LOGOUT:
//     //   return {
//     //     ...state,
//     //     token: null,
//     //     isAuthenticated: false,
//     //     loading: false,
//     //     user: null
//     //   };
//     default:
//       return state;
//   }
// }

// // Load user reducer
// export const loadedUserReducer = (state = { loading: true, isAuthenticated: false, user: null }, action) => {
//   switch (action.type) {

//     case LOAD_USER_REQUEST:
//       return {
//         loading: true,
//         isAuthenticated: false
//       }

//     case LOAD_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: true,
//         user: action.payload
//       }

//     case LOAD_USER_FAIL:
//       return {
//         loading: false,
//         isAuthenticated: false,
//         error: action.payload
//       }
//     default:
//       return state
//   }
// }


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


// export const resetPasswordReducer = (state = {}, action) => {
//   switch (action.type) {
//     case RESET_PASSWORD_REQUEST:
//       return { loading: true }
//     case RESET_PASSWORD_SUCCESS:
//       return { loading: false, userInfo: action.payload }
//     case RESET_PASSWORD_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }