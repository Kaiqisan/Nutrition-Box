import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {View} from "@tarojs/components";
import * as React from "react";

type PageStateProps = {}

type PageDispatchProps = {}

type IProps = PageStateProps & PageDispatchProps

type PageState = {}

interface Mine {
    props: IProps
}

@connect(() => ({
    // counter
}), () => ({}))
class Mine extends Component<IProps, PageState>{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(): void {

    }

    render() {
        return <View>我的</View>
    }


}

export default Mine as ComponentClass<IProps, PageState>