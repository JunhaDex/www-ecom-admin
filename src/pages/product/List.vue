<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="판매 상품관리"
        :columns="columns"
        :has-actions="false"
        :items="products"
        :page-meta="pageMeta"
      >
        <template #control>
          <div class="flex justify-end">
            <button class="btn btn-primary">상품추가</button>
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

const columns = ['상품명', '상품설명', '상품 이미지', '가격', '판매상태', '생성일']
const products = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}
</script>
