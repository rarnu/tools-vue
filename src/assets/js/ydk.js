import axios from "axios";

export default {
    getCardNameList(list, language, callback) {
        let cardSet = Array.from(new Set(list));
        cardSet = cardSet.map(e => e.trim());
        axios.post('/ydk/names', JSON.stringify({ids: cardSet, lang: language})).then(res => {
            console.log(res.data);
            let arr = [];
            res.data.data.forEach(e => {
                console.log(e);
                arr.push({id: `${e.id}`.trim(), name: e.name.trim(), exported: false, count: this.getCardCount(list, `${e.id}`)});
            });
            callback(arr);
        });
    },

    getCardCount(list, id) {
        let count = 0;
        for (let i = 0; i < list.length; i++) {
            if (parseInt(list[i]) === parseInt(id)) {
                count++;
            }
        }
        return count;
    }
}