import {FC} from "@tarojs/taro";
import "./index.less";
import React, {useState, useEffect} from "react";
import {Image, Text, View} from "@tarojs/components";

type Props = {
    title: string,
    maximumSel: number,
    hasHeadUI: boolean,
    hasContUI: boolean,
    choice: Array<{
        text: string,
        imageUrl?: string
    }>,
    goNext: () => void,
    getRes: (res: number) => void
}

const MultipleOptionsWithTwoLine: FC<Props> = ({title, maximumSel, hasHeadUI, hasContUI, choice, goNext, getRes, doUpdate}) => {
    let [remindMsg, setRemindMsg] = useState('请选择');
    let [_choice, setChoice] = useState(new Array(choice.length).fill(false));

    let doSelect = (i: number) => {
        let a = _choice;
        a[i] = !a[i];
        setChoice(a);
        // for (let i = 0; i < _choice.length; i++) {
        //     if (_choice[i]) {
        //         getRes(i);
        //         break;
        //     }
        // }
        doUpdate()
    };

    return <View className='MultipleOptionsWithTwoLine-main'>
        {
            hasHeadUI ? <Image className='headUI' src={require('../../assets/images/pill.png')}/> : ''
        }
        <Text className='title'>{title}</Text>
        <Text className='remindMsg'>{remindMsg}</Text>
        <View className='choice'>
            {
                choice.map((item, i) => {
                    if (hasContUI) {
                        return <View className={_choice[i] ? 'choice-cont-a' : 'choice-cont'} key={i} onClick={() => {doSelect(i)}}>
                            <View className='wrap'>
                                <Image className='choice-cont-img' src={require('../../assets/images/pill.png')}/>
                                <Text className='choice-cont-text'>{item.text}</Text>
                            </View>
                        </View>
                    } else {
                        return <View className={_choice[i] ? 'choice-cont-a' : 'choice-cont'} key={i} onClick={() => {doSelect(i)}}>{item.text}</View>
                    }
                })
            }
        </View>
    </View>
};

MultipleOptionsWithTwoLine.defaultProps = {};

export default MultipleOptionsWithTwoLine