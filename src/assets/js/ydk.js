import axios from "axios";

export default {
    getCardNameList(list, language, callback) {
        let cardSet = Array.from(new Set(list));
        let reqSet = cardSet.map(e => axios.get(`/yugioh/card/${e}?lang=${language}`));
        axios.all(reqSet).then(axios.spread((...result) => {
            let arr = [];
            result.forEach(e => {
                arr.push({id: `${e.data.data.id}`, name: e.data.data.name});
            });
            let mapped = list.map(e => this.getElement(arr, e));
            callback(mapped);
        }));
    },
    getElement(arr, id) {
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id.trim() === id.trim()) {
                obj = arr[i];
                break;
            }
        }
        return obj;
    }
}