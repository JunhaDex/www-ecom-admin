<template>
  <div class="backdrop-blur-sm backdrop-prevent" @click="clickBackdrop"></div>
</template>
<script setup lang="ts">
const emits = defineEmits(['backdropClick'])

function clickBackdrop() {
  emits('backdropClick')
}
</script>
<style scoped>
.backdrop-prevent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 21;
  overflow: hidden;
  background-color: theme('colors.gray.600 / 0.4');
}
</style>
