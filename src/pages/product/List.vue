<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        ref="branchProductTable"
        title="판매 상품관리"
        :columns="columns"
        :has-actions="false"
        :items="products.display"
        :page-meta="productTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <button class="btn btn-primary">상품 추가</button>
          </div>
          <div class="flex justify-start">
            <select class="select-box">
              <option value="name">상품명</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
          </div>
        </template>
        <template #actions>
          <li>
            <span class="dropdown-item text-danger" @click="deleteProduct">상품 삭제</span>
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
import { ProductService } from '@/services/product.service'
import type { PageMeta } from '@/types/ui.type'
import dayjs from 'dayjs'
import type { Product } from '@/types/service.type'
import { useRouter } from 'vue-router'

const columns = ['상품명', '상품설명', '가격', '판매상태', '생성일']
const products = ref({
  raw: [],
  display: [],
})
const branchProductTable = ref()

const productTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const productSvc = new ProductService()
const router = useRouter()
onMounted(async () => {
  const productData = await productSvc.listProduct()
  productTablePage.value = productData.meta
  products.value.raw = productData.list
  products.value.display = orderPageItemList(
    productData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['productName', 'description', 'productPrice', 'status', 'createdAt'],
  )
})

async function deleteProduct() {
  const index = branchProductTable.value!.getRecentActionTarget()
  const target = products.value.raw[index] as Product
  if (window.confirm(`${target.productName}을(를) 삭제합니다. 계속 하시겠습니까?`)) {
    try {
      await productSvc.deleteProduct(target.id)
      window.alert('상품이 삭제되었습니다.')
      router.go(0)
    } catch (e) {
      console.error(e)
      window.alert('상품을 삭제할 수 없습니다.')
    }
  }
}
</script>
