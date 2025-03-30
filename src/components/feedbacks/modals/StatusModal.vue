<template>
  <Modal :is-open="isOpen" @close-modal="() => emit('close-modal')">
    <div class="dialog-modal">
      <h2 class="text-xl font-semibold mb-4">배송 상태 업데이트</h2>
      <form @submit.prevent="updateStatus">
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">배송사</label>
          <select
            class="select-box"
            :value="status"
            @change="(e: any) => (updated = e.target!.value)"
          >
            <option v-for="opt in options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
            <option :value="3" disabled>배송중</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button class="btn btn-secondary" type="button" @click="() => emit('close-modal')">
            취소
          </button>
          <button type="submit" class="btn btn-primary ml-4">등록</button>
        </div>
      </form>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/feedbacks/Modal.vue'
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
  txId: number
  status: number
}>()

const updated = ref<number>(props.status)

const emit = defineEmits(['close-modal', 'update-status'])
const options = [
  { value: 1, label: '배송준비중' },
  { value: 4, label: '배송완료' },
  { value: 5, label: '환불처리' },
]

async function updateStatus() {
  emit('update-status', { txId: props.txId, status: Number(updated.value) })
}
</script>
