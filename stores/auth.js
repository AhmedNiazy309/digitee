import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  // ======================== imports
  const localeRoute = useLocaleRoute();

  // ======================== data
  const isAuthed = ref(false);
  const userInfo = ref();
  const device_id = ref();

  // ========================== methods
  // set auth
  const storeAuth = async () => {
    isAuthed.value = true;
    userInfo.value = useCookie("auth").value;
  };

  // update auth
  const updateAuth = async (data) => {
    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
      userInfo.value[key] = data[key];
    }
  };

  const updateDeviceId = async (data) => {
    device_id.value = data;
  }
  // logout
  const logout = () => {
    isAuthed.value = false;
    useCookie("auth").value = null;

    userInfo.value = {};

    navigateTo(localeRoute({ name: "login", replace: true }));
  };

  // ========================== return
  return {
    isAuthed,
    userInfo,
    storeAuth,
    updateDeviceId,
    updateAuth,
    logout,
  };
});
