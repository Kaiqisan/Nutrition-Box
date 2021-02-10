import React, {Component} from 'react'
import {ComponentClass} from "react";
import {connect} from 'react-redux'
import {View, Button, Text} from '@tarojs/components'

// import Taro from "@tarojs/taro"

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


type PageState = {
    name: string
    uid: number
}

type IProps = PageStateProps & PageDispatchProps

interface Index {
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
class Index extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            name: "app",
            uid: 10001
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
        console.log(this.props)
    }

    render() {
        return (
            <View className='index'>
                <HeadLogo />
                {/*<Button className='add_btn' onClick={this.props.add}>+</Button>*/}
                {/*<Button className='dec_btn' onClick={this.props.dec}>-</Button>*/}
                {/*<Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>*/}
                {/*<View><Text>{this.props.counter.num}</Text></View>*/}
                {/*<View><Text>Hello, World</Text></View>*/}
                {/*{this.state.name}aaa*/}
            </View>
        )
    }
}

export default Index as ComponentClass<IProps, PageState>;

