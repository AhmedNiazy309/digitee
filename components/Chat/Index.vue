<template>
  <section class="chat-wrapper">
    <div class="container">
      <div class="chat-body">
        <ChatRooms
          @get_room_messsges="get_messages_data"
          :show_room="show_room"
        />
        <div class="chat-box">
          <Transition name="slide-fade">
            <div class="box-head" v-if="show_room && room_data">
              <div class="flex align-items-center gap-2">
                <div class="room-user-avatar">
                  <img :src="room_data.members[0].image" alt="" />
                  <span class="active-badge"></span>
                </div>
                <span class="fs-10px fw-bold text-primary">{{
                  room_data.members[0].name
                }}</span>
              </div>
              <button @click="show_room = false" class="btn">
                <img width="20" src="@/assets/images/arrow-right.png" alt="" />
              </button>
            </div>
          </Transition>
          <Transition name="slide-fade">
            <ChatBody v-if="show_room && room_data" :room_data="room_data" />
          </Transition>
          <Transition name="slide-fade">
            <div
              class="box-footer"
              v-if="
                show_room &&
                room_data &&
                room_data.order.status != 5 &&
                room_data.order.status != 6
              "
            >
              <form
                @submit.prevent="set_message"
                ref="msg_form"
                class="w-100"
                style="position: relative"
              >
                <Transition name="slide-up">
                  <div class="upload_wrapper" v-if="file_box">
                    <label class="uploder-chat" @click="unAnimate">
                      <div class="flex flex-column align-items-center">
                        <img
                          width="40"
                          src="@/assets/images/cloud.png"
                          alt=""
                        />
                        <span>{{ $t("layout.insert_file") }}</span>
                      </div>
                      <input
                        @change="fileUploder($event)"
                        name="file"
                        type="file"
                        hidden
                      />
                      <div class="chat-holder" ref="file_area"></div>
                    </label>
                    <span v-if="send_load" class="loader_upload"></span>
                    <button @click="close_file_model" class="btn close-uploder">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </Transition>
                <div class="grid m-0 gap-2 pl-1 pr-1 position-relative">
                  <div class="col-fixed p-0 height35" style="width: 70px">
                    <button
                      style="width: 35px; border-radius: 30px"
                      class="btn publisher main_btn sec w-100 fs-10px p-0"
                    >
                      <div
                        class="flex align-items-center justify-content-center gap-2"
                      >
                        <img src="@/assets/images/send-icon.png" alt="" />
                        <span>{{ $t("layout.auth.send") }}</span>
                      </div>
                    </button>
                  </div>
                  <div class="col p-0 position-relative" style="height: 20px">
                    <textarea
                      @keyup="enter_area()"
                      v-model="text_area"
                      ref="SenderArea"
                      name="message"
                      class="publisher-area"
                      :placeholder="$t('layout.writeYourMessage')"
                    ></textarea>
                  </div>
                  <div class="features">
                    <div class="position-relative">
                      <EmojiPicker
                        ref="target"
                        v-if="showEmoji"
                        :native="true"
                        @select="onSelectEmoji"
                        theme="light"
                        :disable-sticky-group-names="true"
                        :hide-group-names="true"
                        :disable-skin-tones="true"
                      />
                    </div>
                    <button
                      class="btn"
                      type="button"
                      @click="showEmoji = !showEmoji"
                    >
                      <img src="@/assets/images/happy.png" alt="" />
                    </button>
                    <button
                      class="btn"
                      type="button"
                      @click="file_box = !file_box"
                    >
                      <img src="@/assets/images/camera-icon.png" alt="" />
                    </button>
                    <button
                      class="btn"
                      type="button"
                      @click="file_box = !file_box"
                    >
                      <img src="@/assets/images/attach-icon.png" alt="" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition>
          <div v-if="!room_data && !show_room" class="no_chat">
            <h5 class="text-primary">{{ $t("layout.select_conversation") }}</h5>
            <img src="@/assets/images/empty-folder.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// =================================================================== imports
import { io } from "socket.io-client";
// import store from '@/store';
import axios from "axios";
import { toast_handel } from "@/network/ValidTost";
const { notify_toast } = toast_handel();
// import { vOnClickOutside } from '@vueuse/components'
import { onClickOutside } from "@vueuse/core";

import { useRoute } from "vue-router";
import { response } from "@/network/response";

// ==================================================================== data
const target = ref(null);
onClickOutside(target, (event) => (showEmoji.value = false));
const useRout = useRoute();
const socket = io("https://basement-app.com:4737/", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"],
});
const SenderArea = ref();
const showEmoji = ref(null);
const msg_form = ref();
const room_data = ref();
const show_room = ref(false);
const message = ref();
const userData = ref([]);
const text_area = ref();
const file_box = ref(null);
const selectedFiles = ref(null);
const img_src = ref();
const file_src = ref();
const file_area = ref();
const send_load = ref(false);
const loadStateMessage = ref(null);
// ==================================================================== methods

