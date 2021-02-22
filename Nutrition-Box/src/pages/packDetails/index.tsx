import Taro from '@tarojs/taro'
import React, {Component, ComponentClass, useState} from "react";
import {Button, Image, ScrollView, TaroEvent, Text, View} from "@tarojs/components";
import {connect} from 'react-redux';
import './index.less'

type PageState = {
    hei: number
}

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
        this.state = {
            hei: 0
        };
    }


    componentDidMount(): void {
        setTimeout(() => {
            this.getBgHeight();
        }, 200)
    }

    outerPillListMem: OuterPillListMem;

    refOuterPillListMem = (node) => {this.outerPillListMem = node};

    testOnMouseMove(e) {
        console.log(e, '2');
    }

    getBgHeight():void {
        let a = Taro.createSelectorQuery();
        a.selectAll('.packDetails-body').boundingClientRect((res) => {
            this.setState({
                hei: res.height
            })
        }).exec();
    }

    render() {
        return <View className='packDetails-main' onTouchMove={this.testOnMouseMove.bind(this)}>
            <ScrollView className='packDetails-body' scrollY={true}>
                <View className='inner-packDetails'>
                    <View className='top-title'>
                        <View className='top-title-left'>自选补剂</View>
                        <View className='top-title-right'>
                            <Text className='top-title-right-text'>服用须知</Text>
                            <Text className='iconfont icon-tubiaozhizuomoban go-right-icon'> </Text>
                        </View>
                    </View>
                    <View className='pill-list'>
                        <View className='pill-list-mem'>
                            <View className='inner-pill-list-mem' style={{height: this.state.hei + 'px'}}>
                                <View className='outer-delete-text'>
                                    <Text className='be-block delete-text'>删除</Text>
                                </View>
                            </View>
                            <OuterPillListMem ref={this.refOuterPillListMem}/>
                        </View>
                        <View className='pill-list-mem'>
                            <View className='inner-pill-list-mem' style={{height: this.state.hei + 'px'}}>
                                <View className='outer-delete-text'>
                                    <Text className='be-block delete-text'>删除</Text>
                                </View>
                            </View>
                            <OuterPillListMem ref={this.refOuterPillListMem}/>
                        </View>
                    </View>
                    <View className='add-other'>
                        <Text className='be-block left-text'>添加其他补剂</Text>
                        <Image className='add-icon be-block' src={require('../../assets/images/add-yellow.png')}/>
                    </View>
                </View>
            </ScrollView>

            {/* 底部确认菜单 */}
            <View className='bottom-tab'>
                <View className='bottom-tab-left'>
                    <Text className='bottom-tab-left-text'>去看看评价</Text>
                    <Text className='iconfont icon-tubiaozhizuomoban go-right-icon'> </Text>
                </View>
                <Button className='bottom-tab-right'>完成(2种)</Button>
            </View>
        </View>
    }
}

interface OuterPillListMem {
    props: IProps;
}

type outerPillListMemState =  {
    deleteTabIsOpen: boolean,
    objOuterPillListMem: object | null,
    currentLeft: number
}

class OuterPillListMem extends Component<IProps, outerPillListMemState> {
    constructor(props) {
        super(props);
        this.state = {
            deleteTabIsOpen: false,
            objOuterPillListMem: null,
            currentLeft: 0
        }
    }
    componentDidMount(): void {
        this.setState({
            objOuterPillListMem: document.getElementsByClassName('outer-pill-list-mem')
        })
    }

    openDeleteTab(e) {
        if (this.state.currentLeft > e.touches[0].pageX) {
            this.setState({
                deleteTabIsOpen: true
            })
        } else {
            this.setState({
                deleteTabIsOpen: false
            })
        }
        this.setState({
            currentLeft: e.touches[0].pageX
        });
    }

    setCurrentHeight(e) {
        this.setState({
            currentLeft: e.touches[0].pageX
        });
    }

    render() {
        return <View className='outer-pill-list-mem' onTouchMove={this.openDeleteTab.bind(this)} onTouchStart={this.setCurrentHeight.bind(this)} style={{transform: `translateX(${this.state
                .deleteTabIsOpen ? '-25%' : '0'})`}}>
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
                <Image className='pill-list-mem-right-img'
                       src={require('../../assets/images/pill.png')}/>
            </View>
        </View>;
    }
}

export default PackDetails as ComponentClass<IProps, PageState>
