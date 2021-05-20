import {FC} from "@tarojs/taro";
import "./index.less";
import React, {useState, useEffect} from "react";
import {View} from "@tarojs/components";


type Props = {
    title: string,
    choice: Array<{
        text: string
    }>,
    goNext: () => void,
    getRes: (res: number) => void
}


const MultipleOptions: FC<Props> = ({title, choice, goNext, getRes}) => {
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
    </View>
};

MultipleOptions.defaultProps = {
    title: '',
    choice: [],
    goNext: () => {}
};

export default MultipleOptions