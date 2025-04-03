<template>
    <div class="text-center mb-8 max-w-[600px] m-auto">
        <h3 :class="withStyle?'text-[48px] font-[600]':'text-[24px] font-[400]'">{{title}}</h3>
        <p class="text-[18px] font-[400]">{{ description }}</p>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    withStyle: {
        type: Boolean,
        default: true
    }
})
</script>
<style lang="scss" scoped>

</style>