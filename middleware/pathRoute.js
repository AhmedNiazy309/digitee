export default defineNuxtRouteMiddleware((to, from) => {
    console.log("تنقل:", { from: from.fullPath, to: to.fullPath });
  });
  