<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="배송정보 등록">
      <h3 class="text-lg font-semibold mb-2">배송지 정보</h3>
      <div>
        <ul>
          <li>
            <span>주문번호</span>
            <span>1234</span>
          </li>
          <li>
            <span>받는사람 (지점명)</span>
            <span>1234</span>
          </li>
          <li>
            <span>배송지</span>
            <span>1234</span>
          </li>
        </ul>
      </div>
      <h3 class="text-lg font-semibold mb-2">배송정보 등록</h3>
      <form>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">송장번호</label>
          <input type="text" id="trackingNo" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">배송사</label>
          <!--Dropdown-->
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'order-list' }" class="btn btn-secondary">취소</router-link>
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
</script>
