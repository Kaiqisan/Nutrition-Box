import React, {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, Image} from '@tarojs/components'
// import Taro from "@tarojs/taro"
import './index.less'


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
    // counter: {
    //     num: number
    // }
}

type PageDispatchProps = {
    // add: () => void
    // dec: () => void
    // asyncAdd: () => any
}


type PageState = {}

type IProps = PageStateProps & PageDispatchProps

interface Report {
    props: IProps;
}

@connect(() => ({
    // counter
}), () => ({}))
class Report extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {}
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
            <View className='report-main'>
                <Image className='not-found-img' src={require("../../assets/images/not-found.png")} />
                <Text className='no-report'>暂无报告...</Text>
                <Button className='btn'>立即填问卷</Button>
            </View>
        )
    }
}

export default Report as ComponentClass<IProps, PageState>;

