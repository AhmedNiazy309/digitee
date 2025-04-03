<template>
    <div id="texting-box" class="texting-box" @scroll="handel_scroll($event, messages[0].id)">
        <div v-if="massege_load" class="spinner-border spinner-border-sm msg-spinner" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div v-for="item in messages" :key="item" class="message" :class="{ 'provider': item.is_sender == 0 }">
            <div class="txt-content">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="room-user-avatar" style="width: 35px; height: 35px;">
                        <img style="width: 30px; height: 30px;" :src="item.image" alt="">
                    </div>
                    <span class="fs-10px txt-nowrap" style="line-height: 20px;">{{ item.created_dt }}</span>
                </div>
                <p class="mb-0" v-if="item.type == 'text'">
                    {{ item.body }}
                </p>

                <div class="mb-0 img-viewer position-relative" v-if="item.type == 'image'">
                    <!-- <div>{{ item.is_loaded }}</div> -->
                    <!-- <span v-if="load_state" class="loader_upload"></span> -->
                    <a data-fancybox="gallery" :href='item.body'>
                        <img :src="item.body" alt="">
                    </a>
                </div>
                <div class="mb-0 position-relative" v-if="item.type == 'file'">
                    <!-- <div> {{ item.is_loaded }}</div> -->
                    <!-- <span v-if="load_state" class="loader_upload"></span> -->
                    <button data-fancybox data-type="pdf" class="pdf-viewer p-0" :data-src="item.body">
                        <span class="pdf-label">PDF</span>
                        <span class="pdf-name">{{ item.body }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="to_bottom" class="to_bottom">
            <img :src="require('@/assets/images/chevron.png')" alt="">
        </div>
    </div>
</template>

<script setup>
// ============================================== imports 
// import { response } from "@/response";
import { response } from '@/network/response';
import axios from "axios";
const props = defineProps({
    room_data: {
        type: Array
    },
})
// ============================================== data
const messages = ref([])
const prev_messages = ref([])
const per_page = ref(8)
const room_id = ref(props.room_data.room.id)
const massege_load = ref(false)
const to_bottom = ref(false)
// ============================================== methods
const handel_scroll = async (e, oldestId) => {
    if (e.target.scrollTop == 0) {
        massege_load.value = true
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        await axios.get(`chat/get-room-messages/${room_id.value}?per_page=${per_page.value}&oldest_id=${oldestId}`, config)
            .then((res) => {
                let data = response(res).data_respond
                let status = response(res).status
                if (status === 'success') {
                    prev_messages.value = data.messages
                    messages.value.unshift(...data.messages)
                    e.target.scroll({ top: 20 })
                    massege_load.value = false
                }
            })
    }
}

const get_messages_data = () => {
    messages.value = props.room_data.messages
    // console.log(messages.value);
    setTimeout(() => {
        document.getElementById('texting-box').scrollTo({ top: document.getElementById('texting-box').scrollHeight /*, behavior: 'smooth' */ })
    }, 50);
}

// ============================================== lifecycle hooks

onMounted(() => {
    get_messages_data()
})
</script>

<style lang="scss" scoped></style>