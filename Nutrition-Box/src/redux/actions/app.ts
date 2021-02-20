import {SET_ISLOGIN, SET_SELFINFO} from '../constants'

export const setIsLogin = (value) => {
    return {
        type: SET_ISLOGIN,
        value
    }
};

export const setSelfInfo = (value) => {
    return {
        type: SET_SELFINFO,
        value
    }
};