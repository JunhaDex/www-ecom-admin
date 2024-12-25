<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="주문관리"
        :columns="columns"
        :has-actions="false"
        :items="orders"
        :page-meta="txTablePage"
      >
        <template #control>
          <div class="flex justify-end">
            <button class="btn btn-secondary mr-2">내보내기</button>
            <button class="btn btn-primary">목록 최신화</button>
          </div>
          <div class="flex justify-start">
            <select class="select select-bordered">
              <option>지점명</option>
              <option>사용자 아이디</option>
            </select>
            <input type="text" class="flex-1" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary">검색</button>
          </div>
          <div class="flex justify-start">
            <button class="btn btn-primary">검색 필터추가 +</button>
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
import { onMounted, ref } from 'vue'
import type { PageMeta } from '@/types/ui.type'
import { orderPageItemList } from '@/utils/index.util'
import dayjs from 'dayjs'
import { TxService } from '@/services/tx.service'

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
const orders = ref([])
const txTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})
const txSvc = new TxService()
onMounted(async () => {
  const txData = await txSvc.listTx()
  txTablePage.value = txData.meta

  orders.value = orderPageItemList(
    txData.list.map((itm) => {
      const totalProductCount =
        itm.products.reduce((total, product) => total + product.count, 0)
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
</script>
