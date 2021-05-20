import React, {Component, ComponentClass} from 'react'

import {connect} from 'react-redux'
import {View, Button, Text, RichText} from '@tarojs/components'
import Taro from "@tarojs/taro"
import {AtProgress} from 'taro-ui'

import './index.less'

import MultipleOptions from "../../components/MultipleOptions";
import InputComp from "../../components/InputComp";
import DoubleOptions from "../../components/DoubleOptions";

type PageStateProps = {}

type PageDispatchProps = {}

type PageState = {
    allData: any,
    nowQuestionList: any,
    currentQuestion: number,
    allowClick: boolean
}
type IProps = PageStateProps & PageDispatchProps

@connect(({}) => ({}), ({}) => ({}))
class TestPage extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
        this.state = {
            allData: [
                {
                    type: 'multipleOpt',
                    title: '问题1',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '18-28'}, {text: '28-38'}, {text: '38-48'}, {text: '48-58'}, {text: '58-68'}],
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
                    title: '问题3',
                    transform: 0,
                    transition: 0.5,
                    question: [{text: '问题一'}, {text: '218-38'}],
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
            allowClick: true
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
        console.log(this.state.nowQuestionList);
    }

    onHide() {
        console.log("丢失连接");
    }

    // 传参，如果是1就是下一题，如果是0就是上一题
    goNext() {
        if (this.state.allowClick) {
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
                }
                this.setState({
                    nowQuestionList: list
                });
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
                        })
                    }
                    a++;
                    this.setState({
                        currentQuestion: a,
                        allowClick: !this.state.allowClick
                    });
                    console.log(this.state.nowQuestionList);
                }, 0)
            }, 550)
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
                }, 0)
            }, 500)
        }

    }

    // 子组件通信父组件的方法
    getRes(res: string | number) {
        console.log(res, 'dddd');
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
                                                     getRes={this.getRes}
                                    /> : item.type === 'input' ?
                                    <InputComp title={item.title}
                                               goNext={this.goNext.bind(this)} getRes={this.getRes}/> :
                                    item.type === 'doubleOptions' ?
                                        <DoubleOptions getRes={this.getRes} goNext={this.goNext.bind(this)} title={item.title}
                                                       choice={item.question}/> :
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