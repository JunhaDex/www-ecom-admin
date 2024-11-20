<template>
  <AppBar />
  <!-- Main Content -->
  <SafeArea>
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-4">Welcome, JunhaDex</h1>
      <p>This is your main content area.</p>
    </div>
    <div class="mt-2">
      <div class="form-check">
        <input class="input-check" type="checkbox" id="myCheckbox" />
        <label for="myCheckbox"> Checkbox label </label>
      </div>

      <div class="form-check">
        <input class="input-check" type="radio" name="myRadio" id="myRadio" />
        <label for="myRadio"> Radio label </label>
      </div>
    </div>
    <Card class="bg-white shadow-sm">
      <div class="p-6 bg-natural">
        <h2 class="text-xl font-semibold mb-4">Table</h2>
        <div class="flex">
          <button class="btn btn-primary">추가하기</button>
        </div>
      </div>
      <div class="table-container w-full overflow-x-auto">
        <table class="table w-full whitespace-nowrap">
          <thead>
            <tr>
              <th class="w-16">
                <input class="input-check" type="checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="itemList.length">
            <tr v-for="(item, key) in itemList" :key="key">
              <td class="w-16">
                <input class="input-check" type="checkbox" />
              </td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
              <td>
                <div class="actions"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-empty">noting to show</div>
      </div>
      <div class="pagination bg-natural px-6 py-4">
        <div class="pagination-info">Showing 1 of 100 pages</div>
        <ul class="pagination-controls">
          <li>
            <IconButton class="btn-sm" :prefix-icon="BackIcon" />
          </li>
          <li>
            <button class="btn btn-secondary" disabled>1</button>
          </li>
          <li>
            <button class="btn">2</button>
          </li>
          <li>
            <button class="btn">3</button>
          </li>
          <li>
            <span class="page-ellipsis">...</span>
          </li>
          <li>
            <button class="btn">100</button>
          </li>
          <li>
            <IconButton class="btn-sm" :prefix-icon="ForwardIcon" />
          </li>
        </ul>
      </div>
    </Card>
  </SafeArea>
  <AppFooter />
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import AppFooter from '@/components/surfaces/AppFooter.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import Card from '@/components/surfaces/Card.vue'
import { ref } from 'vue'
import BackIcon from '@/assets/icons/back.svg'
import ForwardIcon from '@/assets/icons/forward.svg'
import IconButton from '@/components/inputs/IconButton.vue'

const itemList = ref([])
</script>
<style scoped>
.table-empty {
  display: flex;
  min-height: 25vh;
  justify-content: center;
  align-items: center;
}

.table {
  min-width: 768px;
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;

  tbody {
    display: block;
    min-height: 25vh;
  }

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
    display: table;
    width: 100%;
    table-layout: fixed;

    &:hover {
      background-color: #f9fafb;
    }
  }
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
