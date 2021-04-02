export default {
    getIdList(highlightNode: any): string[] {
        let nowList: string[] = [];
        searchId(highlightNode);

        function searchId(currentNode) {
            nowList.push(currentNode.uid);
            if (currentNode.childNodes.length) {
                for (let i = 0; i < currentNode.childNodes.length; i++) {
                    searchId(currentNode.childNodes[i])
                }
            }
        }

        return nowList
    },

    isClickOutSide(uid: string, list: any): boolean {
        return list.includes(uid)
    },

    Watch(watchval: any) {
        return function (target: any, name: any, descriptor) {
            const fn = descriptor.value;
            descriptor.value = function (prevProps, prevState) {
                // console.log(prevProps, this.props);
                // 识别watchvalues中的值，执行回调
                Object.entries(watchval).forEach(([name, callback]) => {
                    let keyList: string[] = name.split('.');
                    const oldValue = getDeepVal(keyList, prevProps) || getDeepVal(keyList, prevState);
                    const newValue = getDeepVal(keyList, this.props) || getDeepVal(keyList, this.state);
                    // 默认我们修改数据不会修改数据类型
                    if (typeof oldValue === "number" || typeof oldValue === "string") {
                        if (oldValue !== newValue) {
                            callback.apply(this, [oldValue, newValue])
                        }
                    } else if (Array.isArray(oldValue)) {
                        if (!oldValue.every((item, i) => {
                            return item === newValue[i]
                        })) {
                            callback.apply(this, [oldValue, newValue])
                        }
                    }

                });

                function getDeepVal(keyList: string[], prevVal: any) {
                    for (let i = 0; i < keyList.length; i++) {
                        if (typeof prevVal === "object") {
                            prevVal = prevVal[keyList[i]]
                        } else {
                            break
                        }
                    }
                    return prevVal
                }

                fn.apply(this, arguments)
            };
            return descriptor
        }
    }
}