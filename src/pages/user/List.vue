<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        ref="branchUserTable"
        class="mb-8"
        title="가맹점 계정 관리"
        :columns="userColumns"
        :has-actions="false"
        :items="users.display"
        :page-meta="userTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <router-link :to="{ name: 'user-new' }" class="btn btn-primary"> 신규등록</router-link>
            <button class="btn btn-secondary ml-4" @click="openSetUserGroup">선택 그룹지정</button>
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
            <router-link :to="{ name: 'group-new' }" class="btn btn-primary">그룹추가</router-link>
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
    <form>
      <div class="input-wrap">
        <label for="name" class="label label-lt">그룹 선택</label>
        <select class="select-box">
          <option>지점명</option>
          <option>사용자 아이디</option>
        </select>
      </div>
    </form>
    <template #footer>
      <div class="flex justify-end">
        <button class="btn btn-secondary">취소</button>
        <button class="btn btn-primary ml-2" @click="updateUserGroup">변경</button>
      </div>
    </template>
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
import dayjs from 'dayjs'
import type { BranchUser } from '@/types/service.type'
import { GroupService } from '@/services/group.service'

const userColumns = ['가맹점명', '아이디', '대표자', '연락처', '유저 그룹', '계정상태', '생성일']

const toggleSetUserGroup = ref(false)
const groupColumns = ['그룹명', '그룹 설명', '생성일']
const users = ref({
  raw: [],
  display: [],
})
const groups = []
const branchUserTable = ref()
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
const groupSvc = new GroupService()
onMounted(async () => {
  const pageData = await userSvc.listUser()
  userTablePage.value = pageData.meta
  users.value.raw = pageData.list
  users.value.display = orderPageItemList(
    pageData.list.map((itm) => {
      return {
        ...itm,
        groupName: itm.userGroup?.groupName,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['branchName', 'userId', 'branchManager', 'branchContact', 'groupName', 'status', 'createdAt'],
  )
})

function openSetUserGroup() {
  const rv = branchUserTable.value?.getCheckedIndex()
  console.log(rv)
  toggleSetUserGroup.value = true
}

async function updateUserGroup() {
  const groupId = 1
  const keys = branchUserTable.value?.getCheckedIndex()
  const targetUsers = (users.value.raw as BranchUser[]).filter((_, index) => keys?.includes(index))
  await groupSvc.addUserToGroup(groupId, targetUsers)
  window.alert(`${targetUsers.length}명 그룹지정이 완료되었습니다.`)
  toggleSetUserGroup.value = false
}
</script>
