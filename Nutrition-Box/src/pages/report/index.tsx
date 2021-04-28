import React, {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, Image} from '@tarojs/components'
import Taro from "@tarojs/taro"
import './index.less'

// import { AtActivityIndicator } from 'taro-ui'


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


type PageState = {
    questionnaireList: Array<{
        date: string,
        name: string,
        num: number,
        questionnaireId: number
    }>
}

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
        this.state = {
            questionnaireList: [
                {
                    date: '2021/04/01',
                    name: 'Kaiqisan',
                    num: 6,
                    questionnaireId: 146464
                }
            ]
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

    goConfirmPage() {
        Taro.navigateTo({
            url: '/pages/confirmPage/index'
        })
    }

    render() {
        return (
            <View className='report-main'>
                {/*<AtActivityIndicator size={35}> </AtActivityIndicator>*/}
                {
                    this.state.questionnaireList.length ?
                        <View className='report-list'>
                            <View className='report-list-cont'>
                                <View className='head'>
                                    <Text className='date'>2021/04/01</Text>
                                </View>
                                <View className='body'>
                                    <Text className='name'>Kaiqisan</Text>
                                </View>
                                <View className='foot'>
                                    <Text className='num'>营养师推荐：6种补剂</Text>
                                    <View className='goShoppingCart'>去下单</View>
                                </View>
                            </View>
                        </View> : <View>
                            <Image className='not-found-img' src={require("../../assets/images/not-found.png")}/>
                            <Text className='no-report'>暂无报告...</Text>
                            <Button className='btn' onClick={this.goConfirmPage.bind()}>立即填问卷</Button>
                        </View>

                }

            </View>
        )
    }
}

export default Report as ComponentClass<IProps, PageState>;

