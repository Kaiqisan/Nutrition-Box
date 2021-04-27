import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {Button, Image, ScrollView, Text, View} from "@tarojs/components";
import * as React from "react";
import Taro from '@tarojs/taro'

import api from "../../services/api";

type PageStateProps = {
    app: {
        isLogin: boolean
    }
}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

type PageState = {
    goodsSelectList: Array<boolean>,
    allSelect: boolean,
    goodsList: Array<goodsListType>,
    openId: string
}

type goodsListType = {
    month: number,
    boxId: string,
    total: number
    isSelect: boolean
}

interface ShoppingCart {
    props: IProps
}

@connect(({app}) => ({
    app
}), () => ({}))
class ShoppingCart extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            goodsSelectList: [false, false, false, false, false],
            goodsList: [],
            allSelect: false,
            openId: ''
        }
    }

    doSelect(i): void {
        let list = this.state.goodsList;
        list[i].isSelect = !list[i].isSelect;
        this.setState({
            goodsList: list
        }, (): void => {
            let hasAllSelected = this.state.goodsList.every(({isSelect}): boolean => {
                return isSelect
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
            let list = this.state.goodsList;
            list.forEach((item) => {
                item.isSelect = doAllSelect
            });
            this.setState({
                goodsSelectList: this.state.goodsSelectList.fill(doAllSelect)
            })
        });
    }

    doEdit(boxId: string): void {
        Taro.navigateTo({
            url: `/pages/packDetails/index?boxId=${boxId}`
        }).then().catch(err => {
            console.log(err);
        })
    }

    componentDidMount(): void {
        // console.log('ok');
    }

    componentDidShow() {
        if (this.props.app.isLogin) {
            Taro.getStorage({
                key: 'openid',
                success: ({data}) => {
                    this.setState({
                        openId: data
                    })
                }
            }).then(() => {
                this.getAllList()
            })
        }
    }

    getAllList() {
        api.post('/cart/get', {openId: this.state.openId}).then(({data}) => {
            console.log(data);
            if (data.data) {
                data.data.forEach(item => {
                    Object.assign(item, {isSelect: false})
                });
                this.setState({
                    goodsList: data.data
                })
            }
        }).catch(err => {
            console.log(err, 'ddd');
        });
    }

    goPayment() {
        if (this.state.goodsList.reduce((a, b) => {
            return b.isSelect ? ++a : a
        }, 0)) {
            Taro.navigateTo({
                url: `/pages/paymentPage/index`
            })
        }

    }

    del() {
        if (this.state.goodsList.reduce((a, b) => {
            return b.isSelect ? ++a : a
        }, 0)) {
            let idList: string[] = [];
            this.state.goodsList.forEach(item => {
                if (item.isSelect) {
                    idList.push(item.boxId)
                }
            });
            api.post('/cart/deleteIds', {
                boxIds: idList
            }).then(() => {
                this.getAllList();
            }).catch(err => {
                console.log(err);
            })
        }
    }

    goLogin() {
        Taro.switchTab({
            url: '/pages/mine/index'
        })
    }

    render() {
        return <View className='shoppingCart-main'>
            <ScrollView className='all-pro' scrollY={true}>
                <View className='block'>
                    <Text className='title'>所有产品</Text>
                    {/*{*/}
                    {/*    this.state.goodsList.length === 0 ? <View style={{fontWeight: 900, fontSize: '20Px'}}>空空如也</View> : ''*/}
                    {/*}*/}
                    <View className='production-a'>
                        {
                            this.props.app.isLogin ?
                            this.state.goodsList.map((item, i) => {
                                return <View className='production' key={i}>
                                    <View className={item.isSelect ? 'btn-a' : 'btn'}
                                          onClick={this.doSelect.bind(this, i)}> </View>
                                    <View className='cont'>
                                        <Image className='cont-img' src={require('../../assets/images/box.jpg')}/>
                                        <View className='cont-text'>
                                            <Text className='name'>Kaiqi的 定制版每日维生素补充包</Text>
                                            <Text className='price'>￥{item.total}</Text>
                                        </View>
                                    </View>
                                    <Button className='edit' onClick={this.doEdit.bind(this, item.boxId)}>编辑</Button>
                                </View>
                            }) : <Button onClick={this.goLogin.bind(this)}>请先登录！</Button>
                        }
                    </View>
                </View>

            </ScrollView>
            <View className='select-menu'>
                <View className={this.state.allSelect ? 'btn-a' : 'btn'} onClick={this.doSelectAll.bind(this)}> </View>
                <View className='settlement'>
                    <View className='price'>
                        <Text className='price-count'>合计:￥{this.state.goodsList.reduce((a, b) => {
                            if (b.isSelect) {
                                return b.total + a
                            }
                            return a
                        }, 0)}</Text>
                        <Text className='tip'>(满两件免运费)</Text>
                    </View>
                    <Button className='submit' onClick={this.goPayment.bind(this)}>结算</Button>
                    <Button className='del' onClick={this.del.bind(this)}>移除</Button>
                </View>
            </View>
        </View>
    }
}

export default ShoppingCart as ComponentClass<IProps, PageState>