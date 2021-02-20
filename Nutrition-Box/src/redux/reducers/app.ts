import {SET_ISLOGIN, SET_SELFINFO} from '../constants'

import {selfInfoType} from "../../utils/staticType";

type TypeAction = {
    type: string,
    value: any
}

type TYPE_INITIAL_STATE = {
    isLogin: boolean,
    selfInfo: selfInfoType | null
}

const INITIAL_STATE: TYPE_INITIAL_STATE = {
    isLogin: false,
    selfInfo: null
};

export default function app(state: TYPE_INITIAL_STATE = INITIAL_STATE, action: TypeAction): TYPE_INITIAL_STATE {
    switch (action.type) {
        case SET_ISLOGIN: {
            return concatState(state, 'isLogin', action.value)
        }
        case SET_SELFINFO: {
            return concatState(state, 'selfInfo', action.value)
        }
        default: {
            return state
        }
    }
}

function concatState(state, key, val): TYPE_INITIAL_STATE {
    return Object.assign({}, state, {[key]: val})
}