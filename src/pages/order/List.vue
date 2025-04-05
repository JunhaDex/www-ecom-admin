<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <Card class="bg-white shadow-md mb-8">
        <div class="p-6 bg-natural">
          <h2 class="text-xl font-semibold mb-4">배송관련 조치</h2>
          <div class="flex mb-2">
            <button class="btn btn-primary ml-4" @click="clickTrackShipment">
              배송정보 새로고침
            </button>
            <button class="btn btn-secondary ml-4" @click="clickExportTxLog">
              매출데이터 추출
            </button>
            <a class="btn btn-success ml-4" :href="sheetLocation" target="_blank">
              매출데이터 열기
            </a>
          </div>
        </div>
      </Card>
      <DataTable
        ref="orderTable"
        title="주문관리"
        :columns="columns"
        :has-actions="false"
        :items="orders.display"
        :page-meta="txTablePage"
      >
        <template #control>
          <div class="flex justify-start">
            <select class="select-box">
              <option>상품명</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
          </div>
        </template>
        <template #actions>
          <li>
            <span class="dropdown-item" @click="updateTracking">주문 상세</span>
          </li>
          <li>
            <span class="dropdown-item" @click="openStatusModal">상태 변경</span>
          </li>
        </template>
      </DataTable>
    </div>
  </SafeArea>
  <AppFooter />
  <StatusModal
    :is-open="updateStatusCtx.isOpen"
    :tx-id="updateStatusCtx.txId"
    :status="updateStatusCtx.status"
    @close-modal="() => (updateStatusCtx.isOpen = false)"
    @update-status="updateTxStatus"
  ></StatusModal>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import AppFooter from '@/components/surfaces/AppFooter.vue'
import DataTable from '@/components/display/DataTable.vue'
import { onMounted, ref } from 'vue'
import type { PageMeta } from '@/types/ui.type'
import { getTxStatus, orderPageItemList } from '@/utils/index.util'
import dayjs from 'dayjs'
import { TxService } from '@/services/tx.service'
import type { TxAdminItem } from '@/types/service.type'
import { useRouter } from 'vue-router'
import StatusModal from '@/components/feedbacks/modals/StatusModal.vue'
import Card from '@/components/surfaces/Card.vue'

const columns = [
  '주문일',
  '상품명',
  '수량',
  '주문자',
  '주문 상태',
  '주문 메모',
  '주문 총액',
  '결제총액',
  '결제 승인번호',
  '택배사',
  '송장번호',
]
const sheetLocation = import.meta.env.VITE_SHEET_LOCATION
const router = useRouter()
const orders = ref<{
  raw: TxAdminItem[]
  display: any[]
}>({
  raw: [],
  display: [],
})
const orderTable = ref<typeof DataTable>()
const txItems = ref<TxAdminItem[]>([])
const txTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})
const txSvc = new TxService()
const updateStatusCtx = ref<{
  isOpen: boolean
  txId: number
  status: number
}>({
  isOpen: false,
  txId: 0,
  status: 0,
})
onMounted(async () => {
  const txData = await txSvc.listTx()
  txItems.value = txData.list
  txTablePage.value = txData.meta
  orders.value.raw = txData.list
  orders.value.display = orderPageItemList(
    txData.list.map((itm) => {
      const totalProductCount = itm.products.reduce((total, product) => total + product.count, 0)
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
        count: totalProductCount,
        userId: itm.user.userId,
        balanceAmount: itm.payment.balanceAmount,
        paidAmount: itm.payment.paidAmount,
        paymentKey: itm.payment.paymentKey,
        courier: itm.shipment?.courier,
        trackingNo: itm.shipment?.trackingNo,
        status: getTxStatus(itm.status),
      }
    }),
    [
      'createdAt',
      'txName',
      'count',
      'userId',
      'status',
      'txNote',
      'balanceAmount',
      'paidAmount',
      'paymentKey',
      'courier',
      'trackingNo',
    ],
  )
})

async function updateTracking() {
  const index = orderTable.value!.getRecentActionTarget()
  const target = orders.value.raw[index] as TxAdminItem
  await router.push({ name: 'order-delivery', params: { id: target.id } })
}

async function openStatusModal() {
  const index = orderTable.value!.getRecentActionTarget()
  const tx = orders.value.raw[index] as TxAdminItem
  updateStatusCtx.value.isOpen = true
  updateStatusCtx.value.txId = tx.id
  updateStatusCtx.value.status = tx.status
}

async function updateTxStatus(params: { txId: number; status: number }) {
  const index = orderTable.value!.getRecentActionTarget()
  const tx = orders.value.raw[index] as TxAdminItem
  console.log(tx, params.txId)
  const shipment = {
    trackingNo: tx.shipment?.trackingNo ?? null,
    courierId: tx.shipment?.courierId ?? null,
  }
  try {
    if (params.status === 1) {
      await txSvc.updateShipment(params.txId, params.status, {
        trackingNo: null,
        courierId: null,
      })
    } else {
      await txSvc.updateShipment(params.txId, params.status, shipment)
    }
    window.alert('주문 상태가 변경되었습니다.')
    window.location.reload()
  } catch (e) {
    window.alert('주문 상태를 변경할 수 없습니다.')
  }
}

async function clickTrackShipment() {
  await txSvc.trackShipment()
  window.alert('배송정보가 새로고침 되었습니다.')
  window.location.reload()
}

async function clickExportTxLog() {
  await txSvc.exportTxLog()
  window.alert('매출데이터를 동기화 하였습니다.')
}
</script>
