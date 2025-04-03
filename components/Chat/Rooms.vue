<template>
    <div class="chat-aside" :class="{ 'slided': props.show_room }">
        <!-- <div class="search-rooms">
            <form ref="search_form">
                <div class="search-box">
                    <input type="text" @input="search_room" v-model="search_name" name="search_name"
                        :placeholder="$t('layout.searchChat')">
                    <button class="btn p-0"><img src="@/assets/images/search-icon.png" alt=""></button>
                </div>
            </form>
        </div> -->
        <div class="chat-rooms" v-if="skelton_load">
            <div class="flex align-items-center gap-2 mb-3" v-for="skel in SeklCount" :key="skel">
                <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                <div class="flex flex-column gap-2">
                    <Skeleton height="5px" width="5rem"></Skeleton>
                    <Skeleton width="15rem" height="5px"></Skeleton>
                </div>
            </div>
        </div>
        <div class="chat-rooms">
            <div v-for="item in rooms" :key="item" @click="showRome(item.id)" class="room-item">
                <span style="line-height: 9px; border-radius: 30px;" v-if="item.is_seen == 0" class="bg-secondary text-white fs-10px pt-1 pb-1 pl-3 pr-3 new">{{
                    $t('layout.new_messege') }}</span>
                <div class="room-user-avatar">
                    <img :src="item.members[0].image" alt="">
                    <span class="active-badge"></span>
                </div>
                <div class="flex flex-column" style="line-height: 20px;">
                    <span class="fs-10px fw-bold text-primary">{{ item.members[0].name }}</span>
                    <p class="mb-0 fs-10px">
                        {{ item.last_message_body }}
                    </p>
                </div>
            </div>
            <div class="notFoundChats" v-if="!rooms.length">
                <div>{{ $t('layout.notFoundChats') }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
// ============================================== imports 
import { io } from "socket.io-client";
import Skeleton from 'primevue/skeleton';
import { response } from '@/network/response';
import axios from "axios";
import { toast_handel } from "@/network/ValidTost";
const { notify_toast } = toast_handel()
import { useRouter } from 'vue-router';
const props = defineProps({
    show_room: {
        type: Boolean
    },
})

// ============================================== data
const socket = io('https://basement-app.com:4737/', {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ["websocket"]
})
const emit = defineEmits(['get_room_messsges'])
const rooms = ref([])
const routeOtp = useRouter()
const room_data = ref([])
const oldest_id = ref(0)
const per_page = ref(8)
const SeklCount = ref(1)
const skelton_load = ref(null)
const search_name = ref()
const search_form = ref()
// ============================================== methods

//  ============== get rooms 
const get_rooms = async () => {
    skelton_load.value = true
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    let name_search = ''
    if (search_name.value) {
        name_search = search_name.value
    } else {
        name_search = ''
    }

    await axios.get(`chat/get-rooms?search_name=${name_search}`, config).then((res) => {
        let status = response(res).status
        let data = response(res).data_respond
        let msg = response(res).msg
        if (status === 'success') {
            rooms.value = data.data
            SeklCount.value = rooms.value.length
            setTimeout(() => {
                skelton_load.value = false
            }, 1000);
        } if (status === 'unauthenticated') {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            notify_toast(msg, 'error')
            routeOtp.push({ name: 'home' })
        }
    }).catch(e => {
        console.error(e);
    })
}
socket.on('sendMessageRes', function () {
    get_rooms()
});
//  ============== get rooms messages 
const showRome = async (roomId) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    await axios.get(`chat/get-room-messages/${roomId}?per_page=${per_page.value}&oldest_id=${oldest_id.value}`, config)
        .then((res) => {
            let status = response(res).status
            let msg = response(res).msg
            let data = response(res).data_respond
            if (status === 'success') {
                room_data.value = data
                get_rooms()
                emit('get_room_messsges', room_data.value)
            } else if (status === 'unauthenticated') {
                localStorage.removeItem("token")
                localStorage.removeItem("userId")
                notify_toast(msg, 'error')
                routeOtp.push({ name: 'home' })
            }
            else if (status === 'fail') {
                notify_toast(msg, 'error')
            }
        }).catch(e => {
            console.error(e);
        })
}

//  =========================== search room
const search_room = async () => {
    get_rooms()
}
// ============================================== lifecycle hooks

onMounted(() => {
    get_rooms()
})

</script>

<style lang="scss" scoped>
.notFoundChats{
    display: flex;
    justify-content: center;
}
</style>