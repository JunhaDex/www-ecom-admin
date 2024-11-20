<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="가맹점 계정 관리"
        :columns="columns"
        :has-actions="false"
        :items="products"
        :page-meta="pageMeta"
      >
        <template #control></template>
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

const columns = ['상품명', '카테고리', '표시가', '실제판매가', '판매상태']
const products = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}
</script>
