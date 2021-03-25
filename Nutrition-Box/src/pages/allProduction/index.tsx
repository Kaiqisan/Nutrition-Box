// import Taro from '@tarojs/taro'
import * as React from "react";
import {Component, ComponentClass} from "react";
import {connect} from 'react-redux'
import {Button, Image, ScrollView, Text, View} from '@tarojs/components'

import './index.less'

type PageStateProps = {}

type PageDispatchProps = {}


type PageState = {
    proList: Array<{
        name: string,
        description: string,
        dosage: number,
        price: number
    }>
}

type IProps = PageStateProps & PageDispatchProps

interface AllProduction {
    props: IProps;
}

@connect()
class AllProduction extends Component<IProps, PageState> {
    constructor(props) {
        super(props);

        this.state = {
            proList: [
                {
                    name: '维生素 E',
                    description: '抵抗自由基,改善免疫力,可以改善肤质',
                    dosage: 4,
                    price: 100
                },
                {
                    name: '维生素 E',
                    description: '抵抗自由基,改善免疫力,可以改善肤质',
                    dosage: 4,
                    price: 100
                }
            ]
        }
    }

    render() {
        return <View className='allProduction-main'>
            <ScrollView className='all-pro' scrollY={true}>
                <View className='inner-pro'>
                    <View className='head'>
                        <Text className='top-title'>自选补剂</Text>
                    </View>
                    {
                        this.state.proList.map((item, i) => {
                            return <View className='production' key={i}>
                                <View className='production-left'>
                                    <Text className='production-left-name'>{item.name}</Text>
                                    <Text className='production-left-desc'>{item.description}</Text>
                                    <View className='production-left-bottom'>
                                        <View className='production-left-bottom-btn'>+ 添加</View>
                                        <View className='production-left-bottom-data'>
                                            <Text className='quantity'>{item.dosage}</Text>
                                            <Text className='per'>颗/天</Text>
                                        </View>
                                        <View className='production-left-bottom-data'>
                                            <Text className='quantity'>{item.price}</Text>
                                            <Text className='per'>元/月</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className='production-right'>
                                    <Image className='production-right-img'
                                           src={require('../../assets/images/pill.png')}/>
                                </View>
                            </View>
                        })
                    }
                </View>
            </ScrollView>
            <View className='bottom-tab'>
                <Button className='bottom-tab-btn'>完成(3种)</Button>
            </View>
        </View>;
    }
}

export default AllProduction as ComponentClass<IProps, PageState>;