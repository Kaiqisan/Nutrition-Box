import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {Button, Image, ScrollView, Text, View} from "@tarojs/components";
import * as React from "react";
import Taro from '@tarojs/taro'

import api from "../../services/api";

type PageStateProps = {}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

type PageState = {
    goodsSelectList: Array<boolean>,
    allSelect: boolean,
    goodsList: Array<goodsListType>
}

type goodsListType = {
    month: number,
    boxId: string
}

interface ShoppingCart {
    props: IProps
}

@connect(() => ({}), () => ({}))
class ShoppingCart extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            goodsSelectList: [false, false, false, false, false],
            goodsList: [],
            allSelect: false
        }
    }

    doSelect(i): void {
        let afterList = this.state.goodsSelectList;
        afterList[i] = !afterList[i];
        this.setState({
            goodsSelectList: afterList
        }, (): void => {
            let hasAllSelected = this.state.goodsSelectList.every((item: boolean): boolean => {
                return item
            });
            this.setState({
                allSelect: hasAllSelected
            })
        });
    }

    doSelectAll(): void {
        let doAllSelect = this.state.allSelect;
        doAllSelect = !doAllSelect;
        this.setState({
            allSelect: doAllSelect
        }, () => {
            this.setState({
                goodsSelectList: this.state.goodsSelectList.fill(doAllSelect)
            })
        });
    }

    doEdit(): void {
        Taro.navigateTo({
            url: '/pages/packDetails/index'
        }).then().catch(err => {
            console.log(err);
        })
    }

    componentDidMount(): void {
        console.log('ok');
        api.post('/cart/get', {openId: 'oX0RQ6O9lAF50z99XyqN0LDGE1L4'}).then(res => {
            console.log(res, 'ddd');
        }).catch(err => {
            console.log(err, 'ddd');
        })
    }

    render() {
        return <View className='shoppingCart-main'>
            <ScrollView className='all-pro' scrollY={true}>
                <View className='block'>
                    <Text className='title'>所有产品</Text>
                    <View className='production-a'>
                        {
                            this.state.goodsSelectList.map((item, i) => {
                                return <View className='production' key={i}>
                                    <View className={item ? 'btn-a' : 'btn'}
                                          onClick={this.doSelect.bind(this, i)}> </View>
                                    <View className='cont'>
                                        <Image className='cont-img' src={require('../../assets/images/box.jpg')}/>
                                        <View className='cont-text'>
                                            <Text className='name'>Kaiqisan的 定制版每日维生素补充包</Text>
                                            <Text className='price'>￥783</Text>
                                        </View>
                                    </View>
                                    <Button className='edit' onClick={this.doEdit.bind(this)}>编辑</Button>
                                </View>
                            })
                        }
                    </View>
                </View>

            </ScrollView>
            <View className='select-menu'>
                <View className={this.state.allSelect ? 'btn-a' : 'btn'} onClick={this.doSelectAll.bind(this)}> </View>
                <View className='settlement'>
                    <View className='price'>
                        <Text className='price-count'>合计:￥0.00</Text>
                        <Text className='tip'>(满两件免运费)</Text>
                    </View>
                    <Button className='submit'>结算</Button>
                </View>
            </View>
        </View>
    }
}

export default ShoppingCart as ComponentClass<IProps, PageState>