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
    }
}