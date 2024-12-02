<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        class="mb-8"
        title="가맹점 계정 관리"
        :columns="userColumns"
        :has-actions="false"
        :items="users"
        :page-meta="pageMeta"
      >
        <template #control>
          <div class="flex justify-end">
            <button class="btn btn-primary">신규등록</button>
          </div>
          <div class="flex justify-start">
            <select class="select select-bordered">
              <option>지점명</option>
              <option>사용자 아이디</option>
            </select>
            <input
              type="text"
              class="flex-1"
              placeholder="검색어를 입력하세요"
            />
            <button class="btn btn-primary">검색</button>
          </div>
        </template>
      </DataTable>
      <DataTable
        title="유저 그룹"
        :columns="groupColumns"
        :has-actions="false"
        :items="groups"
        :page-meta="pageMeta"
      >
        <template #control>
          <div class="flex justify-end mb-4">
            <button class="btn btn-primary">그룹추가</button>
          </div>
          <div class="flex justify-start">
            <select class="select select-bordered">
              <option value="name">그룹명</option>
            </select>
            <input
              type="text"
              class="flex-1"
              placeholder="검색어를 입력하세요"
            />
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

const userColumns = [
  '가맹점명',
  '아이디',
  '지점 주소',
  '대표자',
  '연락처',
  '유저 그룹',
  '계정상태',
  '생성일',
]

const groupColumns = ['그룹명', '그룹 설명', '생성일']
const users = []
const groups = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}
</script>
