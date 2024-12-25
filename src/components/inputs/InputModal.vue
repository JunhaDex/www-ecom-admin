<template>
  <div v-show="isShow" class="modal">
    <div class="modal-header p-6">
      <h2 class="text-lg font-semibold">{{ props.title }}</h2>
      <button class="modal-close" @click="clickClose">X</button>
    </div>
    <div class="modal-content px-6">
      <slot name="default" />
    </div>
    <div class="modal-footer p-6">
      <slot name="footer" />
    </div>
  </div>
  <Backdrop v-show="isShow" @click="clickClose" />
</template>
<script setup lang="ts">
import Backdrop from '@/components/feedbacks/Backdrop.vue'

const props = defineProps<{
  isShow: boolean
  title: string
}>()

const emit = defineEmits(['close'])

function clickClose() {
  emit('close')
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  background-color: white;
  border-radius: 8px;
  box-shadow: theme('boxShadow.md');
  z-index: 40;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
