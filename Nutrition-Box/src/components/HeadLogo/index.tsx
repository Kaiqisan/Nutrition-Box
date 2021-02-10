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

import Taro, {FC, memo} from "@tarojs/taro";
// import classnames from "classnames";
import {View} from "@tarojs/components";
import "./index.less";
import React from "react";

type Props = {

};

const HeadLogo: any = () => {
    return <View>dd</View>;
};

// export default memo(HeadLogo, (oldProps, newProps) => {
//     return (
//         oldProps.fullPage === newProps.fullPage && oldProps.hide === newProps.hide
//     );
// });
export default HeadLogo


