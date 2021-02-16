import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {Image, Text, View} from "@tarojs/components";
import * as React from "react";

import ListItem from "../../components/ListItem";

type PageStateProps = {}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

type PageState = {
    payment: Array<{ icon: string, word: string }>
}

interface Mine {
    props: IProps
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
            ]
        }
    }

    componentDidMount(): void {

    }

    render() {
        return <View className='mine-main'>
            <View className='bg'> </View>
            <View className='on-the-bg'>
                <View className='basic-info'>
                    <Image className='avatar' src={require('../../assets/images/avatar-demo.jpg')}/>
                    <View className='text-info'>
                        <Text className='nick'>Kaiqisan</Text>
                        <View className='level'>Lv.0</View>
                    </View>
                </View>
                <View className='my-order'>
                    <ListItem leftFontWeight={900} leftFontSize={13} leftWord={'我的订单'} rightColor={'#d5d5d5'}
                              rightFontSize={12} rightWord={'查看全部订单'} hasRightIcon={true}/>
                    <View className='payment'>
                        {this.state.payment.map((item, i) => {
                            return <View key={i} className='status'>
                                <View className='icon' style={{backgroundImage: `url('${item.icon}')`}}> </View>
                                <Text className='text'>{item.word}</Text>
                            </View>
                        })}
                    </View>
                </View>
                <View className='my-order'>
                    <ListItem leftFontWeight={900} leftFontSize={13} leftWord={'我的邀请'} rightColor={'#d5d5d5'}
                              rightFontSize={12} rightWord={'活动详情'} hasRightIcon={true}/>
                </View>
            </View>
        </View>
    }


}

export default Mine as ComponentClass<IProps, PageState>