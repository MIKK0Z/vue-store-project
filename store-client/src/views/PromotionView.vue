<script>
    import Loading from "@/components/Loading.vue";
    import PromotionTile from "@/components/PromotionTile.vue";
    import ProductTile from "@/components/ProductTile.vue";

    export default {
        computed: {
            promotionObject() {
                return this.$store.getters.GET_PROMOTION_OBJECT;
            },
            isPromotionLoading() {
                return this.$store.getters.GET_PROMOTION_LOADING;
            },
        },
        components: {
            Loading,
            PromotionTile,
            ProductTile,
        },
        created() {
            this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
        },
    };
</script>

<template>
    <template v-if="isPromotionLoading">
        <Loading />
    </template>
    <template v-else>
        <div class="top">
            <PromotionTile :promotion="promotionObject" />
        </div>
        <main>
            <div>
                {{ promotionObject.longDescription }}
            </div>
            <div class="expires">
                promotion ends: {{ promotionObject.finishCondition ?? new Date(promotionObject.finishDate).toDateString() }}
            </div>
            <div class="products">
                <ProductTile v-for="product in promotionObject.items" :product="product" :key="product.id" />
            </div>
        </main>
    </template>
</template>

<style scoped>
    .top {
        position: relative;
        inset: -1rem;
        width: calc(100% + 2rem);
        height: 12rem;
        margin-bottom: 4rem;
    }
    
    main > div {
        margin-block: 1rem;
    }

    .products {
        display: flex;
        justify-content: space-around;
    }
</style>
