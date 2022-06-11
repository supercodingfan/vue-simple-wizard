import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CollectionView from "../views/CollectionView.vue";
import SummaryView from "../views/SummaryView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/collection",
    name: "collection",
    component: CollectionView,
  },
  {
    path: "/summary",
    name: "summary",
    component: SummaryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
