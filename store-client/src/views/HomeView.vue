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
	<!--<div class="promotions">-->
    <!--<RouterLink v-for="promotion in promotionsList" :to="`promotion/${promotion.id}`" :key="promotion.id">
        <PromotionTile :promotion="promotion" />
    </RouterLink>-->
    		<PromotionTile v-for="promotion in promotionsList" :key="promotion.id" :promotion="promotion" />
	<!--</div>-->
</template>

<style scoped>
	/*.promotions {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}*/
</style>
