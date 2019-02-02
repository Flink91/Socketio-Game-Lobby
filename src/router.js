import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Rooms from "./views/Rooms.vue";

Vue.use(Router);

export default new Router({

  routes: [{
      path: "/",
      name: "home",
      component: Rooms
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
      component: () =>
        import( /* webpackChunkName: "room" */ "./views/Room.vue")
    },
    {
      params: ['gameID'],
      path: "/game/:gameID",
      name: "game",
      component: () =>
        import( /* webpackChunkName: "game" */ "./views/Game.vue")
    },
  ]
});
