<template>
  <main>
    <div class="login-box">
      <h2 class="text-lg font-bold mb-4">관리자로 로그인</h2>
      <form @submit="submitLogin">
        <div class="input-wrap mb-4">
          <label class="label label-lt">아이디</label>
          <input v-model="userInput.adminId" type="text" class="input" />
        </div>
        <div class="input-wrap mb-6">
          <label class="label label-lt">비밀번호</label>
          <input v-model="userInput.pwd" type="password" class="input" />
        </div>
        <div class="btn-group">
          <button type="submit" class="btn btn-primary w-full">로그인</button>
        </div>
      </form>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { AdminService } from '@/services/admin.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const adminSvc = new AdminService()
const userInput = ref({
  adminId: '',
  pwd: '',
})

async function submitLogin(e: Event) {
  e.preventDefault()
  await adminSvc.loginAdmin(userInput.value)
  router.push({ name: 'home' })
}
</script>
<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: theme('colors.background');
  height: 100vh;
}

.login-box {
  background-color: theme('colors.white');
  padding: 2rem;
  border-radius: 1rem;
  width: 480px;
}
</style>
