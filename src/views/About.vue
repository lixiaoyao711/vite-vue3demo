<template>
  <div class="About">About</div>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import $store from '@/store';
import { useRouter } from 'vue-router';
const router = useRouter();
const emit = defineEmits(['close']);
const props = defineProps({});

const test = computed(() => {
return null;
});
watch(() => {});
onMounted(() => {});
onUnmounted(() => {
});
</script>
<style lang="less" scoped>
.About{
}
</style>
