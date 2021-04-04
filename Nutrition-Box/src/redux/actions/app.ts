import {SET_ISLOGIN, SET_SELFINFO, SET_SHOPPINGCART, SET_ALLPRODUCTION} from '../constants'

import store from '../store/index'

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

export const setAllProduction = (value) => {
    return {
        type: SET_ALLPRODUCTION,
        value
    }
};

// means在true为增加元素到购物车，false则是移除出购物车
export const setShoppingCart = (value: string, means: boolean) => {
    // let list = new Array(...);
    if (means) {
        if (!store().getState().app.shoppingCart.includes(value)) {
            store().getState().app.shoppingCart.push(value)
        }
    } else {
        for (let i = 0; i < store().getState().app.shoppingCart.length; i++) {
            if (store().getState().app.shoppingCart[i] === value) {
                store().getState().app.shoppingCart.splice(i, 1);
                break;
            }
        }
    }
    return {
        type: SET_SHOPPINGCART,
        value: store().getState().app.shoppingCart
    }
};

export const clearShoppingCart = () => {
    while (store().getState().app.shoppingCart.length) {
        store().getState().app.shoppingCart.pop()
    }
    return {
        type: SET_SHOPPINGCART,
        value: store().getState().app.shoppingCart
    }
};