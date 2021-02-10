import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {View} from "@tarojs/components";
import * as React from "react";

type PageStateProps = {}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

type PageState = {}

interface ShoppingCart {
    props: IProps
}

@connect(() => ({
    // counter
}), () => ({}))
class ShoppingCart extends Component<IProps, PageState>{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(): void {

    }

    render() {
        return <View>购物车</View>
    }


}

export default ShoppingCart as ComponentClass<IProps, PageState>