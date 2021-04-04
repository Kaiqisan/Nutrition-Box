import React, {Component, ComponentClass} from 'react'


import {connect} from 'react-redux'
import {View} from '@tarojs/components'
// import Taro from "@tarojs/taro"

import './index.less'

type PageStateProps = {}

type PageDispatchProps = {}


type PageState = {}

type IProps = PageStateProps & PageDispatchProps

interface ConfirmPage {
    props: IProps;
}

@connect(() => ({

}), () => ({}))
class ConfirmPage extends Component<IProps, PageState>{
    constructor(props) {
        super(props)
    }

    render() {
        return <View>
            问卷页面，待开发中....
        </View>;
    }
}

export default ConfirmPage as ComponentClass<IProps, PageState>;