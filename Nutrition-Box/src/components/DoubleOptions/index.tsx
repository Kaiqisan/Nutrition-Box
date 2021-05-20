import {FC} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import "./index.less";
import React, {useState} from "react";

type Props = {
    title: string,
    choice: Array<{ text: string }>,
    goNext: () => void,
    getRes: (res: number | string) => void
}

const DoubleOptions: FC<Props> = ({title, choice, goNext, getRes}) => {
    let [isSelectedList, setIsSelectedList] = useState(new Array(choice.length).fill(false));
    console.log(choice, 'sddasd');

    let doSelect = (i: number) => {
        console.log(i);
        let a = isSelectedList;
        a[i] = !a[i];
        setIsSelectedList(a);
        goNext();
        getRes(i)
    };

    return <View className='DoubleOptions-main'>
        <Text className='title'>{title}</Text>
        <View className='cont'>
            {choice.map((item, i) => {
                return <View key={i}
                             className={isSelectedList[i] ? 'choice-a' : 'choice'}
                             onClick={() => {
                                 doSelect(i)
                             }}>
                    <Text className='text'>{item.text}</Text>
                </View>
            })}
        </View>
    </View>
};

DoubleOptions.defaultProps = {
    title: '',
    choice: [],
    goNext: () => {},
    getRes: () => {}
};

export default DoubleOptions