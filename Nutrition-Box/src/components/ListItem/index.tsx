import {FC} from "@tarojs/taro";
import {Image, View} from "@tarojs/components";
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
    paddingTop?: number
    paddingBottom?: number,
    hasLeftIcon?: boolean,
    hasRightIcon?: boolean,
    iconUrl?: string,
};

const ListItem: FC<Props> = ({leftFontSize, leftColor, leftFontWeight, leftWord, rightFontSize, rightColor, rightFontWeight, rightWord, hasLeftIcon, hasRightIcon, iconUrl, paddingTop, paddingBottom}) => {
    return <View className='HeadLogo-main' style={{padding: `${paddingTop}px 0 ${paddingBottom}px 0`}}>
        <View className='left-info'>
            <Image className='ui' src={`${iconUrl}`}
                  style={{display: hasLeftIcon ? 'block' : 'none'}} />
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
    paddingTop: 10,
    paddingBottom: 10,
    hasLeftIcon: false,
    hasRightIcon: true,
    iconUrl: ''
};

export default ListItem


