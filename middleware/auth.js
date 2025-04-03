
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useCookie('isAuthenticated');

  if (isAuthenticated.value !== true) {
    return navigateTo('/login');
  }
});