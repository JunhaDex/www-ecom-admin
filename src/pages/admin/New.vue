<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="관리자 등록">
      <form @submit="submitUser">
        <h3 class="text-lg font-semibold mb-2">관리자 등록</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">관리자 ID</label>
          <input v-model="adminInfo.adminId" type="text" id="adminId" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">관리자명</label>
          <input v-model="adminInfo.name" type="text" id="name" class="input" />
        </div>
        <div class="input-wrap mb-6">
          <label for="name" class="label label-lt">비밀번호</label>
          <input v-model="adminInfo.pwd" type="password" id="pwd" class="input" />
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'admin-list' }" class="btn btn-secondary">취소</router-link>
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
import type { AdminCreateInput } from '@/types/service.type'
import { UserService } from '@/services/user.service'
import { AdminService } from '@/services/admin.service'

const adminSvc = new AdminService()
const adminInfo = ref<AdminCreateInput>({
  adminId: '',
  pwd: '',
  name: '',
})

onBeforeRouteLeave(() => {
  let isDirty = false
  for (const key in adminInfo.value) {
    if (adminInfo.value[key]) {
      isDirty = true
      break
    }
  }
  if (isDirty) {
    return window.confirm('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?')
  }
})

function validateInput() {
  if (!adminInfo.value.adminId) {
    alert('관리자 ID를 입력해주세요.')
    return false
  }
  if (!adminInfo.value.name) {
    alert('관리자명을 입력해주세요.')
    return false
  }
  if (!adminInfo.value.pwd) {
    alert('비밀번호를 입력해주세요.')
    return false
  } else if (adminInfo.value.pwd.length < 6 || adminInfo.value.pwd.length > 12) {
    alert('비밀번호는 6자 이상 12자 이하로 입력해주세요.')
    return false
  }
  return true
}

async function submitUser(e: Event) {
  e.preventDefault()
  if (!validateInput()) return
  console.log(adminInfo.value)
  try {
    await adminSvc.createAdmin(adminInfo.value)
    alert('신규 관리자가 생성되었습니다.')
    adminInfo.value = {
      adminId: '',
      name: '',
      pwd: '',
    }
  } catch (e) {
    console.error(e.message.code)
    alert('신규 관리자 생성에 실패했습니다.')
  }
}
</script>
