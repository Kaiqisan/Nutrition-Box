import React, {Component, ComponentClass} from 'react'


import {connect} from 'react-redux'
import {Text, View} from '@tarojs/components'
// import Taro from "@tarojs/taro"

import './index.less'

type PageStateProps = {}

type PageDispatchProps = {}


type PageState = {}

type IProps = PageStateProps & PageDispatchProps

interface ConfirmPage {
    props: IProps;
}

@connect(() => ({

}), () => ({}))
class ConfirmPage extends Component<IProps, PageState>{
    constructor(props) {
        super(props)
    }

    render() {
        return <View className='confirmPage-main'>
            <View className='body'>
                <View className='head-line'> </View>
                <Text className='title'>PERSONAL</Text>
                <Text className='title'>NUTRITION</Text>
                <Text className='title'>QUESTIONNAIRE</Text>
                <Text className='title'>个人营养问卷</Text>
                <View className='tips' style={{marginTop: '30Px'}}>
                    <Text className='point'>·</Text>
                    <Text className='cont'>完成问卷大概需要5~10分钟</Text>
                </View>
                <View className='tips'>
                    <Text className='point'>·</Text>
                    <Text className='cont'>问卷由 Nutrition-Box 团队设计</Text>
                </View>
                <View className='tips' style={{marginBottom: '30Px'}}>
                    <Text className='point'>·</Text>
                    <Text className='cont'>采用国际营养学界主流的远程信息收集法 -- 「膳食频率问卷法(FFQs)」</Text>
                </View>
                <View className='head-line'> </View>
                <View className='btn'>开始答题</View>
            </View>
        </View>;
    }
}

export default ConfirmPage as ComponentClass<IProps, PageState>;