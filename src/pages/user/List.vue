<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="가맹점 계정 관리"
        :columns="columns"
        :has-actions="false"
        :items="users"
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

const columns = ['ID', '가맹점명', '가맹점 주소', '대표자명', '연락처', '상태', '생성일']
const users = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}
</script>
