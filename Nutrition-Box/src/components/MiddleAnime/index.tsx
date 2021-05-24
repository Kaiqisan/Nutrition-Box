import {FC} from "@tarojs/taro";
import "./index.less";
import React, {useState, useEffect} from "react";
import {Text, View} from "@tarojs/components";

type Props = {
    process: number,
    processList: {
        list: Array<{
            text: string,
            isFinish: boolean,
            isNext: boolean
        }>,
        transition: number
    }
}

let MiddleAnime: FC<Props> = ({process, processList}) => {
    // let [processList, setProcessList] = useState(new Array(...));

    // let [transition, setTransition] = useState(0);

    // for (let i = 0; i < process - 1; i++) {
    //         processList[i].isFinish = true
    //     }


    return <View className='MiddleAnime-main'>
        <View className='body'>
            {
                processList.list.map((item, i) => {
                    return <View className='process' key={i}>
                        <View style={{transition: `${processList.transition}s`}}
                              className={item.isFinish ? 'point-a' : item.isNext ? 'point-isnext' : 'point'}> </View>
                        <Text style={{transition: `${processList.transition}s`}}
                              className={item.isFinish || item.isNext ? 'text-a' : 'text'}>{item.text}</Text>
                    </View>
                })
            }
        </View>
    </View>
};

MiddleAnime.defaultProps = {};

export default MiddleAnime