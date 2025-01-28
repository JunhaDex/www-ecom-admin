<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="유저 그룹생성">
      <!--그룹명 / 그룹설명 / 상품추가-->
      <form @submit="submitGroup">
        <h3 class="text-lg font-semibold mb-2">그룹 정보</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">그룹명</label>
          <input v-model="groupInfo.groupName" type="text" id="name" class="input" />
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
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ProductService } from '@/services/product.service'
import type { Product, UserGroupCreate } from '@/types/service.type'
import { GroupService } from '@/services/group.service'

const route = useRoute()
const productSvc = new ProductService()
const groupSvc = new GroupService()

const props = defineProps<{
  id: string
}>()

const products = ref<Product[]>([])
const groupInfo = ref<UserGroupCreate>({
  groupName: '',
  description: '',
})
const selected = ref<Product[]>([])
const selectId = ref('')
const isUpdate = ref(false)

onMounted(async () => {
  const res = await productSvc.listProduct()
  products.value = res.list
  if (route.name === 'group-update') {
    isUpdate.value = true
    await loadGroup()
  }
})
onBeforeRouteLeave(() => {
  // TODO: when not empty, alert
})

async function loadGroup() {
  const groupId = Number(props.id)
  const grp = await groupSvc.getGroup(groupId)
  groupInfo.value = {
    groupName: grp.group.groupName,
    description: grp.group.description,
  }
  selected.value = grp.products || []
}

function addProduct() {
  if (!isNaN(Number(selectId.value))) {
    const selectedProduct = products.value.find((product) => product.id === Number(selectId.value))
    if (selectedProduct && !selected.value.find((product) => product.id === selectedProduct.id)) {
      if (isUpdate.value) {
        addGroupProduct(selectedProduct)
      }
      selected.value.push(selectedProduct)
      selected.value.sort((a, b) => a.id - b.id)
    }
  }
}

function removeProduct(id: number) {
  const idx = selected.value.findIndex((product) => product.id === id)
  if (idx > -1) {
    if (isUpdate.value) {
      const product = selected.value[idx]
      removeGroupProduct(product)
    }
    selected.value.splice(idx, 1)
  }
}

function validateInput() {
  if (!groupInfo.value.groupName) {
    alert('그룹명을 입력해주세요.')
    return false
  }
  return true
}

async function submitGroup(e: Event) {
  e.preventDefault()
  if (!validateInput()) return
  if (isUpdate.value) {
    await updateGroup()
  } else {
    await createGroup()
  }
}

async function createGroup() {
  try {
    await groupSvc.createGroup({
      ...groupInfo.value,
      products: selected.value.length ? selected.value : undefined,
    })
    alert('그룹이 생성되었습니다.')
    resetForm()
  } catch (e) {
    console.error(e)
    alert('그룹을 생성할 수 없습니다.')
  }
}

async function updateGroup() {
  const groupId = Number(props.id)
  try {
    await groupSvc.updateGroup(groupId, {
      ...groupInfo.value,
    })
    alert('그룹이 수정되었습니다.')
  } catch (e) {
    console.error(e)
    alert('그룹을 수정할 수 없습니다.')
  }
}

async function addGroupProduct(product: Product) {
  const groupId = Number(props.id)
  try {
    await groupSvc.addGroupProduct(groupId, [product])
  } catch (e) {
    console.error(e)
    alert('상품을 추가할 수 없습니다.')
  }
}

async function removeGroupProduct(product: Product) {
  const groupId = Number(props.id)
  try {
    await groupSvc.removeGroupProduct(groupId, [product])
  } catch (e) {
    console.error(e)
    alert('상품을 삭제할 수 없습니다.')
  }
}

function resetForm() {
  groupInfo.value = {
    groupName: '',
    description: '',
  }
  selectId.value = ''
  selected.value = []
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
