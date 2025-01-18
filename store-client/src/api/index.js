import axios from "axios";
const BASE_URL = "http://localhost:3000";

const get = (url) => new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

const getPromotions = () => get(`${BASE_URL}/promotions`);
const getPromotion = (id) => get(`${BASE_URL}/promotion/${id}`);
const getProduct = (id) => get(`${BASE_URL}/product/${id}`);

const post = (url, data) => new Promise((resolve, reject) => {
    axios.post(url, data, { withCredentials: true }).then((res) => {
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

const postRegister = (data) => post(`${BASE_URL}/register`, data);

export {
    getPromotions,
    getPromotion,
    getProduct,
    postRegister,
}