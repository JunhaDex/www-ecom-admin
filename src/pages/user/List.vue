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
        :page-meta="userTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <router-link :to="{ name: 'user-new' }" class="btn btn-primary"> 신규등록</router-link>
            <button class="btn btn-secondary ml-4" @click="toggleSetUserGroup = true">
              선택 그룹지정
            </button>
            <button class="btn btn-danger ml-4">선택 삭제</button>
          </div>
          <div class="flex justify-start">
            <select class="select-box">
              <option>지점명</option>
              <option>사용자 아이디</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
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
            <input type="text" class="flex-1" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary">검색</button>
          </div>
        </template>
      </DataTable>
    </div>
  </SafeArea>
  <AppFooter />
  <InputModal :is-show="toggleSetUserGroup" title="그룹생성" @close="toggleSetUserGroup = false">
    <p>foobar</p>
    <template #footer> footer</template>
  </InputModal>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import AppFooter from '@/components/surfaces/AppFooter.vue'
import DataTable from '@/components/display/DataTable.vue'
import { onMounted, ref } from 'vue'
import { UserService } from '@/services/user.service'
import type { PageMeta } from '@/types/ui.type'
import { orderPageItemList } from '@/utils/index.util'
import InputModal from '@/components/inputs/InputModal.vue'

const userColumns = ['가맹점명', '아이디', '대표자', '연락처', '유저 그룹', '계정상태', '생성일']

const toggleSetUserGroup = ref(false)
const groupColumns = ['그룹명', '그룹 설명', '생성일']
const users = ref([])
const groups = []
const pageMeta = {
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
}

const userTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const userSvc = new UserService()
onMounted(async () => {
  const pageData = await userSvc.listUser()
  userTablePage.value = pageData.meta
  users.value = orderPageItemList(pageData.list, [
    'branchName',
    'userId',
    'branchManager',
    'branchContact',
    'groupId',
    'status',
    'createdAt',
  ])
})
</script>
