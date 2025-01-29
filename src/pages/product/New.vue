<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="신규 상품 등록">
      <form @submit.prevent="submitProduct">
        <h3 class="text-lg font-semibold mb-2">가맹점 정보</h3>
        <div class="input-wrap mb-4">
          <label>상품 이미지</label>
          <ImageUploadInput :max-count="5" ref="fileUploadRef" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">상품명</label>
          <input v-model="productInfo.productName" type="text" id="productName" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">상품가격</label>
          <input v-model="productInfo.productPrice" type="number" id="productPrice" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">상품설명</label>
          <input v-model="productInfo.description" type="text" id="description" class="input" />
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'product-list' }" class="btn btn-secondary">취소</router-link>
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
import { onMounted, ref } from 'vue'
import type { ProductCreate } from '@/types/service.type'
import { ProductService } from '@/services/product.service'
import ImageUploadInput from '@/components/inputs/ImageUploadInput.vue'
import { useRoute } from 'vue-router'

const pdSvc = new ProductService()
const route = useRoute()
const props = defineProps<{ id: string }>()
const fileUploadRef = ref<typeof ImageUploadInput>()
const productInfo = ref<ProductCreate>({
  productName: '',
  productPrice: 0,
  description: '',
})
const images = ref<string[]>([])
const isUpdate = ref(false)

onMounted(async () => {
  if (route.name === 'product-update') {
    isUpdate.value = true
    const productId = Number(props.id)
    const product = await pdSvc.getProduct(productId)
    productInfo.value = {
      productName: product.productName,
      productPrice: product.productPrice,
      description: product.description,
    }
    images.value.push(...(product.imageUrls ?? []))
  }
})

async function submitProduct() {
  if (isUpdate.value) {
    await updateProduct()
  } else {
    await createProduct()
  }
}

async function createProduct() {
  try {
    const formData = new FormData()
    const images = fileUploadRef.value!.checkout() as File[]
    if (images.length) {
      images.forEach((image) => {
        formData.append('images', image)
      })
    }
    formData.append('productName', productInfo.value.productName)
    formData.append('productPrice', productInfo.value.productPrice.toString())
    formData.append('description', productInfo.value.description)
    await pdSvc.createProduct(formData)
    alert('상품이 등록되었습니다.')
    productInfo.value = {
      productName: '',
      productPrice: 0,
      description: '',
    }
    fileUploadRef.value!.reset()
  } catch (error) {
    console.error(error)
    alert('상품을 등록할 수 없습니다.')
  }
}

async function updateProduct() {
  try {
    const formData = new FormData()
    formData.append('productName', productInfo.value.productName)
    formData.append('productPrice', productInfo.value.productPrice.toString())
    formData.append('description', productInfo.value.description)
    await pdSvc.updateProduct(Number(props.id), formData)
    alert('상품이 수정되었습니다.')
  } catch (error) {
    console.error(error)
    alert('상품을 수정할 수 없습니다.')
  }
}
</script>
