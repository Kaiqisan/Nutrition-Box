import {FC} from "@tarojs/taro";
import "./index.less";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ScrollView, Text, View} from "@tarojs/components";

type Props = {
    title: string,
    choice: Array<{
        text: string
    }>,
    goNext: () => void,
    getRes: (res: any[]) => void,
    doUpdate: () => void,
    type: 0 | 1,
    sendMsg: (i: number) => void,
    receiveMsg: number[],
}

const MultipleOptionsWithUI: FC<Props> = ({title, choice, goNext, getRes, doUpdate, type, sendMsg, receiveMsg}) => {
    let [isSelected, setIsSelected] = useState(new Array(choice.length).fill(false));
    let [remindMsg, setRemindMsg]: [string, Dispatch<SetStateAction<string>>] = useState('可以选择1到4个');
    let [flag, setFlag] = useState(false);

    let doSelect = (i: number) => {
        if (type) {

            sendMsg(i);
            goNext();
        }
        sendMsg(i);
        let a = isSelected;
        a[i] = !a[i];
        setIsSelected(a);
        if (doSum() > 4) {
            setRemindMsg('选择个数不可大于4个');
            setFlag(false)
        } else if (doSum() < 1) {
            setRemindMsg('请选择');
            setFlag(false)
        } else {
            setRemindMsg('');
            setFlag(true)
        }
        doUpdate()
    };

    let doSum = (): number => {
        let res: number = 0;
        isSelected.forEach(item => {
            if (item) {
                res++
            }
        });
        return res
    };

    let submit = () => {
        if (flag) {
            goNext();
            getRes(isSelected)
        }
    };

    return <View className='MultipleOptionsWithUI-main'>
        <Text className='title'>{title}</Text>
        <Text className='tips'>{remindMsg}</Text>
        <ScrollView scrollY={true} className='choice' enableFlex={true}>
            {
                choice.map((item, i) => {
                    if (type && !receiveMsg.includes(i)) {
                        return ''
                    } else {
                        return <View className='choice-cont' key={i} onClick={() => {
                            doSelect(i)
                        }}>
                            <View className={type ? 'choice-cont-ui' : 'choice-cont-ui-big'}
                                  style={{backgroundColor: `${isSelected[i] ? '#2b2b2b' : 'white'}`}}> </View>
                            <Text className='choice-text'>{item.text}</Text>
                        </View>
                    }

                })

            }

        </ScrollView>
        {
            !type ? <View className={flag ? 'submit' : 'submit-disable'} onClick={() => {
                submit()
            }}>确定</View> : ''
        }
    </View>
};

MultipleOptionsWithUI.defaultProps = {};

export default MultipleOptionsWithUI