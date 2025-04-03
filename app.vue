<template>
  <div>
    <Toast />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div v-if="alerts.length" class="notification_alert p-3" ref="alert">
      <div v-for="(item, index) in alerts" :key="item" class="item_alert">
        <div class="flex align-items-center gap-2">
          <!-- <img src="@/assets/imgs/icons/notification-bell.svg" alt="" /> -->
          <NuxtLink v-if="ordrering" class="default_link" to="/order-details">
            <div class="flex flex-column">
              <span v-if="lang == 'en'">{{ item.title_en }}</span>
              <span v-else>{{ item.title_ar }}</span>
              <span class="text_body" v-if="lang == 'en'">{{
                item.body_en
              }}</span>
              <span class="text_body" v-else>{{ item.body_ar }}</span>
            </div>
          </NuxtLink>
          <div v-else class="flex flex-column">
            <span v-if="lang == 'en'">{{ item.title_en }}</span>
            <span v-else>{{ item.title_ar }}</span>
            <span class="text_body" v-if="lang == 'en'">{{
              item.body_en
            }}</span>
            <span class="text_body" v-else>{{ item.body_ar }}</span>
          </div>
        </div>
        <div
          style="cursor: pointer; transform: translateY(-55%) translateX(10px)"
          @click="remove_item($event, index)"
        >
          <!-- <img
            src="@/assets/imgs/icons/close-circle.svg"
            style="pointer-events: none"
            alt=""
          /> -->
        </div>
      </div>
    </div>
    <audio ref="notification_bell" controls class="hidden">
      <!-- <source src="@/assets/media/notification-sound.mp3" type="audio/ogg" />
      <source src="@/assets/media/notification-sound.mp3" type="audio/mpeg" /> -->
    </audio>
  </div>
</template>
<script setup>
// ============================================================================== imports
// FCM
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// ============================================================================= data
const auth = useAuthStore();
const notify_msg = ref({});
const alerts = ref([]);
const alert = ref();
const notification_bell = ref();
const lang = ref();
const token = ref();
const ordrering = ref(false);
// =========================================================================== methods
// ===================================== remove item from alerts
const remove_item = (e, index) => {
  let notify_item = e.target.parentElement;
  notify_item.classList.add("fade_out_reverse");
  setTimeout(() => {
    notify_item.remove();
    alerts.value.splice(index, 1);
  }, 500);
};

// ===================================== generate mac address
const generateMac = () => {
  let ipAddress = "";

  for (var i = 0; i < 3; i++) {
    let number = Math.floor(Math.random() * 1000);
    ipAddress += number.toString();

    if (i < 2) {
      ipAddress += ".";
    }
  }

  ipAddress += ".0";

  // store mac address

  // globalStore.updateGMacAddress(ipAddress)
};
// ================================================================================ lifecycle hooks
onMounted(() => {
  // =============================================================== FCM notification
  const firebaseConfig = {
    apiKey: "AIzaSyA3oiQ4-Bu1v2jR663DM-AMNEMWrDK0xx4",
    authDomain: "calla-ea319.firebaseapp.com",
    projectId: "calla-ea319",
    storageBucket: "calla-ea319.appspot.com",
    messagingSenderId: "698865801900",
    appId: "1:698865801900:web:c96a946d1a8a96d9179d09",
    measurementId: "G-ZPDXNRJ5S9",
  };
  initializeApp(firebaseConfig);
  const messaging = getMessaging();

  onMessage(messaging, (payload) => {
    notify_msg.value = payload.data;
    console.log(notify_msg.value);
    if (
      payload.data.type == "create_order" ||
      payload.data.type == "cancel_order" ||
      payload.data.type == "finish_order" ||
      payload.data.type == "create_review" ||
      payload.data.type == "waiting_order"
    ) {
      ordrering.value = true;
    } else {
      ordrering.value = false;
    }
    setTimeout(() => {
      alerts.value.unshift(notify_msg.value);
      notification_bell.value.play();
    }, 50);

    setTimeout(() => {
      alerts.value.splice(-1);
    }, 8000);
  });

  getToken(messaging, {
    PublicVapidKey:
      "BGCuf3XUktBJ13LiBorFaQEsHFhFa-ahtS_-MxFEYu4jB4p_F4gICVHc9DwOZr_BnrYzexlRQ-fFnjSW2Y9HH6M",
  })
    .then((currentToken) => {
      if (currentToken) {
        auth.updateDeviceId(currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
  lang.value = localStorage.getItem("lang");

  generateMac();
});
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
