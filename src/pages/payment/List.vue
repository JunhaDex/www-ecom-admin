<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="결제내역 관리"
        :columns="columns"
        :has-actions="false"
        :items="payments"
        :page-meta="pageMeta"
      >
        <template #control>
          <div class="flex justify-start">
            <select class="select select-bordered">
              <option>주문번호</option>
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

const columns = ['주문번호', '결제방식', '결제 총액', '결제 승인번호', '결제 상태', '생성일']
const payments = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}
</script>
