<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="배송정보 등록">
      <h3 class="text-lg font-semibold mb-2">배송지 정보</h3>
      <div class="info-layout mb-4">
        <ul>
          <li>
            <label>주문번호</label>
            <span>{{ txData.shipment?.txId }}</span>
          </li>
          <li class="flex items-center">
            <label>주문상태</label>
            <span>{{ getTxStatus(txData.status!) }}</span>
            <button class="btn btn-secondary ml-2" @click="() => (isStatusOpen = true)">
              상태변경
            </button>
          </li>
          <li>
            <label>받는사람 (지점명)</label>
            <span>{{ recipientName }}</span>
          </li>
          <li>
            <label>배송지</label>
            <span>{{ recipientAddress }}</span>
          </li>
          <li>
            <label>전화번호</label>
            <span>{{ txData.shipment?.recipientPhone }}</span>
          </li>
        </ul>
      </div>
      <h3 class="text-lg font-semibold mb-2">주문 품목</h3>
      <div v-for="(item, idx) in txData.products" class="info-layout mb-2" :key="idx">
        <ul>
          <li>
            <label>상품명</label>
            <span>{{ item.product.productName }}</span>
          </li>
          <li>
            <label>수량</label>
            <span>{{ item.count }}</span>
          </li>
        </ul>
      </div>
      <div class="flex justify-between my-4 px-4">
        <h4 class="font-semibold text-gray-600">주문총액</h4>
        <p class="text-lg">{{ txData.payment!.paidAmount!.toLocaleString('en-US') }}원</p>
      </div>
      <h3 class="text-lg font-semibold mb-2">배송정보 등록</h3>
      <form @submit.prevent="updateTracking">
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">송장번호</label>
          <input
            v-model="userInput.trackingNo"
            type="text"
            id="trackingNo"
            class="input"
            :disabled="!isEditable"
          />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">배송사</label>
          <select v-model="userInput.courierId" class="select-box" :disabled="!isEditable">
            <option disabled selected>배송사 선택</option>
            <option v-for="courier in courierList" :key="courier.id" :value="courier.id">
              {{ courier.courierName }}
            </option>
          </select>
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'order-list' }" class="btn btn-secondary">취소</router-link>
          <button type="submit" class="btn btn-primary ml-4" :disabled="!isEditable">등록</button>
        </div>
      </form>
    </CreateForm>
  </SafeArea>
  <StatusModal
    :is-open="isStatusOpen"
    :tx-id="txData.id!"
    :status="txData.status!"
    @close-modal="() => (isStatusOpen = false)"
    @update-status="updateTxStatus"
  ></StatusModal>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import CreateForm from '@/components/display/CreateForm.vue'
import { computed, onMounted, ref } from 'vue'
import { TxService } from '@/services/tx.service'
import { CourierService } from '@/services/courier.service'
import type { Courier, TxAdminItem, User } from '@/types/service.type'
import { getTxStatus } from '@/utils/index.util'
import StatusModal from '@/components/feedbacks/modals/StatusModal.vue'

const txSvc = new TxService()
const courierSvc = new CourierService()
const props = defineProps<{
  id: string
}>()
const courierList = ref<Courier[]>([])
const isStatusOpen = ref(false)
const txData = ref<Partial<TxAdminItem>>({
  id: 0,
  payment: {
    paidAmount: 0,
  },
  shipment: {
    txId: 0,
    address: '',
    recipientName: '',
    recipientPhone: '',
  },
  user: {
    branchName: '',
  } as User,
  products: [],
  status: 2,
})
const userInput = ref<{
  trackingNo: string
  courierId: number | null
}>({
  trackingNo: '',
  courierId: null,
})

const recipientName = computed(() => {
  let empty = ''
  if (txData.value.shipment?.recipientName) {
    empty += txData.value.shipment.recipientName
  }
  if (txData.value.user?.branchName) {
    empty += `(${txData.value.user.branchName})`
  }
  return empty
})

const recipientAddress = computed(() => {
  let empty = ''
  if (txData.value.shipment?.address) {
    empty += txData.value.shipment.address.replace(/###/g, ' ')
  }
  return empty
})
const isEditable = ref(false)
onMounted(async () => {
  txData.value = await txSvc.getTx(Number(props.id))
  const courier = await courierSvc.listCourier()
  courierList.value.push(...courier.list)
  isEditable.value = txData.value.status === 1
  userInput.value.trackingNo = txData.value.shipment?.trackingNo ?? ''
  userInput.value.courierId = txData.value.shipment?.courierId ?? null
})

async function updateTracking(e: Event) {
  e.preventDefault()
  if (!isEditable.value) return
  try {
    const txId = Number(props.id)
    await txSvc.registerShipment(txId, {
      trackingNo: userInput.value.trackingNo,
      courierId: Number(userInput.value.courierId),
    })
    txData.value = await txSvc.getTx(Number(props.id))
    isEditable.value = txData.value.status === 1
    alert('배송정보가 등록되었습니다.')
  } catch (err) {
    console.error(err)
    alert('배송정보 등록에 실패했습니다.')
  }
}

async function updateTxStatus(params: { txId: number; status: number }) {
  const shipment = {
    trackingNo: txData.value.shipment?.trackingNo ?? null,
    courierId: txData.value.shipment?.courierId ?? null,
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
</script>
<style scoped>
.info-layout {
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 8px;

  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  & label {
    font-size: 0.875rem;
    color: #666;
    margin-right: 0.5rem;
  }
}
</style>
