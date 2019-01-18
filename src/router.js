import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Lobbies from "./views/Lobbies.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Lobbies
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      params: ['roomID'],
      path: "/lobby/:roomID",
      name: "lobby",
      component: () =>
        import( /* webpackChunkName: "lobby" */ "./views/Lobby.vue")
    },
    {
      path: "/game",
      name: "game",
      component: () => import( /* webpackChunkName: "game" */ "./views/Game.vue")
    }
  ]
});
