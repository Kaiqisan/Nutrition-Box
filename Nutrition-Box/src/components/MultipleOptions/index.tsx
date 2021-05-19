import {FC} from "@tarojs/taro";
import "./index.less";
import React, {useState, useEffect} from "react";
import {View} from "@tarojs/components";


type Props = {
    title: string,
    choice: Array<{
        text: string,
        isSelected?: boolean
    }>,
    goNext: () => void
}


const MultipleOptions: FC<Props> = ({title, choice, goNext}) => {
    let [_choice, setChoice] = useState(choice);
    // let _choice = new Array(...choice);

    let doSelect = (i: number) => {
        let a = _choice.concat();
        // _choice[i].isSelected = !_choice[i].isSelected
        a[i].isSelected = !a[i].isSelected;
        setChoice(a);
        goNext()
    };
    
    useEffect(() => {

    });

    return <View className='MultipleOptions-main'>
        <View className='title'>{title}</View>
        <View className='choice'>
            {
                _choice.length ? _choice.map((item, i) => {
                    return <View className={item.isSelected ? 'choice-cont-a' : 'choice-cont'}
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