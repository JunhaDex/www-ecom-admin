<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="신규 배송사 등록">
      <form @submit="submitCourier">
        <h3 class="text-lg font-semibold mb-2">배송사 정보</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">배송사명</label>
          <input v-model="couierInfo.courierName" type="text" id="branchName" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">API</label>
          <input v-model="couierInfo.apiUrl" type="text" id="branchManager" class="input" />
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'carrier-list' }" class="btn btn-secondary">취소</router-link>
          <button type="submit" class="btn btn-primary ml-4">등록</button>
        </div>
      </form>
    </CreateForm>
  </SafeArea>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import CreateForm from '@/components/display/CreateForm.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ref } from 'vue'
import type { BranchCourierCreate } from '@/types/service.type'
import { CourierService } from '@/services/courier.service'

const courierSvc = new CourierService()

const couierInfo = ref<BranchCourierCreate>({
  courierName: '',
  apiUrl: '',
})

onBeforeRouteLeave(() => {
  let isDirty = false
  for (const key in couierInfo.value) {
    if (couierInfo.value[key]) {
      isDirty = true
      break
    }
  }
  if (isDirty) {
    return window.confirm('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?')
  }
})

function validateInput() {
  if (!couierInfo.value.courierName) {
    alert('배송사명을 입력해주세요.')
    return false
  }
  if (!couierInfo.value.apiUrl) {
    alert('URL을 입력해주세요.')
    return false
  }
  return true
}

async function submitCourier(e: Event) {
  e.preventDefault()
  if (!validateInput()) return
  console.log(couierInfo.value)
  try {
    await courierSvc.createCourier(couierInfo.value)
    alert('새로운 배송사가 생성되었습니다.')
    couierInfo.value = {
      courierName: '',
      apiUrl: '',
    }
  } catch (e) {
    console.error(e.message.code)
    alert('새로운 배송사 생성에 실패했습니다.')
  }
}
</script>
