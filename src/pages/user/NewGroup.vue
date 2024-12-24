<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="유저 그룹생성">
      <!--그룹명 / 그룹설명 / 상품추가-->
      <form>
        <h3 class="text-lg font-semibold mb-2">그룹 정보</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">그룹명</label>
          <input type="text" id="name" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">그룹설명</label>
          <input type="text" id="name" class="input" />
        </div>
        <h3 class="text-lg font-semibold mb-2">상품추가</h3>

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
