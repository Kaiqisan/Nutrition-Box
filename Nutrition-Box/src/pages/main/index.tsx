import React, {Component, ComponentClass} from 'react'


import {connect} from 'react-redux'
import {View, Button, Text, RichText} from '@tarojs/components'
import Taro from "@tarojs/taro"

import {add, minus, asyncAdd} from '../../redux/actions/counter'

import './index.less'

import HeadLogo from '../../components/HeadLogo/index'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
    counter: {
        num: number
    }
}

type PageDispatchProps = {
    add: () => void
    dec: () => void
    asyncAdd: () => any
}

type nodeType = {
    name: string
    attrs: {
        className: string,
        style: string,
    },
    [propName: string]: any
}

type PageState = {
    nodes: Array<nodeType>,
    people: number
}

type IProps = PageStateProps & PageDispatchProps

interface Main {
    props: IProps;
}

@connect(({counter}) => ({
    counter
}), (dispatch) => ({
    add() {
        dispatch(add())
    },
    dec() {
        dispatch(minus())
    },
    asyncAdd() {
        dispatch(asyncAdd())
    }
}))
class Main extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            people: 100782234,
            nodes: [{
                name: 'ul',
                attrs: {
                    className: '',
                    style: 'margin-top: 10px'
                },
                children: [{
                    name: 'li',
                    attrs: {
                        style: 'color: white;line-height: 29px',
                    },
                    text: 'ddddddd',
                    children: [
                        {
                            text: '下单「定制补剂」即可 ',
                            type: 'text',
                        },
                        {
                            name: 'span',
                            attrs: {
                                style: 'font-size: 18px;letter-spacing: 3px;'
                            },
                            children: [
                                {
                                    text: '0元',
                                    type: 'text',

                                },
                            ]
                        },
                        {
                            text: ' 获购',
                            type: 'text',
                        },
                        {
                            name: 'br'
                        },
                        {
                            text: '维生素 ',
                            type: 'text',
                        },
                        {
                            name: 'span',
                            attrs: {
                                style: 'font-size: 18px;'
                            },
                            children: [
                                {
                                    text: 'C/D3',
                                    type: 'text',

                                },
                            ]
                        },
                        {
                            text: '（提高免疫力）任意一款',
                            type: 'text',
                        },
                    ]
                }]
            }]
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
        this.getVal()
    }

    render() {
        return (
            <View className='main-main'>
                <HeadLogo/>
                <View className='title'>
                    <Text className='title-name'>暖暖春意</Text>
                    <Text className='title-date'>DATE: 1/20~2/19</Text>
                </View>
                <RichText nodes={this.state.nodes}/>
                <View className='body'>
                    <Text className='body-title'>Simply A Better Day</Text>
                    <Button className='body-btn' onClick={this.startTest.bind(this)}>开始测试</Button>
                </View>
                <View className='foot'>
                    <Text className='foot-cont'>已为</Text>
                    {
                        String(this.state.people).split('').map((item: string, i: number) => {
                            if ((String(this.state.people).split('').length - i) % 3 === 0) {
                                return <View style={{display: 'inline'}}>
                                    <Text className='foot-cont'>,</Text>
                                    <Text className='foot-member'>{item}</Text>
                                </View>
                            } else {
                                return <Text className='foot-member'>{item}</Text>
                            }

                        })
                    }
                    <Text className='foot-cont'>用户定制营养方案</Text>
                </View>
            </View>
        )
    }

    getVal(): void {
        console.log(this.props.counter.num);
    }

    startTest(): void {
        Taro.navigateTo({
            url: '/pages/confirmPage/index'
        }).then()
    }
}

export default Main as ComponentClass<IProps, PageState>;

