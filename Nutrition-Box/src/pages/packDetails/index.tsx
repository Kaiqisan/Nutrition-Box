import Taro from '@tarojs/taro'
import React, {Component, ComponentClass} from "react";
import {Button, Image, ScrollView, Text, View} from "@tarojs/components";
import {connect} from 'react-redux';
import './index.less'


import duplicateCodes from '../../utils/duplicateCodes'
import {nutritionListType} from '../../utils/staticType'
import api from "../../services/api";

type PageState = {
    hei: number,
    confirmPageIsOpen: boolean,
    month: boolean,
    sizeType: Array<{
        size: number,
        perDayPrice: number,
        price: number,
        isChoose: boolean
    }>,
    selectIdList: string[],
    pillList: Array<pillListType>,
    openId: string,
    testVal: number
}

type pillListType = {
    classification: string,
    description: string,
    dosage: number,
    id: string,
    picPath: string
    price: number,
    productName: string
    isHide: boolean
}

type PageStateProps = {
    app: {
        shoppingCart: string[]
    }
}

type PageDispatchProps = {
    setShoppingCart: () => void
}

type IProps = PageStateProps & PageDispatchProps

interface PackDetails {
    props: IProps;
}

@connect(({app}) => ({
    app
}), () => ({}))
class PackDetails extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            hei: 0,
            confirmPageIsOpen: false,
            month: true,
            sizeType: [
                {
                    size: 1,
                    perDayPrice: 8,
                    price: 245.00,
                    isChoose: true
                },
                {
                    size: 3,
                    perDayPrice: 7,
                    price: 662.40,
                    isChoose: false
                }
            ],
            selectIdList: [],
            pillList: [],
            openId: '',
            testVal: 0
        };
    }

    componentDidShow() {
        // 返回上一页传值

        // this.props.setShoppingCart()
        // TODO:获取已经在购物车的商品
        let router = Taro.getCurrentInstance().router;
        let openId: string;
        Taro.getStorage({
            key: 'openid',
            success(res) {
                openId = res.data
            }
        }).then(() => {
            if (router) {
                if (router.params.boxId === '0') {
                    api.post('/box/get', {openId}).then(res => {
                        if (res.data.data) {
                            let list = res.data.data;
                            list.forEach(item => {
                                Object.assign(item, {isHide: false})
                            });
                            this.setState({
                                pillList: res.data.data
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    let pages = Taro.getCurrentPages();
                    let currPage = pages[pages.length - 1]; //当前页面
                    let {data} = currPage;
                    if (data.hasOwnProperty('addList')) {
                        let list = this.state.pillList;
                        data.addList.forEach(item => {
                            Object.assign(item, {isHide: false})
                        });
                        list = list.concat(data.addList);
                        this.setState({
                            pillList: list
                        })
                    } else {
                        api.get('/cartBox/getAll', {boxId: router.params.boxId}).then(res => {
                            if (res.data.data) {
                                let list = res.data.data;
                                list.forEach(item => {
                                    Object.assign(item, {isHide: false})
                                });
                                this.setState({
                                    pillList: res.data.data
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

    componentDidMount() {
        Taro.getStorage({
            key: 'openid',
            success: (res) => {
                this.setState({
                    openId: res.data
                })
            }
        });
        setTimeout(() => {
            this.getBgHeight();
        }, 200);
    }

    outerPillListMem: OuterPillListMem;

    refOuterPillListMem = (node) => {
        this.outerPillListMem = node
    };

    testOnMouseMove(): void {
        // console.log(e, '2');
    }

    getBgHeight(): void {
        let a = Taro.createSelectorQuery();
        a.selectAll('.packDetails-body').boundingClientRect((res) => {
            this.setState({
                hei: res.height
            })
        }).exec();
    }

    addOther(): void {
        let router = Taro.getCurrentInstance().router;
        let idList: string[] = [];
        this.state.pillList.forEach(item => {
            idList.push(item.id)
        });
        if (router) {
            Taro.navigateTo({
                url: `/pages/allProduction/index?boxId=${router.params.boxId}&&list=${idList.join('~')}`
            }).then()
        }

    }

    finish(): void {
        setTimeout(() => {
            this.setState({
                selectIdList: duplicateCodes.getIdList(this.refs.refSubOrder)
            });
        }, 200);
        this.setState({
            confirmPageIsOpen: true
        }, () => {
            let [sizeType, sizeType2] = this.state.sizeType;
            sizeType.price = this.state.pillList.reduce((a, b) => {
                return b.price + a
            }, 0);
            sizeType2.price = Number((sizeType.price * 3 * 0.9).toFixed(2));
            sizeType.perDayPrice = Math.floor(sizeType.price / 30);
            sizeType2.perDayPrice = Math.floor(sizeType2.price / 90);
            this.setState({
                sizeType: [sizeType, sizeType2]
            })
        })
    }

    chooseSize(i: number): void {
        this.setState({
            month: i === 0
        });
        let sizeType = this.state.sizeType;
        sizeType.map(item => {
            item.isChoose = false;
            return item
        });
        sizeType[i].isChoose = true;
        this.setState({
            sizeType
        })
    }

    closeConfirmPage(e) {
        if (!duplicateCodes.isClickOutSide(e.target.id, this.state.selectIdList)) {
            this.setState({
                confirmPageIsOpen: false
            })
        }
    }

    remove(i: number, id: string) {
        let router = Taro.getCurrentInstance().router;
        if (router) {
            if (router.params.boxId === '0') {
                api.post('/box/out', {openId: this.state.openId, productId: id}).then(() => {
                    let list = this.state.pillList;
                    list.splice(i, 1);
                    this.setState({
                        pillList: list
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                let list = this.state.pillList;
                list.splice(i, 1);
                this.setState({
                    pillList: list
                })
            }
        }
    }

    closeAll() {
        let list = this.state.pillList;
        this.state.pillList.forEach(item => {
            item.isHide = false
        });
        this.setState({
            pillList: list
        })
    }

    touchClose() {
        this.closeAll();
    }

    // action true为打开， false为关闭
    openById(id: string, action: boolean) {
        let list = this.state.pillList;
        if (action) {
            // this.state.pillList.some((item, i) => {
            //     if (item.id === id) {
            //         list[i].isHide = false;
            //         return false
            //     }
            //     return true
            // })
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    list[i].isHide = false;
                    break
                }
            }
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    list[i].isHide = true;
                    break
                }
            }
        }
        this.setState({
            pillList: list
        })
    }

    addInCart() {
        let router = Taro.getCurrentInstance().router;
        let boxId = router.params.boxId;
        let productIds: string[] = [];
        this.state.pillList.forEach(item => {
            productIds.push(item.id)
        });
        api.post('/box/move', {boxId, productIds , month: this.state.month ? 1 : 3}).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <View className='packDetails-main'>
            <ScrollView className='packDetails-body' scrollY={true} onTouchMove={this.testOnMouseMove.bind(this)}>
                <View className='inner-packDetails'>
                    <View className='top-title'>
                        <View className='top-title-left'>自选补剂</View>
                        <View className='top-title-right'>
                            <Text className='top-title-right-text'>服用须知</Text>
                            <Text className='iconfont icon-tubiaozhizuomoban go-right-icon'> </Text>
                        </View>
                    </View>
                    <View className='pill-list'>
                        {
                            this.state.pillList.map((item, i) => {
                                return <View className='pill-list-mem' key={i}>
                                    <View className='inner-pill-list-mem' style={{height: this.state.hei + 'px'}}>
                                        <View className='outer-delete-text'>
                                            <Text className='be-block delete-text'
                                                  onClick={this.remove.bind(this, i, item.id)}>删除</Text>
                                        </View>
                                    </View>
                                    <OuterPillListMem ref={this.refOuterPillListMem} allproperties={item}
                                                      openById={this.openById.bind(this)}
                                                      touchClose={this.touchClose.bind(this)} key={i}/>
                                </View>
                            })
                        }
                    </View>
                    <View className='add-other' onClick={this.addOther.bind(this)}>
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
                <Button className='bottom-tab-right'
                        onClick={this.finish.bind(this)}>完成({this.state.pillList.length}种)</Button>
            </View>

            {
                this.state.confirmPageIsOpen ? <View onClick={this.closeConfirmPage.bind(this)}>
                    <View className='block'>

                    </View>

                    {/*  提交订单  */}
                    <View className='sub-order' ref='refSubOrder'>
                        <View className='choose-size module'>
                            <Text className='choose-size-title'>选择规格</Text>
                            {
                                this.state.sizeType.map((item, i) => {
                                    return <View className='size' key={i}>
                                        <View className='size-left'>
                                            <View className='size-left-month'>
                                                <View className={item.isChoose ? 'btn-a' : 'btn'}
                                                      onClick={this.chooseSize.bind(this, i)}> </View>
                                                <View className='size-left-monthPack'>{item.size}月装</View>
                                            </View>
                                            <View className='size-left-per-month'>{item.perDayPrice}元/天</View>
                                        </View>
                                        <View className='size-right'>
                                            <Text className='price'>￥{item.price}</Text>
                                        </View>
                                    </View>
                                })
                            }
                        </View>
                        <View className='freight module'>
                            <View className='freight-head'>运费</View>
                            <View className='freight-details'>
                                <Text className='freight-details-info'>
                                    {this.state.month ? 1 : 3}月装{this.state.month ? '' : '免'}运费
                                </Text>
                                <Text className='freight-details-info'>
                                    ￥{this.state.month ? 19 : 0}
                                </Text>
                            </View>
                        </View>
                        <Button className='bottom-tab-btn' onClick={this.addInCart.bind(this)}>确认</Button>
                    </View>
                </View> : ''
            }
        </View>
    }
}

interface OuterPillListMem {
    props: compIprops;
}

type compIprops = {
    ref: any,
    allproperties: pillListType,
    openById: (id: string, action: boolean) => void,
    touchClose: () => void
}

type outerPillListMemState = {
    deleteTabIsOpen: boolean,
    objOuterPillListMem: object | null,
    currentLeft: number
}

class OuterPillListMem extends Component<compIprops, outerPillListMemState> {
    constructor(props) {
        super(props);
        this.state = {
            deleteTabIsOpen: false,
            objOuterPillListMem: null,
            currentLeft: 0,
        }
    }

    componentDidMount(): void {
        this.setState({
            objOuterPillListMem: document.getElementsByClassName('outer-pill-list-mem')
        });

        setTimeout(() => {

        })
    }

    openDeleteTab(e) {
        if (this.state.currentLeft > e.touches[0].pageX) {
            this.props.openById(this.props.allproperties.id, false)
        } else {
            this.props.openById(this.props.allproperties.id, true)
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
        return <View className='outer-pill-list-mem' onTouchMove={this.openDeleteTab.bind(this)}
                     onTouchStart={(event) => {
                         this.setCurrentHeight(event);
                         this.props.touchClose()
                     }} style={{
            transform: `translateX(${this.props
                .allproperties.isHide ? '-25%' : '0'})`
        }}>
            <View className='pill-list-mem-left'>
                <View className='check-icon'> </View>
                <View className='pill-list-mem-left-all-text'>
                    <View className='pill-list-mem-left-all-text-top'>
                        <Text className='pill-name be-block'>{this.props.allproperties.productName}</Text>
                        <Text className='pill-description be-block'>{this.props.allproperties.description}</Text>
                    </View>
                    <View className='pill-list-mem-left-all-text-bottom'>
                        <Text className='price-info be-block'>{this.props.allproperties.dosage}颗/天</Text>
                        <Text className='price-info be-block'>{this.props.allproperties.price}元/月</Text>
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
