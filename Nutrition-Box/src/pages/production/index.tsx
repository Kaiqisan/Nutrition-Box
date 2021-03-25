import React, {Component, ComponentClass} from 'react'


import {connect} from 'react-redux'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import {AtToast} from "taro-ui"

// import Taro from "@tarojs/taro"

import './index.less'

import api from "../../services/api";

type PageStateProps = {}

type PageDispatchProps = {}


type PageState = {
    topMenu: number,
    topMenuList: Array<string>,
    nutrition: number
    nutritionSubMenuList: Array<nutritionSubMenuListType>,
    nutritionList: Array<nutritionListType>,
    messageIsOpen: boolean
}

type nutritionSubMenuListType = {
    name: string,
    introd: string,
    bg: string
}

type nutritionListType = {
    classification: string,
    description: string,
    dosage: number,
    id: number,
    picPath: string | null
    price: number,
    productName: string,
}

type IProps = PageStateProps & PageDispatchProps

interface Production {
    props: IProps;
}

@connect(() => ({
    // counter
}), () => ({}))
class Production extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            topMenu: 0,
            topMenuList: ['补剂', '软糖'],
            nutrition: 0,
            nutritionSubMenuList: [
                {
                    name: '维生素',
                    introd: '维生素是一系列维持人体正常运作的必须营养素,它们主要从食物中获得,例外的是维生素D主要从太阳光照皮肤产生而来。',
                    bg: "#feffe5"
                },
                {
                    name: '矿物质',
                    introd: '矿物质是维持我们身体健康运作的一系列"无机元素",它包含需求量相对较大的"常量元素",例如"钙",和需求量相对较小的"微量元素",比如"铁"。',
                    bg: "#eaffdc"
                },
                {
                    name: '草本',
                    introd: '草本补充剂是从植物中提取而来，从古至今,很多植物因其有治疗特性而被人们一直使用,他们可以帮助你实现很多健康目标,包括提升精力和增强脑力。',
                    bg: "#fff2ea"
                },
                {
                    name: '功能性补剂',
                    introd: '除基础营养补剂和草本类补剂以外,我们还提供一系列的功能性补剂,针对对不同健康目标有需求的人群,如心脑血管健康,关节健康,免疫调节和抗氧化等。',
                    bg: "#f4f8ff"
                },
            ],
            nutritionList: [],
            messageIsOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    componentDidMount() {
        this.getNutritionList('a')
    }

    getNutritionList(params: string): void {
        this.setState({
            messageIsOpen: true
        });
        // api.get('/product/class', {cla: params}).then(({data}) => {
        //     if (typeof data !== 'object') {
        //         this.setState({
        //             messageIsOpen: true
        //         });
        //     } else {
        //         this.setState({
        //             nutritionList: data.data
        //         })
        //     }
        // })

    }

    doTransMenu(i: number) {
        this.setState({
            topMenu: i
        })
    }

    doTransNutritionList(i: number) {
        this.setState({
            nutrition: i
        });
        let params: string = i === 0 ? 'a' : i === 1 ? 'b' : 'c';
        this.getNutritionList(params)
    }

    render() {
        return (
            <View className='production-main'>
                <View className='top-tab'>
                    {
                        this.state.topMenuList.map((item: string, i: number) => {
                            return <View className='top-choose' onClick={this.doTransMenu.bind(this, i)} key={i}>
                                <Text className='top-text'>{item}</Text>
                                {
                                    this.state.topMenu === i ? <View className='top-slide'> </View> : ''
                                }
                            </View>
                        })
                    }
                </View>
                <ScrollView className='tonic-cont' scrollY={true}
                            style={{background: this.state.nutritionSubMenuList[this.state.nutrition].bg}}>
                    <View className='tonic-cont-a'>
                        <View className='nutrition-list'>
                            {
                                this.state.nutritionSubMenuList.map((item: nutritionSubMenuListType, i: number) => {
                                    return <Text className='nutrition-name'
                                                 onClick={this.doTransNutritionList.bind(this, i)}
                                                 style={{backgroundColor: this.state.nutrition === i ? '#ffe93e' : ''}}
                                                 key={i}>{item.name}</Text>
                                })
                            }
                        </View>
                        <View className='nutrition-introduce'>
                            <Text className='cont'>{this.state.nutritionSubMenuList[this.state.nutrition].introd}</Text>
                        </View>
                        {
                            this.state.nutritionList.map((item: nutritionListType, i: number) => {
                                return <View className='pill-list' key={i}>
                                    <View className='pill-img'>
                                        <Image className='pill-ui' src={require("../../assets/images/pill.png")}/>
                                    </View>
                                    <View className='pill-cont'>
                                        <View className='pill-cont-head'>
                                            <View className='pill-name'>{item.productName}</View>
                                            <View className='pill-usage'>{item.description}</View>
                                            <View className='pill-usage-ui'>
                                                <Text className='iconfont a'>&#xe646;&#xe652;</Text>
                                            </View>
                                        </View>
                                        <View className='pill-cont-foot'>
                                            <Text className='price'>{item.price}元/月（{item.dosage}颗）</Text>
                                            <View className='add-icon'> </View>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
                <AtToast isOpened={this.state.messageIsOpen} text={'网络出错'} status={'error'}> </AtToast>
            </View>
        )
    }
}

export default Production as ComponentClass<IProps, PageState>;

