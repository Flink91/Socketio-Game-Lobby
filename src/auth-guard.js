import store from "./store";

export default (to, from, next) => {
  // if the user has a name he can pass
  if (store.getters.name) {
    next()
  } else {
    next('/login')
  }
}
