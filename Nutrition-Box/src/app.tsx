import React, {Component, ComponentClass} from 'react'
import {Provider, connect} from 'react-redux'
// import {connect} from 'react-redux'
import Taro from '@tarojs/taro'

import configStore from './redux/store'

import './app.less'
import 'taro-ui/dist/style/index.scss'

import {setIsLogin, setSelfInfo} from './redux/actions/app'

import {selfInfoType} from "./utils/staticType";

const store = configStore();

type PageStateProps = {
    // app: {
    //     isLogin: boolean,
    //     selfInfo: selfInfoType
    // }
}

type PageDispatchProps = {
    setIsLogin: (val: boolean) => void,
    setSelfInfo: (val: selfInfoType) => void
}

type IProps = PageStateProps & PageDispatchProps

type PageState = {
    // payment: Array<{ icon: string, word: string }>,
    // serviceList: Array<any>
}

// @connect(() => ({}), (dispatch) => ({
//     setIsLogin(val) {
//         dispatch(setIsLogin(val))
//     },
//     setSelfInfo(val) {
//         dispatch(setSelfInfo(val))
//     }
// }))
class App extends Component<IProps, PageState> {
    componentDidMount() {
        // new Promise((resolve) => {
        //     Taro.getStorage({
        //         key: 'openid',
        //         success() {
        //             resolve(true)
        //         },
        //         // fail() {
        //         //     resolve(false)
        //         // }
        //     }).catch(() => {
        //     })
        // }).then(res => {
        //     if (res) {
        //         this.getInfo()
        //     }
        // })
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    componentDidCatchError() {
    }

    getInfo() {
        // Taro.getUserInfo({
        //     success: (res) => {
        //         console.log(res);
        //         let userInfo = res.userInfo;
        //         setSelfInfo({nick: userInfo.nickName, avatarUrl: userInfo.avatarUrl});
        //         setIsLogin(true);
        //     }
        // }).then()


        // wx.getUserProfile({
        //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        //     success: (res) => {
        //         console.log(res);
        //         // this.setData({
        //         //     userInfo: res.userInfo,
        //         //     hasUserInfo: true
        //         // })
        //     }
        // })
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default App as ComponentClass<IProps, PageState>
