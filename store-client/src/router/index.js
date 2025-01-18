import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PromotionView from "@/views/PromotionView.vue";
import RegisterView from "@/views/RegisterView.vue";

const NotFoundView = () => import("@/views/NotFoundView.vue"); // lazy load

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/promotion/:id",
            name: "promotion",
            component: PromotionView,
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/:pathMath(.*)*",
            name: "404",
            component: NotFoundView,
        },
    ],
});

export default router;
