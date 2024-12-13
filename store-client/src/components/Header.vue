<script>
    import { RouterLink } from "vue-router";
</script>

<template>
    <header>
        <div class="content">
            <RouterLink to="/" exact>Home</RouterLink>
            <RouterLink to="/about" exact>About</RouterLink>
            <RouterLink to="/notfoundtest" exact>404</RouterLink>
        </div>
    </header>
</template>

<style scoped>
    header {
        width: 100dvw;
        background-color: black;

        & a {
            color: aliceblue;
            text-decoration: none;
            padding: 1rem .5rem;

            &:hover {
                background-color: dimgray;
            }
        }
    }
</style>