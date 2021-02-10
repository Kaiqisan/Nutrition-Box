// import React from "react";
// import Taro, { useState } from '@tarojs/taro'
// import {View} from "@tarojs/components";
//
// import './index.less'
//
// type Props = {
//     name: string
// }
//
// const HeadLogo: Taro.FC<Props> = (props) => {
//     return (
//         <View>
//             ddddddddd
//         </View>
//     )
// };
//
// HeadLogo.defaultProps = {
//     name: 'a'
// };
//
// export default HeadLogo

import {FC} from "@tarojs/taro";
// import classnames from "classnames";
import {View, Image} from "@tarojs/components";
import "./index.less";
import React from "react";
// import {ComponentClass} from "react";

type Props = {

};

const HeadLogo: FC<Props> = () => {
    return <View className='HeadLogo-main'>
        <Image src={require("../../assets/images/logo.jpg")} className='logo' />
    </View>;
};

export default HeadLogo


