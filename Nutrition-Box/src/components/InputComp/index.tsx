import {FC} from "@tarojs/taro";
import {BaseEventOrig, Input, Text, View} from "@tarojs/components";
import "./index.less";
import React, {Dispatch, SetStateAction, useState} from "react";
import {InputProps} from "@tarojs/components/types/Input";

type Props = {
    title: string
    goNext: () => void,
    getRes: (res: string) => void
}

const InputComp: FC<Props> = ({goNext, getRes, title}) => {
    let [inputVal, setInputVal]: [string, Dispatch<SetStateAction<string>>] = useState('');
    let [remindMsg, setRemindMsg]: [string, Dispatch<SetStateAction<string>>] = useState('');
    let [val, setVal] = useState('');
    let [flag, setFlag] = useState(false);

    let doInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
        let sum: number = 0;
        let _val = e.detail.value;
        for (let i = 0; i < _val.length; i++) {
            if (_val[i] === '.') {
                sum++
            }
        }
        // TODO 后期整改的时候可以选择封装一个方法除去除第一个小数点外的其他所有小数点
        if (sum >= 2) {
            let arr_Val = _val.split('.');
            _val = arr_Val[0] + '.';
            for (let j = 1; j < arr_Val.length; j++) {
                _val = _val + arr_Val[j]
            }
            setVal(_val);

        }
        setVal(_val);
        let Num_val = Number(_val);
        if (title === '身高') {
            if (!_val) {
                setRemindMsg('请输入身高');
                setFlag(false)
            } else if (Num_val < 70) {
                setRemindMsg('身高不能小于70');
                setFlag(false)
            } else if (Num_val > 250) {
                setRemindMsg('身高不能大于250');
                setFlag(false)
            }  else {
                setRemindMsg('');
                setFlag(true)
            }
            let hei: number = Number(_val);
            let res: string = `${Math.floor(hei / 100)} 米 ${String(hei % 100).replace('.', '').slice(0, 4)}`;
            setInputVal(res)
        } else {
            if (!_val) {
                setRemindMsg('请输入体重');
                setFlag(false)
            } else if (Num_val < 5.5) {
                setRemindMsg('体重不能小于5.5');
                setFlag(false)
            } else if (Num_val > 250) {
                setRemindMsg('身高不能大于300');
                setFlag(false)
            }  else {
                setRemindMsg('');
                setFlag(true)
            }
            let wei: number = Number(_val);
            let res: string = `${wei * 2 } 斤`;
            setInputVal(res)
        }
    };

    let finish = () => {
        if (flag) {
            goNext();
            getRes(val);
        }
    };

    return <View className='InputComp-main'>
        <View className='hei'>
            <Text className='title'>{title === '身高' ? '身高' : '体重'}</Text>
            <Text className='remind'>{remindMsg}</Text>
            <View className='input'>
                <View className='finish' onClick={() => {
                    finish()
                }}> </View>
                <Text className='unit'>{title === '身高' ? 'cm' : 'kg'}</Text>
                <Input onInput={(event) => {
                    doInput(event)
                }}
                       value={val}
                       className='input-area' type='number'
                       placeholder={`请输入${title === '身高' ? '身高' : '体重'}`}
                       maxlength={6}/>
            </View>
            <Text className='equal-val'>{val ? `=${inputVal}` : ''}</Text>
        </View>
    </View>
};

InputComp.defaultProps = {
    title: '',
    goNext: () => {
    },
    getRes: () => {
    }
};

export default InputComp

