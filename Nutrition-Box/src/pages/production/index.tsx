import React, {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import {AtToast} from "taro-ui"

import Taro from "@tarojs/taro"

import './index.less'

import api from "../../services/api";
import {nutritionListType} from '../../utils/staticType'
import duplicateCodes from "../../utils/duplicateCodes";
import {setShoppingCart, setAllProduction, clearShoppingCart} from '../../redux/actions/app'

type PageStateProps = {
    app: {
        shoppingCart: string[],
        isLogin: boolean
    }
}

type PageDispatchProps = {
    setShoppingCart: (id: string, action: boolean) => void,
    setAllProduction: (allProduction: nutritionListType) => void,
    clearShoppingCart: () => void
}


type PageState = {
    topMenu: number,
    topMenuList: Array<string>,
    nutrition: number
    nutritionSubMenuList: Array<nutritionSubMenuListType>,
    nutritionList: Array<nutritionListType>,
    nowNutritionList: Array<nutritionListType>,
    AtToastMsg: {
        isOpen: boolean,
        cont: string,
        status: 'error' | 'loading' | 'success' | undefined
    },
    openId: string
}

type nutritionSubMenuListType = {
    name: string,
    introd: string,
    bg: string
}

type IProps = PageStateProps & PageDispatchProps

interface Production {
    props: IProps;
}

@connect(({app}) => ({
    app
}), (dispatch) => ({
    setShoppingCart(id: string, action: boolean) {
        dispatch(setShoppingCart(id, action))
    },
    setAllProduction(allProduction: nutritionListType) {
        dispatch(setAllProduction(allProduction))
    },
    clearShoppingCart() {
        dispatch(clearShoppingCart())
    }
}))
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
            nowNutritionList: [],
            AtToastMsg: {
                isOpen: false,
                cont: '',
                status: undefined
            },
            openId: ''
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props, nextProps)
    // }

    componentWillUnmount() {
    }


    componentDidHide() {
    }

    @duplicateCodes.Watch({
        // 'app.shoppingCart'(val, oldVal) {
        //     console.log(val, oldVal, 'dddddddddddddd');
        // }
    })
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<PageState>, snapshot?: any): void {

    }

    componentDidMount() {
        if (this.props.app.isLogin) {
            Taro.getStorage({
                key: 'openid',
                success: (res) => {
                    this.setState({
                        openId: res.data
                    })
                },
            });
        }
        this.getNutritionList();
    }

    componentDidShow() {
        // TODO:在所有信息获取成功之后才开始渲染
        this.props.clearShoppingCart();
        let openId: string;
        new Promise((resolve, reject) => {
            if (this.props.app.isLogin) {
                Taro.getStorage({
                    key: 'openid',
                    success(res) {
                        openId = res.data;
                    },
                    fail(res) {
                        console.log(res);
                    }
                }).then(() => {
                    resolve();
                })
            } else {
                resolve()
            }
        }).then(() => {
            if (this.props.app.isLogin) {
                api.post('/box/get', {openId}).then((res) => {
                    console.log(res, 'ddd');
                    if (res.data.data) {
                        res.data.data.forEach((item: nutritionListType) => {
                            setShoppingCart(item.id, true)
                        });
                    }
                }).catch(err => {
                    this.setState({
                        AtToastMsg: {
                            isOpen: true,
                            cont: '网络出错',
                            status: 'error'
                        }
                    });
                    console.log(err);
                })
            }
        }).then(() => {
            api.get('/product/all').then((res) => {
                console.log(res);
                if (typeof res.data !== 'object') {
                    this.setState({
                        AtToastMsg: {
                            isOpen: true,
                            cont: '购物车信息获取失败',
                            status: 'error'
                        }
                    });
                } else {
                    res.data.data.forEach((item) => {
                        Object.assign(item, {isInShoppingCart: false})
                    });
                    this.setState({
                        nutritionList: res.data.data
                    });
                    this.props.setAllProduction(res.data.data);
                    let paramList = ["vitamin", "mineral", "herbaceous", "tonic"];
                    this.getNutritionListByParams(paramList[0])
                }
            }).catch(() => {
                this.setState({
                    AtToastMsg: {
                        isOpen: true,
                        cont: '购物车信息获取失败',
                        status: 'error'
                    }
                });
            })
        })

    }

    getNutritionList(): void {

    }

    getNutritionListByParams(i: string): void {
        let finalList: Array<nutritionListType> = [];
        this.state.nutritionList.forEach((item) => {
            if (item.classification === i) {
                finalList.push(item)
            }
        });
        this.setState({
            nowNutritionList: finalList
        })
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
        let paramList = ["vitamin", "mineral", "herbaceous", "tonic"];
        this.getNutritionListByParams(paramList[i])
    }

    doEdit() {
        console.log('ok');
        Taro.navigateTo({
            url: '/pages/packDetails/index?boxId=0'
        }).then().catch(() => {

        })
    }

    setItInShoppingCart(id: string, action: boolean) {
        if (this.props.app.isLogin) {
            this.props.setShoppingCart(id, action);
            if (action) {
                api.post('/box/into', {openId: this.state.openId, productId: id}).then(({data}) => {
                    console.log(data);
                    setShoppingCart(id, true)
                }).catch(err => {
                    console.log(err);
                })
            } else {
                api.post('/box/out', {openId: this.state.openId, productId: id}).then(({data}) => {
                    console.log(data);
                    setShoppingCart(id, false)
                }).catch(err => {
                    console.log(err);
                })
            }
        } else {
            this.settToast(true, '请先登录', undefined);
            setTimeout(() => {
                Taro.switchTab({
                    url: '/pages/mine/index'
                })
            }, 1000)
        }
    }

    getCart() {
        console.log(this.props.app.shoppingCart);
    }

    settToast(isOpened: boolean, text: string, status: 'error' | 'loading' | 'success' | undefined) {
        let msg = {
            isOpen: isOpened,
            cont: text,
            status
        }
        this.setState({
            AtToastMsg: msg
        });
        setTimeout(() => {
            msg.isOpen = false;
            this.setState({
                AtToastMsg: msg
            });
        }, 800)
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
                            this.state.nowNutritionList.map((item: nutritionListType, i: number) => {
                                return <View className='pill-list' key={i}>
                                    <View className='pill-img'>
                                        <Image className='pill-ui' src={item.picPath}/>
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
                                            {

                                                this.props.app.shoppingCart.includes(item.id) ?
                                                    <View className='dec-icon icon'
                                                          onClick={this.setItInShoppingCart.bind(this, item.id, false)}> </View> :
                                                    <View className='add-icon icon'
                                                          onClick={this.setItInShoppingCart.bind(this, item.id, true)}> </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
                {/* TODO: 在购物车页面没加载的时候隐藏该图标 */}
                {
                    this.props.app.isLogin ? <View className='shopping-cart-box' onClick={this.doEdit.bind(this)}>
                        <Image className='icon' src={require('../../assets/images/shoppingCartBox.png')}/>
                    </View> : ''
                }
                <AtToast isOpened={this.state.AtToastMsg.isOpen} text={this.state.AtToastMsg.cont}
                         status={this.state.AtToastMsg.status}> </AtToast>
            </View>
        )
    }
}

export default Production as ComponentClass<IProps, PageState>;

