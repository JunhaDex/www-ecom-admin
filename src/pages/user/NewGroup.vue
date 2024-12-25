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
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">추가 상품 선택</label>
          <select class="select-box">
            <option>지점명</option>
            <option>사용자 아이디</option>
          </select>
        </div>
        <ul class="selected-items p-6">
          <!--product name / product price-->
          <li class="selected-item">
            <span class="selected-item-name">상품명</span>
            <button class="btn btn-ghost btn-sm">X</button>
          </li>
          <li class="selected-item">
            <span class="selected-item-name">상품명</span>
            <button class="btn btn-ghost btn-sm">X</button>
          </li>
        </ul>
        <div class="selected-items list-empty">
          <p>상품을 선택하여 추가하세요</p>
        </div>
        <div class="flex justify-end mt-4">
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
import { onMounted } from 'vue'

onMounted(async () => {

})
onBeforeRouteLeave(() => {
  // TODO: when not empty, alert
})
</script>
<style scoped>
.selected-items {
  border: 1px solid theme('colors.gray.400');
  border-radius: 4px;

  &.list-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    color: theme('colors.gray.400');
  }

  .selected-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .selected-item:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
</style>
