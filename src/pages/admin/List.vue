<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        ref="branchAdminTable"
        title="관리자 계정관리"
        :columns="adminColumns"
        :has-actions="false"
        :items="admins.display"
        :page-meta="adminTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <router-link :to="{ name: 'admin-new' }" class="btn btn-primary">
              관리자 등록
            </router-link>
          </div>
          <div class="flex justify-start">
            <select class="select-box">
              <option>관리자명</option>
              <option>관리자 아이디</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
          </div>
        </template>
        <template #actions>
          <li>
            <span class="dropdown-item text-danger" @click="deleteAdmin">관리자 삭제</span>
            <!--            <span class="dropdown-item text-danger" @click="deleteUser">유저 삭제</span>-->
          </li>
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
import { onMounted, ref } from 'vue'
import type { PageMeta } from '@/types/ui.type'
import { orderPageItemList } from '@/utils/index.util'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { AdminService } from '@/services/admin.service'
import type { Admin } from '@/types/service.type'

const adminColumns = ['아이디', '이름', '생성일']
const admins = ref({
  raw: [] as Admin[],
  display: [] as any[],
})
const branchAdminTable = ref()

const adminTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const adminSvc = new AdminService()
const router = useRouter()
onMounted(async () => {
  const pageData = await adminSvc.listAdmin()
  adminTablePage.value = pageData.meta
  admins.value.raw = pageData.list
  admins.value.display = orderPageItemList(
    pageData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['adminId', 'name', 'createdAt'],
  )
})

async function deleteAdmin() {
  const index = branchAdminTable.value!.getRecentActionTarget()
  const target = admins.value.raw[index] as Admin
  if (window.confirm('관리자를 삭제합니다. 계속 하시겠습니까?')) {
    try {
      await adminSvc.deleteAdmin(target.id)
      window.alert('관리자가 삭제되었습니다.')
      router.go(0)
    } catch (e) {
      console.error(e)
      window.alert('관리자를 삭제할 수 없습니다.')
    }
  }
}
</script>
