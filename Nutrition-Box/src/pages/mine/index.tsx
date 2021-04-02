import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {Button, Image, Text, View, OpenData} from "@tarojs/components";
import * as React from "react";
import Taro from '@tarojs/taro'

import api from '../../services/api'

import {setIsLogin, setSelfInfo} from '../../redux/actions/app'

import ListItem from "../../components/ListItem";

import {selfInfoType} from "../../utils/staticType";

type PageStateProps = {
    app: {
        isLogin: boolean,
        selfInfo: selfInfoType
    }
}

type PageDispatchProps = {
    setIsLogin: (val: boolean) => void,
    setSelfInfo: (val: selfInfoType) => void
}

type IProps = PageStateProps & PageDispatchProps

type PageState = {
    payment: Array<{ icon: string, word: string }>,
    serviceList: Array<any>
}

interface Mine {
    props: IProps,
}

@connect(({app}) => ({
    app
}), (dispatch) => ({
    setIsLogin(val) {
        dispatch(setIsLogin(val))
    },
    setSelfInfo(val) {
        dispatch(setSelfInfo(val))
    }
}))
class Mine extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            payment: [
                {
                    icon: require('../../assets/images/to-be-paid.png'),
                    word: '待付款'
                },
                {
                    icon: require('../../assets/images/to-be-sent.png'),
                    word: '待发货'
                },
                {
                    icon: require('../../assets/images/to-be-received.png'),
                    word: '待收货'
                },
                {
                    icon: require('../../assets/images/refund.png'),
                    word: '退款/售后'
                },
            ],
            serviceList: [
                {
                    iconUrl: require('../../assets/images/gift.png'),
                    leftText: '送礼',
                    rightText: ''
                },
                {
                    iconUrl: require('../../assets/images/gift.png'),
                    leftText: '优惠券',
                    rightText: '使用优惠券兑换'
                },
                {
                    iconUrl: require('../../assets/images/gift.png'),
                    leftText: '服务说明',
                    rightText: ''
                },
                {
                    iconUrl: require('../../assets/images/gift.png'),
                    leftText: '常见问题',
                    rightText: ''
                },
                {
                    iconUrl: require('../../assets/images/gift.png'),
                    leftText: '联系客服',
                    rightText: '9:00-22:00'
                },
                {
                    iconUrl: require('../../assets/images/gift.png'),
                    leftText: '加入我们',
                    rightText: ''
                }
            ]
        }
    }

    login() {
        wx.showModal({
            title: '小贴士',
            content: '如果要体验完整的功能，需要点击获取头像昵称来授权小程序使用哦',
            showCancel: false,
            confirmText: '已知悉',
            success(res) {
                // ...
            }
        });

        let _this: Mine = this;
        Taro.login({
            success(res) {
                console.log(res, 'dd');
                // let userInfo = res.userInfo;
                // _this.props.setSelfInfo({nick: userInfo.nickName, avatarUrl: userInfo.avatarUrl});
                // _this.props.setIsLogin(true);
                // console.log(res);
                // let nickName = userInfo.nickName;
                // let avatarUrl = userInfo.avatarUrl;
                // let gender = userInfo.gender; //性别 0：未知、1：男、2：女
                // let province = userInfo.province;
                // let city = userInfo.city;
                // let country = userInfo.country;
                // TODO 完善登录
                api.get('/user/login', {code: res.code}).then(res => {
                    console.log(res.data);
                    Taro.setStorage({
                        data: String(res.data.openid),
                        key: "openid",
                    });
                    Taro.setStorage({
                        data: String(res.data.sessionKey),
                        key: "sessionKey",
                    });
                    Taro.getUserInfo({
                        success(res) {
                            let userInfo = res.userInfo;
                            _this.props.setSelfInfo({nick: userInfo.nickName, avatarUrl: userInfo.avatarUrl});
                            _this.props.setIsLogin(true);
                        }
                    }).then()
                }).catch(err => {
                    console.log(err);
                })

            },
            fail(err) {
                console.log(err, '拒绝授权');
            }
        }).then(() => {
        })


    }

    componentDidMount(): void {

    }

    render() {
        return <View className='mine-main'>
            <View className='bg'> </View>
            <View className='on-the-bg'>
                <View className='basic-info'>
                    {/*src={this.props.app.selfInfo.avatarUrl}*/}
                    {/*<OpenData type='userAvatarUrl' className='avatar'/>*/}
                    {
                        this.props.app.isLogin ?
                            <Image src={this.props.app.selfInfo.avatarUrl} className='avatar'/>
                            :
                            <View className='avatar' style={{backgroundColor: 'white'}}> </View>
                    }

                    <View className='text-info'>
                        {
                            this.props.app.isLogin ?
                                // {this.props.app.selfInfo.nick}</OpenData>
                                <OpenData type="userNickName" className='nick'/> :
                                <Button className='nick btn' openType='getUserInfo'
                                        onGetUserInfo={this.login.bind(this)}
                                >点击登录</Button>
                        }
                        <View className='level'>Lv.0</View>
                    </View>
                </View>
                <View className='my-order'>
                    <ListItem leftFontWeight={900} leftFontSize={13} leftWord={'我的订单'} rightColor={'#d5d5d5'}
                              rightFontSize={12} rightWord={'查看全部订单'} hasRightIcon={true} paddingTop={3}/>
                    <View className='payment'>
                        {this.state.payment.map((item, i) => {
                            return <View key={i} className='status'>
                                <Image className='icon' src={`${item.icon}`}/>
                                <Text className='text'>{item.word}</Text>
                            </View>
                        })}
                    </View>
                </View>
                <View className='my-order'>
                    <Text className='title'>我的服务</Text>
                    {
                        this.state.serviceList.map((item, i) => {
                            return <ListItem leftFontWeight={500} leftFontSize={12} leftWord={item.leftText}
                                             leftColor={'#969696'}
                                             rightColor={'#d5d5d5'} paddingBottom={10} paddingTop={10}
                                             hasLeftIcon={true}
                                             rightFontSize={12} rightWord={''} hasRightIcon={true}
                                             iconUrl={require('../../assets/images/gift.png')} key={i}/>
                        })
                    }
                </View>
            </View>
        </View>
    }


}

export default Mine as ComponentClass<IProps, PageState>