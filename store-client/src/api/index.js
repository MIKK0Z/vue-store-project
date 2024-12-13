import axios from "axios";

const get = (url) => new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

const getPromotions = () => get("http://localhost:3000/promotions");

export {
    getPromotions,
}