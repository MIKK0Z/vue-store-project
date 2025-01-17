<script>
    import PromotionTile from "@/components/PromotionTile.vue";
    import Loading from "@/components/Loading.vue";

    export default {
        computed: {
            promotionsList() {
                return this.$store.getters.GET_PROMOTIONS_LIST;
            },
            arePromotionsLoading() {
                return this.$store.getters.GET_PROMOTIONS_LOADING;
            },
        },
        components: {
            PromotionTile,
            Loading,
        },
        created() {
            this.$store.dispatch("FETCH_PROMOTIONS");
        },
    };
</script>

<template>
    <template v-if="arePromotionsLoading">
        <Loading />
    </template>
    <template v-else>
        <PromotionTile v-for="promotion in promotionsList" :key="promotion.id" :promotion="promotion" />
    </template>
</template>
