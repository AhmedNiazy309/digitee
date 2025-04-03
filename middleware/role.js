export default defineNuxtRouteMiddleware((to, from) => {
    const userRole = useCookie("role");
    if (userRole !== "admin") {
      return navigateTo("/terms");
    }
  });
  