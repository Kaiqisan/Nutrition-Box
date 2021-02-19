import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {Button, Image, Text, View} from "@tarojs/components";
import * as React from "react";
import Taro from '@tarojs/taro'

import api from '../../services/api'

import ListItem from "../../components/ListItem";

type PageStateProps = {}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

type PageState = {
    payment: Array<{ icon: string, word: string }>,
    serviceList: Array<any>
}

interface Mine {
    props: IProps,

}

@connect(() => ({
    // counter
}), () => ({}))
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
        console.log('ioj');
        wx.getUserInfo({
            success(res) {
                console.log(res);
                let userInfo = res.userInfo
                let nickName = userInfo.nickName
                let avatarUrl = userInfo.avatarUrl
                let gender = userInfo.gender //性别 0：未知、1：男、2：女
                let province = userInfo.province
                let city = userInfo.city
                let country = userInfo.country
            },
            fail(err) {
                console.log(err);
            }
        })
        // Taro.getUserInfo({
        //     success(res) {
        //         console.log(res);
        //     },
        //     fail(err) {
        //         console.log(err);
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
        // wx.login({
        //     success(res) {
        //         if (res.code) {
        //             //发起网络请求
        //             api.get('/user/login', {code: res.code}).then(res => {
        //                 console.log(res, 'ok');
        //             }).catch(err => {
        //                 console.log(err, 'err');
        //             });
        //         } else {
        //             console.log('登录失败！' + res.errMsg)
        //         }
        //     }
        // })
    }

    componentDidMount(): void {

    }

    render() {
        return <View className='mine-main'>
            <View className='bg'> </View>
            <View className='on-the-bg'>
                <Button openType='getUserInfo' onClick={this.login.bind(this)}>点击登录</Button>
                <View className='basic-info'>
                    <Image className='avatar' src={require('../../assets/images/avatar-demo.jpg')}/>
                    <View className='text-info'>
                        <Text className='nick'>Kaiqisan</Text>
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