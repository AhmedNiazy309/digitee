export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json"); 
      const data = await response.json();
      console.log("User IP:", data.ip); // طباعة الـ IP في Console
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  });
  