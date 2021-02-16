import {FC} from "@tarojs/taro";
import {View} from "@tarojs/components";
import "./index.less";
import React from "react";

type Props = {
    leftFontSize?: number,
    leftColor?: string,
    leftFontWeight?: number,
    leftWord?: string,
    rightColor?: string,
    rightFontSize?: number,
    rightFontWeight?: number,
    rightWord?: string,
    hasLeftIcon?: boolean,
    hasRightIcon?: boolean,
    iconUrl?: string,
};

const ListItem: FC<Props> = ({leftFontSize, leftColor, leftFontWeight, leftWord, rightFontSize, rightColor, rightFontWeight, rightWord, hasLeftIcon, hasRightIcon, iconUrl}) => {
    return <View className='HeadLogo-main'>
        <View className='left-info'>
            <View className='ui'
                  style={{backgroundImage: `url('${iconUrl}')`, display: hasLeftIcon ? 'block' : 'none'}}> </View>
            <View className='text'
                  style={{
                      fontSize: `${leftFontSize}px`,
                      fontWeight: leftFontWeight,
                      color: leftColor
                  }}>{leftWord}</View>
        </View>
        <View className='right-info'>
            <View className='text'
                  style={{
                      fontSize: `${rightFontSize}px`,
                      color: rightColor,
                      fontWeight: rightFontWeight
                  }}>{rightWord}</View>
            <View className='iconfont icon-tubiaozhizuomoban arrow'
                  style={{display: hasRightIcon ? 'block' : 'none'}}> </View>
        </View>
    </View>;
};

ListItem.defaultProps = {
    leftFontSize: 15,
    leftColor: 'black',
    leftFontWeight: 500,
    leftWord: '左内容',
    rightFontSize: 15,
    rightColor: 'black',
    rightFontWeight: 500,
    rightWord: '右内容',
    hasLeftIcon: false,
    hasRightIcon: true,
    iconUrl: ''
};

export default ListItem