//  ============================================= fileUploder
const fileUploder = (event) => {
  selectedFiles.value = event.target.files[0];
  let src = URL.createObjectURL(selectedFiles.value);

  if (selectedFiles.value.type === "application/pdf") {
    file_area.value.innerHTML = ` <div class="offWhite d-block w-100 h-100 p-2 radius8">
            <iframe src="${src}" style="width:100%; height:100%;" frameborder="0"></iframe>
          </div>`;
    file_src.value = src;
  } else {
    file_area.value.innerHTML = `<img src="${src}" alt="">`;
    img_src.value = src;
  }
};
// ================================================ get user
const get_user_profile = async () => {
  let userId = localStorage.getItem("userId");
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  await axios.get(`get-user-profile/${userId}`, config).then((res) => {
    let status = response(res).status;
    let data = response(res).data_respond;
    if (status == "success") {
      userData.value = data;
    }
  });
};
// ============================================= get messages data
const get_messages_data = (messages_data) => {
  show_room.value = false;
  setTimeout(() => {
    show_room.value = true;
  }, 50);

  room_data.value = messages_data;
  socket.emit("exitChat", {});

  socket.emit("enterChat", {
    user_id: userData.value.id,
    user_type: `User`,
    room_id: room_data.value.room.id,
  });
};
// ============================================= send message
const set_message = () => {
  if (selectedFiles.value) {
    send_load.value = true;
    const fd = new FormData(msg_form.value);
    if (selectedFiles.value.type === "application/pdf") {
      push_msg("file", file_src.value);
      send_media(fd, "file");
    } else {
      push_msg("image", img_src.value);
      send_media(fd, "image");
    }
  }
  if (text_area.value) {
    if (text_area.value.trim() != "") {
      push_msg("text", text_area.value);
      sendMessageTosocket(text_area.value, "text");
      text_area.value = "";
      scrollToBottom();
    }
  }
};

// ============================================ send message to socket
function sendMessageTosocket(body, type) {
  let time = new Date().toLocaleTimeString();
  socket.emit("sendMessage", {
    is_sender: 1,
    type: type,
    body: body,
    image: userData.value.image,
    created_dt: time,
    sender_id: userData.value.id,
    sender_type: "User",
    sender_name: userData.value.name,
    receiver_id: room_data.value.members[0].id,
    receiver_type: "Provider",
    room_id: room_data.value.room.id,
    order_id: room_data.value.order.id,
  });
}
socket.on("sendMessageRes", function (socketMessageData) {
  room_data.value.messages.push(socketMessageData);
  scrollToBottom();
});
// ============================================ push message to messages
const push_msg = async (type, body) => {
  let time = new Date().toLocaleTimeString();
  message.value = {
    is_sender: 1,
    type: type,
    body: body,
    image: userData.value.image,
    created_dt: time,
    is_loaded: loadStateMessage.value,
  };
  room_data.value.messages.push(message.value);
  setTimeout(() => {
    scrollToBottom();
    close_file_model();
    send_load.value = false;
  }, 500);
};
// ============================================ send media message
const send_media = async (formData, media_type) => {
  loadStateMessage.value = 1;
  await axios
    .post(`chat/upload-room-file/${room_data.value.room.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      let status = response(res).status;
      let msg = response(res).msg;
      let data = response(res).data_respond;
      if (status == "success") {
        loadStateMessage.value = 0;
        sendMessageTosocket(data.file_name, media_type);
        scrollToBottom();
        close_file_model();
      } else if (status == "fail") {
        loadStateMessage.value = 0;
        notify_toast(msg, "error");
      }
    })
    .catch((err) => {
      loadStateMessage.value = 0;
      console.log(err);
    });
};

// ============================================ send file message

const enter_area = (e) => {
  e = e || event;
  if (e.keyCode === 13 && !e.shiftKey) {
    set_message();
  }
  return true;
};

// ============================================== close chat modal
const close_file_model = () => {
  file_box.value = false;
  img_src.value = null;
  file_src.value = null;
  selectedFiles.value = null;
};
// ================= scroll to bottom
const scrollToBottom = () => {
  if (useRout.fullPath === "/chatView") {
    setTimeout(() => {
      document.getElementById("texting-box").scrollTo({
        top: document.getElementById("texting-box").scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }
};
// ============================ add emojies
function onSelectEmoji(emoji) {
  if (text_area.value) {
    text_area.value += emoji.i;
  } else {
    text_area.value = emoji.i;
  }
}

// ============================================================= lifecycle hooks
get_user_profile();
get_data_routed();

onBeforeUnmount(() => {
  socket.emit("exitChat", {});
});
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease;
}

.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
