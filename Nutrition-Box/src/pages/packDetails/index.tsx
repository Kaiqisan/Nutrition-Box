// import Taro from '@tarojs/taro'
import React, {Component, ComponentClass} from "react";
import {Button, Image, Text, View} from "@tarojs/components";
import {connect} from 'react-redux';
import './index.less'

type PageState = {}

type PageStateProps = {}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

interface PackDetails {
    props: IProps;
}

@connect(() => ({}), () => ({}))
class PackDetails extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <View className='packDetails-main'>
            <View className='top-title'>
                <View className='top-title-left'>自选补剂</View>
                <View className='top-title-right'>
                    <Text className='top-title-right-text'>服用须知</Text>
                    <Text className='iconfont icon-tubiaozhizuomoban go-right-icon'> </Text>
                </View>
            </View>
            <View className='pill-list'>
                <View className='pill-list-mem'>
                    <View className='pill-list-mem-left'>
                        <View className='check-icon'> </View>
                        <View className='pill-list-mem-left-all-text'>
                            <View className='pill-list-mem-left-all-text-top'>
                                <Text className='pill-name be-block'>维生素B组</Text>
                                <Text className='pill-description be-block'>提供能量,抗疲劳;适合熬夜,饮酒或运动人群</Text>
                            </View>
                            <View className='pill-list-mem-left-all-text-bottom'>
                                <Text className='price-info be-block'>1颗/天</Text>
                                <Text className='price-info be-block'>40元/月</Text>
                            </View>
                        </View>
                    </View>
                    <View className='pill-list-mem-right'>
                        <Image className='pill-list-mem-right-img' src={require('../../assets/images/pill.png')} />
                    </View>
                </View>
            </View>

            {/* 底部确认菜单 */}
            <View className='bottom-tab'>
                <View className='bottom-tab-left'>
                    <Text className='bottom-tab-left-text'>去看看评价</Text>
                    <Text className='iconfont icon-tubiaozhizuomoban go-right-icon'> </Text>
                </View>
                <Button className='bottom-tab-right'>完成</Button>
            </View>
        </View>
    }
}

export default PackDetails as ComponentClass<IProps, PageState>
