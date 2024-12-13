import { getPromotions } from "@/api";

const promotions = {
    state() {
        return {
            promotionsList: [],
            promotionsLoading: false,
            promotionsError: null,
        };
    },

    getters: {
        GET_PROMOTIONS_LIST(state) {
            return state.promotionsList;
        },

        GET_PROMOTIONS_LOADING(state) {
            return state.promotionsLoading;
        },

        GET_PROMOTIONS_ERROR(state) {
            return state.promotionsError;
        },
    },

    mutations: {
        SET_PROMOTIONS_LIST(state, newPromotionsList) {
            state.promotionsList = newPromotionsList;
        },

        SET_PROMOTIONS_LOADING(state, newPromotionsLoading) {
            state.promotionsLoading = newPromotionsLoading;
        },

        SET_PROMOTIONS_ERROR(state, newPromotionsError) {
            state.promotionsError = newPromotionsError;
        },
    },

    actions: {
        FETCH_PROMOTIONS({ state, commit }) {
            commit("SET_PROMOTIONS_LOADING", true);

            getPromotions().then((data) => {
                console.log(data)
                commit("SET_PROMOTIONS_LIST", data.promotions);
            }).catch((error) => {
                commit("SET_PROMOTIONS_ERROR", error);
            }).finally(() => {
                commit("SET_PROMOTIONS_LOADING", false);
            });
        },
    },
};

export default promotions;