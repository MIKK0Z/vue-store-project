<script>
    export default {
        props: ["product"],
    }
</script>

<template>
    <RouterLink :to="`/product/${product.id}`">
        <img :src="`/src/assets/${product.image}`" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <div>
            <template v-for="i in 5" :key="i">
                <span v-if="i <= Math.ceil(parseFloat(product.rate))">🦅</span>
                <span v-else>💀</span>
            </template>
        </div>
    </RouterLink>
</template>

<style scoped>
    a {
        width: 12rem;
        height: 16rem;
        object-fit: cover;
        text-decoration: none;
        text-align: center;
    }

    img {
        height: 100%;
        object-fit: cover;
    }
</style>