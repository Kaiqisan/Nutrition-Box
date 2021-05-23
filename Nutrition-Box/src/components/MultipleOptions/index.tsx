import {FC} from "@tarojs/taro";
import "./index.less";
import React, {useState, useEffect} from "react";
import {Image, View} from "@tarojs/components";


type Props = {
    title: string,
    choice: Array<{
        text: string
    }>,
    goNext: () => void,
    getRes: (res: number) => void,
    haiNoneChoice: boolean
}


const MultipleOptions: FC<Props> = ({title, choice, goNext, getRes, haiNoneChoice}) => {
    let [_choice, setChoice] = useState(new Array(choice.length).fill(false));

    let doSelect = (i: number) => {
        let a = _choice;
        a[i] = !a[i];
        setChoice(a);
        for (let i = 0; i < _choice.length; i++) {
            if (_choice[i]) {
                getRes(i);
                break;
            }
        }
        goNext();
    };
    
    useEffect(() => {

    });

    return <View className='MultipleOptions-main'>
        <Image className='UI' src={require('../../assets/images/pill.png')} />
        <View className='title'>{title}</View>
        <View className='choice'>
            {
                choice.length ? choice.map((item, i) => {
                    return <View className={_choice[i] ? 'choice-cont-a' : 'choice-cont'}
                                 onClick={() => {
                                     doSelect(i);
                                 }}
                                 key={i}>{item.text}</View>
                }) : ''
            }
        </View>
        {
            haiNoneChoice ? <View className={'submit'} onClick={() => {
            doSelect(100)
        }}>无</View> : ''
        }

    </View>
};

MultipleOptions.defaultProps = {
    title: '',
    choice: [],
    goNext: () => {}
};

export default MultipleOptions