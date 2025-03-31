<template>
  <Card class="bg-white shadow-md">
    <div class="p-6 bg-natural">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <slot name="control" />
    </div>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th class="w-16">
              <input v-model="isCheckAll" class="input-check" type="checkbox" />
            </th>
            <th v-for="column in columns" :key="column">{{ column }}</th>
            <th>관리메뉴</th>
          </tr>
        </thead>
        <tbody v-if="items.length">
          <tr v-for="(item, key) in items" :key="key">
            <td class="w-16">
              <input
                :ref="(el) => (checkboxes[`${title}_${key}`] = el as HTMLInputElement)"
                class="input-check"
                type="checkbox"
              />
            </td>
            <td v-for="(entry, idx) in Object.values(item)" :key="`${key}-${idx}`">
              {{ entry === null ? '-' : entry }}
            </td>
            <td class="relative" @click="actionClicked(key)">
              <Dropdown>
                <template #summary>
                  <span class="btn btn-sm">관리</span>
                </template>
                <template #default>
                  <slot name="actions" />
                </template>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="items.length === 0" class="table-empty">데이터가 없습니다</div>
    </div>
    <div class="pagination bg-natural px-6 py-4">
      <div class="pagination-info">
        전체 {{ pageMeta.totalPage }} 중 {{ pageMeta.pageNo }} 페이지
      </div>
      <ul class="pagination-controls">
        <li>
          <IconButton class="btn-sm" :prefix-icon="BackIcon" :disabled="isFirst" />
        </li>
        <li v-for="pageNo in pageList" :key="pageNo">
          <button
            class="btn"
            :class="{ 'btn-secondary': pageNo === pageMeta.pageNo }"
            :disabled="pageNo === pageMeta.pageNo"
          >
            {{ pageNo }}
          </button>
        </li>
        <li v-if="pageMeta.totalPage > 5">
          <span class="page-ellipsis">...</span>
        </li>
        <li v-if="lastPage > 0">
          <button class="btn">{{ lastPage }}</button>
        </li>
        <li>
          <IconButton class="btn-sm" :prefix-icon="ForwardIcon" :disabled="isLast" />
        </li>
      </ul>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/components/surfaces/Card.vue'
import type { PageMeta } from '@/types/ui.type'
import IconButton from '@/components/inputs/IconButton.vue'
import BackIcon from '@/assets/icons/back.svg'
import ForwardIcon from '@/assets/icons/forward.svg'
import { computed, reactive, ref, watch } from 'vue'
import Dropdown from '@/components/inputs/Dropdown.vue'

const props = defineProps<{
  title: string
  columns: string[]
  items: any[]
  pageMeta: PageMeta
}>()

defineExpose({ getCheckedIndex, getRecentActionTarget })

const pageList = computed(() => {
  const list = []
  const totalMax = props.pageMeta.totalPage > 3 ? 3 : props.pageMeta.totalPage
  for (let i = 1; i <= totalMax; i++) {
    list.push(i)
  }
  return list
})
const lastPage = computed(() => {
  if (props.pageMeta.totalPage > 3) {
    return props.pageMeta.totalPage
  }
  return 0
})
const isFirst = computed(() => props.pageMeta.pageNo === 1)
const isLast = computed(() => props.pageMeta.pageNo === props.pageMeta.totalPage)
const checkboxes = reactive<{ [key: string]: HTMLInputElement }>({})
const isCheckAll = ref(false)
const actionTarget = ref<number | null>(null)

watch(isCheckAll, (value) => {
  for (const key in checkboxes) {
    checkboxes[key].checked = value
  }
})

function getCheckedIndex() {
  return Object.keys(checkboxes).reduce((acc, key) => {
    if (checkboxes[key].checked) {
      acc.push(parseInt(key.split('_')[1]))
    }
    return acc
  }, [] as number[])
}

function actionClicked(key: number) {
  actionTarget.value = key
}

function getRecentActionTarget() {
  return actionTarget.value
}
</script>
<style scoped>
.table-container {
  white-space: nowrap;
  max-width: none;
  width: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.table {
  border-collapse: collapse;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  width: max-content;
  min-width: 100%;

  & th,
  & td {
    padding: 0.75rem 1rem;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
  }

  & th {
    background-color: #f9fafb;
    font-weight: 500;
    color: #374151;
  }

  & tr {
    &:hover {
      background-color: #f9fafb;
    }
  }
}

.table-empty {
  display: flex;
  min-height: 25vh;
  justify-content: center;
  align-items: center;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .pagination-info {
    color: #6b7280;
    font-size: 14px;
  }

  & .pagination-controls {
    display: flex;
    list-style: none;
    gap: 4px;
    margin: 0;
    padding: 0;

    & li {
      display: flex;
      align-items: center;
    }
  }
}
</style>
