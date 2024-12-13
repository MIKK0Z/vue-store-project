<script>
    import { RouterView } from "vue-router";
    import Header from "@/components/Header.vue";

    export default {
        components: {
            Header,
        }
    }
</script>

<template>
    <Header />

    <div class="content">
        <RouterView />
    </div>
    
</template>

<style scoped>

</style>
