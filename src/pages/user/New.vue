<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="신규 가맹점 등록">
      <form>
        <h3 class="text-lg font-semibold mb-2">가맹점 정보</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">가맹점명</label>
          <input type="text" id="name" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">대표자</label>
          <input type="text" id="name" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">지점 연락처</label>
          <input type="text" id="name" class="input" />
        </div>
        <h3 class="text-lg font-semibold mb-2">사용자 계정</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">사용자 ID</label>
          <input type="text" id="name" class="input" />
        </div>
        <div class="input-wrap mb-6">
          <label for="name" class="label label-lt">초기 비밀번호</label>
          <input type="text" id="name" class="input" />
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

onBeforeRouteLeave(() => {
  // TODO: when not empty, alert
})
</script>
