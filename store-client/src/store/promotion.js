import { getPromotion, getProduct } from "@/api";

const promotion = {
    state() {
        return {
            promotionObject: {},
            promotionLoading: false,
            promotionError: null,
        };
    },

    getters: {
        GET_PROMOTION_OBJECT(state) {
            return state.promotionObject;
        },

        GET_PROMOTION_LOADING(state) {
            return state.promotionLoading;
        },

        GET_PROMOTION_ERROR(state) {
            return state.promotionError;
        },
    },

    mutations: {
        SET_PROMOTION_OBJECT(state, newPromotionObject) {
            state.promotionObject = newPromotionObject;
        },

        SET_PROMOTION_LOADING(state, newPromotionLoading) {
            state.promotionLoading = newPromotionLoading;
        },

        SET_PROMOTION_ERROR(state, newPromotionError) {
            state.promotionError = newPromotionError;
        },
    },

    actions: {
        FETCH_PROMOTION({ _state, commit, getters }, promotionID) {
            commit("SET_PROMOTION_LOADING", true);
            commit("SET_PROMOTION_OBJECT", {});

            const allLoadedPromotions = getters.GET_PROMOTIONS_LIST;
            const cachedPromotion = allLoadedPromotions.find(({ id: promotion_id}) => {
                return promotion_id === promotionID;
            });

            const handleError = (error) => {
                commit("SET_PROMOTION_ERROR", error);
                commit("SET_PROMOTION_LOADING", false);
            }

            const fetchProducts = (promotion) => {
                const productsPromises = promotion.items.map((productID) => getProduct(productID));
                Promise.all(productsPromises).then((items) => {
                    const promotionWithProducts = { ...promotion, items };

                    commit("SET_PROMOTION_OBJECT", promotionWithProducts);
                    commit("SET_PROMOTION_LOADING", false);
                }).catch(handleError);
            }

            if (cachedPromotion) {
                fetchProducts(cachedPromotion);
            } else {
                getPromotion(promotionID).then(fetchProducts).catch(handleError);
            }
        },
    },
};

export default promotion;