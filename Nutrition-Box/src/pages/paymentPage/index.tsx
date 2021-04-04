// import Taro from '@tarojs/taro'
import React, {Component, ComponentClass} from "react";
import {View} from "@tarojs/components";
import {connect} from 'react-redux';
import './index.less'

type PageStateProps = {

}

type PageDispatchProps = {
    setShoppingCart: () => void
}

type IProps = PageStateProps & PageDispatchProps

interface PaymentPage {
    props: IProps;
}

type PageState = {

}

@connect(()=>({}), () => ({}))
class PaymentPage extends Component<IProps, PageState>{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <View>
            支付页面待开发中！敬请期待
        </View>;
    }
}

export default PaymentPage as ComponentClass<IProps, PageState>;