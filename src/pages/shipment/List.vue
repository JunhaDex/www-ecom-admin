<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="배송 추적 및 관리"
        :columns="columns"
        :has-actions="false"
        :items="shipments"
        :page-meta="pageMeta"
      >
        <template #control>
          <div class="flex justify-end">
            <button class="btn btn-secondary">내보내기</button>
          </div>
          <div class="flex justify-start">
            <select class="select select-bordered">
              <option>받는사람</option>
            </select>
            <input type="text" class="flex-1" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary">검색</button>
          </div>
        </template>
      </DataTable>
    </div>
  </SafeArea>
  <AppFooter />
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import AppFooter from '@/components/surfaces/AppFooter.vue'
import DataTable from '@/components/display/DataTable.vue'

const columns = ['주문번호', '받는사람', '배송지', '택배사', '배송번호']
const shipments = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}
</script>
