<script>
    import { RouterLink } from "vue-router";
</script>

<template>
    <header>
        <div class="content">
            <RouterLink to="/" exact>Home</RouterLink>
            <RouterLink to="/about" exact>About</RouterLink>
            <RouterLink to="/notfoundtest" exact>404</RouterLink>

            <RouterLink to="/register" exact class="registerLink">Register</RouterLink>
        </div>
    </header>
</template>

<style scoped>
    header {
        width: 100dvw;
        background-color: black;

        & > .content {
            display: grid;
            grid-template-columns: auto auto auto 1fr auto;

            & > a {
                color: aliceblue;
                text-decoration: none;
                padding: 1rem .5rem;

                &:hover {
                    background-color: dimgray;
                }

                &.registerLink {
                    background-color: blue;
                    grid-column: 5;
                }
            }
        } 
    }
</style>