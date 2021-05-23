import React, {Component, ComponentClass} from 'react'

import {connect} from 'react-redux'
import {View, Button, Text, RichText} from '@tarojs/components'
import Taro from "@tarojs/taro"
import {AtProgress} from 'taro-ui'

import './index.less'

import MultipleOptions from "../../components/MultipleOptions";
import InputComp from "../../components/InputComp";
import DoubleOptions from "../../components/DoubleOptions";
import MultipleOptionsWithUI from "../../components/MultipleOptionsWithUI";
import MiddleAnime from "../../components/MiddleAnime";
import duplicateCodes from "../../utils/duplicateCodes";
import MultipleOptionsWithTwoLine from "../../components/MultipleOptionsWithTwoLine";

type PageStateProps = {}

type PageDispatchProps = {}

type PageState = {
    allData: any,
    nowQuestionList: any,
    currentQuestion: number,
    allowClick: boolean,
    doSel: boolean,
    multipleOptionsWithUIMsg: number[]
}
type IProps = PageStateProps & PageDispatchProps

@connect(({}) => ({}), ({}) => ({}))
class TestPage extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            allData: [
                {
                    type: 'multipleOptionsWithTwoLine',
                    title: '以下饮料喝的最多的是？？',
                    maximumSel: 0,
                    hasHeadUI: true,
                    hasContUI: true,
                    choice: [{text: '白水'}, {text: '咖啡'}, {text: '茶'}, {text: '可乐'}, {text: '阿帕茶'},],
                    transform: 0,
                    transition: 0.5,
                },
                // TODO:这个过场动画会带来过分的性能损耗，需要优化
                {
                    type: 'middleAnime',
                    process: 0,
                    transform: 0,
                    transition: 0.5,
                },
                {
                    type: 'multipleOptionsWithUI',
                    UISize: 0,
                    title: '请选择营养目标',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '皮肤'}, {text: '情绪,压力或抑郁'}, {text: '脑力'}, {text: '疲劳,睡眠质量'}, {text: '头发'}],
                },
                {
                    type: 'multipleOptionsWithUI',
                    UISize: 1,
                    title: '请选择优先的营养目标',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '皮肤'}, {text: '情绪,压力或抑郁'}, {text: '脑力'}, {text: '疲劳,睡眠质量'}, {text: '头发'}],
                },
                {
                    type: 'multipleOpt',
                    title: '问题1',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '18-28'}, {text: '28-38'}, {text: '38-48'}, {text: '48-58'}, {text: '58-68'}],
                    haiNoneChoice: true,
                },

                {
                    type: 'input',
                    title: '身高',
                    transform: 0,
                    transition: 0.5,
                },
                {
                    type: 'input',
                    title: '体重',
                    transform: 0,
                    transition: 0.5,
                },
                {
                    type: 'doubleOptions',
                    title: '性别',
                    question: [{text: '男'}, {text: '女'}],
                    transform: 0,
                    transition: 0.5,
                },

                {
                    type: 'multipleOpt',
                    title: '问题4',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '问题一'}, {text: '218-38'}],
                },
                {
                    type: 'multipleOpt',
                    title: '问题5',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '问题一'}, {text: '218-38'}],
                }
            ],
            nowQuestionList: [],
            currentQuestion: 0,
            allowClick: true,
            doSel: true,
            multipleOptionsWithUIMsg: []
        }
    }

    componentWillUnmount(): void {
        console.log("丢失连接");
    }

    componentDidMount(): void {
        let _nowQuestionList = this.state.nowQuestionList;
        let initList = [{
            transform: 0,
            transition: 0.5,
            type: ''
        }, this.state.allData[0], this.state.allData[1]];
        for (let i = 0; i < initList.length; i++) {
            _nowQuestionList.push(JSON.parse(JSON.stringify(initList[i])));
        }

        this.setState({
            nowQuestionList: this.state.nowQuestionList
        });
        this.isMiddleAnime(this.state.currentQuestion);
        // console.log(this.state.nowQuestionList);
    }

    @duplicateCodes.Watch({
        'currentQuestion'(val: number, newVal: number) {
            this.isMiddleAnime(newVal);
        }
    })
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<PageState>, snapshot?: any): void {

    }

    // shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<PageState>, nextContext: any): boolean {
    //     return this.state.doSel === nextState.doSel;
    // }

    isMiddleAnime(newVal: number) {
        if (this.state.allData[newVal].type === 'middleAnime') {
            setTimeout(() => {
                this.goNext()
            }, 2500)
        }
    }

    onHide() {
        console.log("丢失连接");
    }

    // 传参，如果是1就是下一题，如果是0就是上一题
    // TODO 到中间过场动画这里的衔接不是很好需要改进
    goNext() {
        console.log();
        if (this.state.currentQuestion === this.state.allData.length - 2) {
            return
        }
        if (this.state.allowClick) {
            console.log('done');
            this.setState({
                allowClick: !this.state.allowClick
            });
            let a = this.state.currentQuestion;
            let list = this.state.nowQuestionList;
            list.push(JSON.parse(JSON.stringify(this.state.allData[a + 2])));
            for (let i = 0; i < list.length; i++) {
                // list[i].transform = 0;
                list[i].transform -= 100;
            }
            this.setState({
                nowQuestionList: list
            });

            setTimeout(() => {
                for (let i = 0; i < list.length; i++) {
                    list[i].transition = 0;
                    this.setState({
                        nowQuestionList: list
                    });
                }

                // list[a].transform = 0;
                // this.setState({
                //     nowQuestionList: list
                // });
                list.shift();
                this.setState({
                    nowQuestionList: list
                });
                for (let i = 0; i < list.length; i++) {
                    list[i].transform = 0;
                    // list[i].transform += 100;
                }
                this.setState({
                    nowQuestionList: list
                });

                setTimeout(() => {
                    for (let i = 0; i < list.length; i++) {
                        list[i].transition = 0.5;
                        this.setState({
                            nowQuestionList: list
                        });
                    }

                    a++;
                    this.setState({
                        currentQuestion: a,
                        allowClick: !this.state.allowClick
                    });
                }, 100)
            }, 500)
        }
    }

    goPrev() {
        if (!this.state.currentQuestion) {
            Taro.navigateBack().then(() => {
            });
            return
        }
        if (this.state.allowClick) {
            this.setState({
                allowClick: !this.state.allowClick
            });
            let a = this.state.currentQuestion;
            let list = this.state.nowQuestionList;
            for (let i = 0; i < list.length; i++) {
                // list[i].transform = 0;
                list[i].transform += 100;
            }
            this.setState({
                nowQuestionList: list
            });

            setTimeout(() => {
                list.pop();
                if (a !== 1) {
                    list.unshift(JSON.parse(JSON.stringify(this.state.allData[a - 2])));
                } else {
                    list.unshift({transform: 0, transition: 0.5})
                }
                for (let i = 0; i < list.length; i++) {
                    list[i].transition = 0;
                }
                this.setState({
                    nowQuestionList: list
                });

                for (let i = 0; i < list.length; i++) {
                    list[i].transform = 0;
                    // list[i].transform -= 100;
                }

                this.setState({
                    nowQuestionList: list
                });
                setTimeout(() => {
                    for (let i = 0; i < list.length; i++) {
                        list[i].transition = 0.5;
                        this.setState({
                            nowQuestionList: list
                        })
                    }
                    a--;
                    this.setState({
                        currentQuestion: a,
                        allowClick: !this.state.allowClick
                    });
                }, 80)
            }, 500)
        }

    }

    // 传给子组件，通知父组件该更新了
    doUpdate() {
        this.setState({
            doSel: !this.state.doSel
        })
    }

    // 子组件通信父组件的方法
    getRes(res: string | number | boolean[]) {
        console.log(res, 'dddd');
    }

    multipleOptionsWithUISendMsg(i: number) {
        // TODO： 解决取消选择时的数组成员删除
        let arr = this.state.multipleOptionsWithUIMsg.concat();
        if (!arr.includes(i)) {
            arr.push(i);
        }
        arr.push(i);
        arr.sort((a, b) => {
            return a - b
        });
        console.log(i, arr, 'dsad');
        this.setState({
            multipleOptionsWithUIMsg: arr
        })
    }

    render() {
        return <View className='testPage-main'>
            <View className='process-head'>
                <View className='back' onClick={this.goPrev.bind(this)}>
                    <Text className='back-ui'>{'<'}</Text>
                    <Text className='back-text'>{!this.state.currentQuestion ? '返回' : '上一题'}</Text>
                </View>
                <View className='process-line'>
                    <AtProgress percent={55} strokeWidth={15} color={'#ffed00'}/>
                </View>
            </View>
            <View className='question-list'>
                {
                    this.state.nowQuestionList.map((item) => {
                        return <View
                            key={item.title}
                            style={{transform: `translateX(${item.transform}vw)`, transition: `${item.transition}s`}}>
                            {
                                item.type === 'multipleOpt' ?
                                    <MultipleOptions title={item.title} choice={item.question}
                                                     goNext={this.goNext.bind(this)}
                                                     haiNoneChoice={item.haiNoneChoice}
                                                     getRes={this.getRes}/> :
                                    item.type === 'input' ?
                                        <InputComp title={item.title}
                                                   goNext={this.goNext.bind(this)} getRes={this.getRes}/> :
                                        item.type === 'doubleOptions' ?
                                            <DoubleOptions getRes={this.getRes} goNext={this.goNext.bind(this)}
                                                           title={item.title}
                                                           choice={item.question}/> :
                                            item.type === 'multipleOptionsWithUI' ?
                                                <MultipleOptionsWithUI title={item.title} choice={item.question}
                                                                       goNext={this.goNext.bind(this)}
                                                                       getRes={this.getRes}
                                                                       type={item.UISize}
                                                                       sendMsg={this.multipleOptionsWithUISendMsg.bind(this)}
                                                                       receiveMsg={this.state.multipleOptionsWithUIMsg}
                                                                       doUpdate={this.doUpdate.bind(this)}/> :
                                                item.type === 'middleAnime' ?
                                                    <MiddleAnime process={item.process}/> :
                                                    item.type === 'multipleOptionsWithTwoLine' ?
                                                        <MultipleOptionsWithTwoLine title={item.title}
                                                                                    maximumSel={item.maximumSel}
                                                                                    hasHeadUI={item.hasHeadUI}
                                                                                    hasContUI={item.hasContUI}
                                                                                    choice={item.choice}
                                                                                    goNext={this.goNext.bind(this)}
                                                                                    doUpdate={this.doUpdate.bind(this)}
                                                                                    getRes={this.getRes}/> :
                                                        <View style={{width: '100vw'}}> </View>
                            }
                        </View>
                    })
                }
            </View>
        </View>
    }
}

export default TestPage as ComponentClass<IProps, PageState>