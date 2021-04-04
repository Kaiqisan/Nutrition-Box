import {SET_ISLOGIN, SET_SELFINFO, SET_SHOPPINGCART, SET_ALLPRODUCTION} from '../constants'

import {selfInfoType} from "../../utils/staticType";
import {nutritionListType} from '../../utils/staticType'

type TypeAction = {
    type: string,
    value: any,
}

type TYPE_INITIAL_STATE = {
    isLogin: boolean,
    selfInfo: selfInfoType | null,
    shoppingCart: string[],
    allProduction: Array<nutritionListType>
}

const INITIAL_STATE: TYPE_INITIAL_STATE = {
    isLogin: false,
    selfInfo: null,
    shoppingCart: [],
    allProduction: []
};

export default function app(state: TYPE_INITIAL_STATE = INITIAL_STATE, action: TypeAction): TYPE_INITIAL_STATE {
    switch (action.type) {
        case SET_ISLOGIN: {
            return concatState(state, 'isLogin', action.value)
        }
        case SET_SELFINFO: {
            return concatState(state, 'selfInfo', action.value)
        }
        case SET_SHOPPINGCART: {
            return concatState(state, 'shoppingCart', action.value)
        }
        case SET_ALLPRODUCTION: {
            return concatState(state, 'allProduction', action.value)
        }
        default: {
            return state
        }
    }
}

function concatState(state, key, val): TYPE_INITIAL_STATE {
    return Object.assign({}, state, {[key]: val})
}