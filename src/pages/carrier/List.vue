<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        ref="branchCourierTable"
        title="배송사 등록"
        :columns="columns"
        :has-actions="false"
        :items="couriers.display"
        :page-meta="courierTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <router-link :to="{ name: 'carrier-new' }" class="btn btn-primary">
              배송사 등록</router-link
            >
          </div>
          <div class="flex justify-start">
            <select class="select-box">
              <option value="name">배송사명</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
          </div>
        </template>
        <template #actions>
          <li>
            <span class="dropdown-item">배송사 수정</span>
            <span class="dropdown-item text-danger" @click="deleteCourier">배송사 삭제</span>
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
import { orderPageItemList } from '@/utils/index.util'
import type { PageMeta } from '@/types/ui.type'
import dayjs from 'dayjs'
import { CourierService } from '@/services/courier.service'
import type { Courier } from '@/types/service.type'
import { useRouter } from 'vue-router'

const columns = ['배송사명', 'API', '생성일']
const couriers = ref<{
  raw: Courier[]
  display: any[]
}>({
  raw: [],
  display: [],
})

const branchCourierTable = ref()
const courierTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const courierSvc = new CourierService()
const router = useRouter()
onMounted(async () => {
  const courierData = await courierSvc.listCourier()
  courierTablePage.value = courierData.meta
  couriers.value.raw = courierData.list
  couriers.value.display = orderPageItemList(
    courierData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['courierName', 'apiUrl', 'createdAt'],
  )
})

async function deleteCourier() {
  const index = branchCourierTable.value!.getRecentActionTarget()
  const target = couriers.value.raw[index] as Courier
  if (window.confirm(`${target.courierName}을(를) 삭제합니다. 계속 하시겠습니까?`)) {
    try {
      await courierSvc.deleteCouier(target.id)
      window.alert('배송사가 삭제되었습니다.')
      router.go(0)
    } catch (e) {
      console.error(e)
      window.alert('배송사를 삭제할 수 없습니다.')
    }
  }
}
</script>
