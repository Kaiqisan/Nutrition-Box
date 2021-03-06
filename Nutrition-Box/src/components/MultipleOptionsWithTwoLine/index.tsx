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
    getRes: (res: any[]) => void,
    doUpdate: () => void
}

const MultipleOptionsWithTwoLine: FC<Props> = ({title, maximumSel, hasHeadUI, hasContUI, choice, goNext, getRes, doUpdate}) => {
    let [remindMsg, setRemindMsg] = useState('请选择');
    let [_choice, setChoice] = useState(new Array(choice.length).fill(false));
    let [flag, setFlag] = useState(Boolean(!maximumSel));
    let [btnText, setBtnText] = useState(maximumSel ? '确认' : '无');


    // console.log('update!');

    let doSelect = (i: number) => {
        let a = _choice.concat();
        a[i] = !a[i];
        setChoice(a);
        // goNext()
        let sum = 0;
        a.forEach(item => {
            if (item) {
                sum++
            }
        });
        if (maximumSel) {
            if (sum > maximumSel || sum === 0) {
                setRemindMsg(`最多可选${maximumSel}个`);
                setFlag(false)
            } else {
                setFlag(true)
            }
        } else {
            if (sum) {
                setBtnText('确认')
            } else {
                setBtnText('无')
            }
        }
        doUpdate()
    };

    let submit = () => {
        if (flag) {
            goNext();
            getRes(_choice)
        }
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
                        return <View className={_choice[i] ? 'choice-cont-a' : 'choice-cont'} key={i} onClick={() => {
                            doSelect(i)
                        }}>
                            <View className='wrap'>
                                <Image className='choice-cont-img' src={require('../../assets/images/pill.png')}/>
                                <Text className='choice-cont-text'>{item.text}</Text>
                            </View>
                        </View>
                    } else {
                        return <View className={_choice[i] ? 'choice-cont-a' : 'choice-cont'} key={i} onClick={() => {
                            doSelect(i)
                        }}>{item.text}</View>
                    }
                })
            }
        </View>
        {/* TODO: 在没有限制选择数量的时候，选择的时候按钮文字应从 ‘无’ 到 ‘确认’ */}
        <View className={flag ? 'submit' : 'submit-disable'} onClick={() => {
            submit()
        }}>{btnText}</View>
    </View>
};

MultipleOptionsWithTwoLine.defaultProps = {};

export default MultipleOptionsWithTwoLine