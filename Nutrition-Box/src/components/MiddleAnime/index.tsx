import {FC} from "@tarojs/taro";
import "./index.less";
import React, {useState, useEffect} from "react";
import {Text, View} from "@tarojs/components";

type Props = {
    process: number,
}

let MiddleAnime: FC<Props> = ({process}) => {
    let [processList, setProcessList] = useState(new Array(...[
        {
            text: '基本信息',
            isFinish: false,
            isNext: false,
        },
        {
            text: '营养目标',
            isFinish: false,
            isNext: false,
        },
        {
            text: '生活习惯',
            isFinish: false,
            isNext: false,
        },
        {
            text: '身体状况',
            isFinish: false,
            isNext: false,
        }
    ]));

    let [transition, setTransition] = useState(0);

    // for (let i = 0; i < process - 1; i++) {
    //         processList[i].isFinish = true
    //     }

    setTimeout(() => {
        let res = processList.concat();
        for (let i = 0; i < process; i++) {
            res[i].isFinish = true
        }
        setProcessList(res);

        setTimeout(() => {
            setTransition(0.5);
            setTimeout(() => {
                res[process].isNext = true
            }, 0)
        }, 1500)
    }, 0);

    // setTimeout(() => {
    //     let res = processList.concat();
    //     for (let i = 0; i < process - 1; i++) {
    //         res[i].isFinish = true
    //     }
    //     setProcessList(res);
    //     doUpdate()
    // }, 1500);

    return <View className='MiddleAnime-main'>
        <View className='body'>
            {
                processList.map((item, i) => {
                    return <View className='process' key={i}>
                        <View style={{transition: `${transition}s`}}
                              className={item.isFinish ? 'point-a' : item.isNext ? 'point-isnext' : 'point'}> </View>
                        <Text style={{transition: `${transition}s`}}
                              className={item.isFinish || item.isNext ? 'text-a' : 'text'}>{item.text}</Text>
                    </View>
                })
            }
        </View>
    </View>
};

MiddleAnime.defaultProps = {

};

export default MiddleAnime