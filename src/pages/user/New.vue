<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="신규 가맹점 등록">
      <form @submit="submitUser">
        <h3 class="text-lg font-semibold mb-2">가맹점 정보</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">가맹점명</label>
          <input v-model="userInfo.branchName" type="text" id="branchName" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">대표자</label>
          <input v-model="userInfo.branchManager" type="text" id="branchManager" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">지점 연락처</label>
          <input v-model="userInfo.branchContact" type="text" id="branchContact" class="input" />
        </div>
        <h3 class="text-lg font-semibold mb-2">사용자 계정</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">사용자 ID</label>
          <input v-model="userInfo.userId" type="text" id="userId" class="input" />
        </div>
        <div class="input-wrap mb-6">
          <label for="name" class="label label-lt">초기 비밀번호</label>
          <input v-model="userInfo.pwd" type="password" id="pwd" class="input" />
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'user-list' }" class="btn btn-secondary">취소</router-link>
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
import type { BranchUserCreate } from '@/types/service.type'
import { UserService } from '@/services/user.service'

const userSvc = new UserService()
const userInfo = ref<BranchUserCreate>({
  branchName: '',
  branchManager: '',
  branchContact: '',
  userId: '',
  pwd: '',
})

onBeforeRouteLeave(() => {
  let isDirty = false
  for (const key in userInfo.value) {
    if (userInfo.value[key]) {
      isDirty = true
      break
    }
  }
  if (isDirty) {
    return window.confirm('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?')
  }
})

function validateInput() {
  if (!userInfo.value.branchName) {
    alert('가맹점명을 입력해주세요.')
    return false
  }
  if (!userInfo.value.branchManager) {
    alert('대표자명을 입력해주세요.')
    return false
  }
  if (!userInfo.value.branchContact) {
    alert('연락처를 입력해주세요.')
    return false
  } else if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/.test(userInfo.value.branchContact)) {
    alert('연락처 형식이 올바르지 않습니다. (ex. 010-1234-5678 혹은 02-123-5678)')
    return false
  }
  if (!userInfo.value.userId) {
    alert('사용자 ID를 입력해주세요.')
    return false
  }
  if (!userInfo.value.pwd) {
    alert('초기 비밀번호를 입력해주세요.')
    return false
  } else if (userInfo.value.pwd.length < 6 || userInfo.value.pwd.length > 12) {
    alert('비밀번호는 6자 이상 12자 이하로 입력해주세요.')
    return false
  }
  return true
}

async function submitUser(e: Event) {
  e.preventDefault()
  if (!validateInput()) return
  console.log(userInfo.value)
  try {
    await userSvc.createUser(userInfo.value)
    alert('가맹점 명의의 신규 계정이 생성되었습니다.')
    userInfo.value = {
      branchName: '',
      branchManager: '',
      branchContact: '',
      userId: '',
      pwd: '',
    }
  } catch (e) {
    console.error(e.message.code)
    alert('신규 계정 생성에 실패했습니다.')
  }
}
</script>
