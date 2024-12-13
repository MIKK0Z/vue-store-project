<script>
    import PromotionTile from '@/components/PromotionTile.vue';

    export default {
        computed: {
            promotionsList() {
                return this.$store.getters.GET_PROMOTIONS_LIST;
            },
        },
        components: {
            PromotionTile,
        },
        created() {
            this.$store.dispatch("FETCH_PROMOTIONS");
        },
    };
</script>

<template>
    <!-- {{ JSON.stringify(promotionsList) }} -->
    
    <RouterLink v-for="promotion in promotionsList" :to="`promotion/${promotion.id}`" :key="promotion.id">
        <PromotionTile :promotion="promotion" />
    </RouterLink>
</template>