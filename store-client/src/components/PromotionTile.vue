<script>
    export default {
        props: ["promotion"],
        computed: {
            promotionBg() {
				const { image } = this.promotion;
				return `url(/src/assets/${image})`;
            }
        }
    }
</script>

<template>
	<div :style="{ backgroundImage: promotionBg }" class="promotion">
		<RouterLink :to="`/promotion/${promotion.id}`">
    			<div>
				<h2>{{ promotion.header }}</h2>

				<p>{{ promotion.description }}</p>
    			</div>
		</RouterLink>
	</div>
</template>

<style scoped>
	.promotion {
		height: 16rem;
		background-size: 100% 100%;

		&:has(+ &) {
			margin-bottom: 4rem;
		}

		& > a {
			height: 100%;
			display: grid;
			place-items: center;
			color: white;
			text-align: center;
			text-decoration: none;
		}
	}
</style>
