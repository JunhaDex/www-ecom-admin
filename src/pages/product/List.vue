<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="판매 상품관리"
        :columns="columns"
        :has-actions="false"
        :items="products"
        :page-meta="productTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <button class="btn btn-primary">상품 추가</button>
            <button class="btn btn-danger ml-4">상품 삭제</button>
          </div>
          <div class="flex justify-start">
            <select class="select-box">
              <option value="name">상품명</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
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
import { orderPageItemList } from '@/utils/index.util'
import { ProductService } from '@/services/product.service'
import type { PageMeta } from '@/types/ui.type'
import dayjs from 'dayjs'

const columns = ['상품명', '상품설명', '가격', '판매상태', '생성일']
const products = ref([])
const productTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const productSvc = new ProductService()
onMounted(async () => {
  const productData = await productSvc.listProduct()
  productTablePage.value = productData.meta
  products.value = orderPageItemList(
    productData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['productName', 'description', 'productPrice', 'status','createdAt'],
  )
})
</script>
