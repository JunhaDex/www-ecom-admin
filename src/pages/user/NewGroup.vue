<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="유저 그룹생성">
      <!--그룹명 / 그룹설명 / 상품추가-->
      <form>
        <h3 class="text-lg font-semibold mb-2">그룹 정보</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">그룹명</label>
          <input v-model="groupInfo.name" type="text" id="name" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">그룹설명</label>
          <input v-model="groupInfo.description" type="text" id="name" class="input" />
        </div>
        <h3 class="text-lg font-semibold mb-2">상품추가</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">추가 상품 선택</label>
          <select v-model="selectId" class="select-box" @change="addProduct">
            <option value="" disabled selected>상품선택</option>
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.productName }}
            </option>
          </select>
        </div>
        <ul v-if="selected.length" class="selected-items p-6">
          <!--product name / product price-->
          <li v-for="product in selected" class="selected-item" :key="product.id">
            <span class="selected-item-name">{{ product.productName }}</span>
            <button type="button" class="btn btn-ghost btn-sm" @click="removeProduct(product.id)">
              X
            </button>
          </li>
        </ul>
        <div v-else class="selected-items list-empty">
          <p>상품을 선택하여 추가하세요</p>
        </div>
        <div class="flex justify-end mt-4">
          <router-link :to="{ name: 'user-list' }" class="btn btn-secondary">취소</router-link>
          <button type="submit" class="btn btn-primary ml-4">등록</button>
        </div>
      </form>
    </CreateForm>
  </SafeArea>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import CreateForm from '@/components/display/CreateForm.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ProductService } from '@/services/product.service'
import type { Product } from '@/types/service.type'

const productSvc = new ProductService()
const products = ref<Product[]>([])
const groupInfo = ref<{
  name: string
  description: string
}>({
  name: '',
  description: '',
})
const selected = ref<Product[]>([])
const selectId = ref('')
onMounted(async () => {
  const res = await productSvc.listProduct()
  products.value = res.list
})
onBeforeRouteLeave(() => {
  // TODO: when not empty, alert
})

function addProduct() {
  if (!isNaN(Number(selectId.value))) {
    const selectedProduct = products.value.find((product) => product.id === Number(selectId.value))
    if (selectedProduct && !selected.value.find((product) => product.id === selectedProduct.id)) {
      selected.value.push(selectedProduct)
      selected.value.sort((a, b) => a.id - b.id)
      console.log(selected.value)
    }
  }
}

function removeProduct(id: number) {
  const idx = selected.value.findIndex((product) => product.id === id)
  if (idx > -1) {
    selected.value.splice(idx, 1)
  }
}
</script>
<style scoped>
.selected-items {
  border: 1px solid theme('colors.gray.400');
  border-radius: 4px;

  &.list-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    color: theme('colors.gray.400');
  }

  .selected-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .selected-item:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
</style>
