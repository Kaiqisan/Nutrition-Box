import {Component, ComponentClass} from 'react'
import {connect} from 'react-redux'
import './index.less'
import {Button, Image, Text, View} from "@tarojs/components";
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
        return <View className='shoppingCart-main'>
            <View className='all-pro'>
                <Text className='title'>所有产品</Text>
                <View className='production'>
                    <View className='btn'></View>
                    <View className='cont'>
                        <Image className='cont-img' src={require('../../assets/images/box.jpg')} />
                        <View className='cont-text'>
                            <Text className='name'>Kaiqisan的 定制版每日维生素补充包</Text>
                            <Text className='price'>￥783</Text>
                        </View>
                    </View>
                    <Button className='edit'>编辑</Button>
                </View>
            </View>
        </View>
    }


}

export default ShoppingCart as ComponentClass<IProps, PageState>