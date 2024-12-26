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
        <template #actions>
          <li>
            <span class="dropdown-item">비밀번호 초기화</span>
            <span class="dropdown-item">정보 수정</span>
            <span class="dropdown-item text-danger" @click="deleteUser">유저 삭제</span>
          </li>
        </template>
      </DataTable>
      <DataTable
        ref="branchGroupTable"
        title="유저 그룹"
        :columns="groupColumns"
        :has-actions="false"
        :items="groups.display"
        :page-meta="groupTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <router-link :to="{ name: 'group-new' }" class="btn btn-primary">그룹추가</router-link>
          </div>
        </template>
        <template #actions>
          <li>
            <span class="dropdown-item">정보 및 상품 변경</span>
            <span class="dropdown-item text-danger">그룹 삭제</span>
          </li>
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
          <option value="" disabled selected>그룹선택</option>
          <option v-for="group in groups.raw as UserGroup[]" :key="group.id" :value="group.id">
            {{ group.groupName }}
          </option>
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
import type { BranchUser, UserGroup } from '@/types/service.type'
import { GroupService } from '@/services/group.service'
import { useRouter } from 'vue-router'

const userColumns = ['가맹점명', '아이디', '대표자', '연락처', '유저 그룹', '계정상태', '생성일']

const toggleSetUserGroup = ref(false)
const groupColumns = ['그룹명', '그룹 설명', '생성일']
const users = ref({
  raw: [],
  display: [],
})
const groups = ref({
  raw: [],
  display: [],
})
const branchUserTable = ref()
const branchGroupTable = ref()

const userTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const groupTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const userSvc = new UserService()
const groupSvc = new GroupService()
const router = useRouter()
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
  const pageGroupData = await groupSvc.listGroup()
  groupTablePage.value = pageGroupData.meta
  groups.value.raw = pageGroupData.list
  groups.value.display = orderPageItemList(
    pageGroupData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['groupName', 'description', 'createdAt'],
  )
})

function openSetUserGroup() {
  const rv = branchUserTable.value!.getCheckedIndex()
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

async function deleteUser() {
  const index = branchUserTable.value!.getRecentActionTarget()
  const target = users.value.raw[index] as BranchUser
  if (window.confirm(`${target.userId}을(를) 삭제합니다. 계속 하시겠습니까?`)) {
    await userSvc.deleteUser(target.id)
    window.alert('계정이 삭제되었습니다.')
    router.go(0)
  }
}

// async function deleteGroup() {
//   const index = branchGroupTable.value!.getRecentActionTarget()
//   const target = groups.value.raw[index] as UserGroup
//   if (window.confirm('그룹을 삭제합니다. 계속 하시겠습니까?')) {
//     try {
//       // TODO: add group service delete
//       window.alert('그룹이 삭제되었습니다.')
//     } catch (e) {
//       console.error(e)
//       window.alert('그룹을 삭제할 수 없습니다.')
//     }
//   }
// }
</script>
