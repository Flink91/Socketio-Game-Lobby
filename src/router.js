import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Rooms from "./views/Rooms.vue";

import AuthGuard from './auth-guard'

Vue.use(Router);

export default new Router({

  routes: [{
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "rooms",
      component: Rooms,
      beforeEnter: AuthGuard
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
      path: "/room/:roomID",
      name: "room",
      beforeEnter: AuthGuard,
      component: () =>
        import( /* webpackChunkName: "room" */ "./views/Room.vue")
    },
    {
      params: ['gameID'],
      path: "/game/:gameID",
      name: "game",
      beforeEnter: AuthGuard,
      component: () =>
        import( /* webpackChunkName: "game" */ "./views/Game.vue")
    },
  ]
});
