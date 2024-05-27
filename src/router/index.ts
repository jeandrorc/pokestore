import { createWebHistory, createRouter } from "vue-router";
import PokemonList from "../pages/PokemonList.vue";
import PokemonDetail from "../pages/PokemonDetail.vue";
import History from "../pages/History.vue";

const routes = [
  { path: "/", component: PokemonList, name: "list" },
  { path: "/pokemon/:name", component: PokemonDetail, name: "view" },
  { path: "/history", component: History, name: "history" },
];

const router = createRouter({
  history: createWebHistory('/pokestore/'),
  routes,
});

export default router;
