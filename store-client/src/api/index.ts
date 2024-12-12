import axios from "axios";

const get = (url: string) => new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
        console.log(res);
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
});

const getPromotions = get("http://localhost:3000/promotions");

export {
    getPromotions,
}