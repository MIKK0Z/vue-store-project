import { createStore } from "vuex";

import promotions from "./promotions.js";
import promotion from "./promotion.js";

const modules = {
    promotions,
    promotion,
};

export default createStore({
    modules,
});