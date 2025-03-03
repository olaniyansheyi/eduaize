export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.client) return; // Ensures this runs only in the browser

  const { $supabase } = useNuxtApp();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return navigateTo("/");
  }

  const { data: sessionData, error: sessionError } =
    await $supabase.auth.getUser();
  if (sessionError || !sessionData.user) {
    localStorage.removeItem("user");
    localStorage.removeItem("userDetails");
    return navigateTo("/");
  }

  const userRole = sessionData.user.user_metadata?.role || null;
  const dashboard = to.path.split("/")[1];

  const roleDashboardMap = {
    admin: "admin",
    teacher: "teacher",
    parent: "parent",
    student: "student",
  };

  if (roleDashboardMap[userRole] !== dashboard) {
    return navigateTo("/");
  }

  localStorage.setItem("user", JSON.stringify(sessionData.user));
});
