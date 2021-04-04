import Taro from '@tarojs/taro'
import * as React from "react";
import {Component, ComponentClass} from "react";
import {connect} from 'react-redux'
import {Button, Image, ScrollView, Text, View} from '@tarojs/components'

import './index.less'
import api from "../../services/api";

import {nutritionListType} from "../../utils/staticType";

type PageStateProps = {
    app: {
        allProduction: Array<nutritionListType>
    }
}

type PageDispatchProps = {}


type PageState = {
    proList: Array<nutritionListType>,
    openId: string,
    proListIsInShoppingCart: boolean[]
}

type IProps = PageStateProps & PageDispatchProps

interface AllProduction {
    props: IProps;
}

@connect(({app}) => ({
    app
}), ({}) => ({}))
class AllProduction extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            proList: [],
            proListIsInShoppingCart: [],
            openId: ''
        }
    }

    componentDidShow(): void {
        let router = Taro.getCurrentInstance().router;
        Taro.getStorage({
            key: 'openid',
            success: (res) => {
                this.setState({
                    openId: res.data
                })
            }
        }).then(() => {
            if (router) {
                if (router.params.boxId === '0') {
                    api.post('/box/other', {openId: this.state.openId}).then(({data}) => {
                        if (data.data) {
                            this.setState({
                                proList: data.data
                            });
                            this.setState({
                                proListIsInShoppingCart: new Array(data.data.length).fill(false)
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    // TODO 购物车的其他商品
                    if (router.params.list) {
                        let ids = router.params.list.split('~');
                        api.post('/product/other', {ids}).then(({data}) => {
                            if (data.data) {
                                this.setState({
                                    proList: data.data
                                });
                                this.setState({
                                    proListIsInShoppingCart: new Array(data.data.length).fill(false)
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }

                }
            }

        });
    }

    componentWillUnmount() {
        let router = Taro.getCurrentInstance().router;
        if (router) {
            if (router.params.boxId !== '0') {
                let pages = Taro.getCurrentPages();
                let prevPage = pages[pages.length - 2];
                let addList: any = [];
                this.state.proListIsInShoppingCart.forEach((item, i) => {
                    if (item) {
                        addList.push(this.state.proList[i])
                    }
                });
                prevPage.setData({
                    addList
                })
            }
        }
    }

    addPill(i: number, id: string) {
        let router = Taro.getCurrentInstance().router;
        if (router) {
            if (router.params.boxId === '0') {
                api.post('/box/into', {openId: this.state.openId, productId: id}).then(({data}) => {
                    console.log(data);
                    let list = this.state.proListIsInShoppingCart;
                    list[i] = !list[i];
                    this.setState({
                        proListIsInShoppingCart: list
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                let list = this.state.proListIsInShoppingCart;
                list[i] = !list[i];
                this.setState({
                    proListIsInShoppingCart: list
                })
            }
        }

    }

    removePill(i: number, id: string) {
        let router = Taro.getCurrentInstance().router;
        if (router) {
            if (router.params.boxId === '0') {
                api.post('/box/out', {openId: this.state.openId, productId: id}).then(({data}) => {
                    console.log(data);
                    let list = this.state.proListIsInShoppingCart;
                    list[i] = !list[i];
                    this.setState({
                        proListIsInShoppingCart: list
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                let list = this.state.proListIsInShoppingCart;
                list[i] = !list[i];
                this.setState({
                    proListIsInShoppingCart: list
                })
            }
        }

    }

    back() {
        Taro.navigateBack({
            delta: 1
        })
    }

    render() {
        return <View className='allProduction-main'>
            <ScrollView className='all-pro' scrollY={true}>
                <View className='inner-pro'>
                    <View className='head'>
                        <Text className='top-title'>自选补剂</Text>
                    </View>
                    {
                        this.state.proList.map((item, i: number) => {
                            return <View className='production' key={i}>
                                <View className='production-left'>
                                    <Text className='production-left-name'>{item.productName}</Text>
                                    <Text className='production-left-desc'>{item.description}</Text>
                                    <View className='production-left-bottom'>
                                        {
                                            this.state.proListIsInShoppingCart[i] ?
                                                <View className='production-left-bottom-btn-a'
                                                      onClick={this.removePill.bind(this, i, item.id)}>已添加</View> :
                                                <View className='production-left-bottom-btn'
                                                      onClick={this.addPill.bind(this, i, item.id)}>+ 添加</View>

                                        }
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
                <Button className='bottom-tab-btn' onClick={this.back.bind(this)}>完成</Button>
            </View>
        </View>;
    }
}

export default AllProduction as ComponentClass<IProps, PageState>;