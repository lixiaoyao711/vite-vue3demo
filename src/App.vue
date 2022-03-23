<template>
  <div class="App" id="app">
    <router-view />
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
const test = computed(() => {
  return null;
});
watch(() => {});
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.App {
}
</style>
