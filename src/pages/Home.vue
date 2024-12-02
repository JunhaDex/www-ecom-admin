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
        <h2 class="text-xl font-semibold">Table</h2>
      </div>
      <div class="table-container w-full overflow-x-auto">
        <table class="table w-full whitespace-nowrap">
          <thead>
            <tr>
              <th>지점명</th>
              <th>
                <div class="border-b-2">상품1</div>
                <div class="flex">
                  <span class="flex-1 border-r-2">주문총액</span>
                  <span class="flex-1">수량</span>
                </div>
              </th>
              <th>
                <div class="border-b-2">상품2</div>
                <div class="flex">
                  <span class="flex-1 border-r-2">주문총액</span>
                  <span class="flex-1">수량</span>
                </div>
              </th>
              <th>주문 총액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>지점 1</td>
              <td>
                <div class="flex">
                  <span class="flex-1 border-r-2">100,000</span>
                  <span class="flex-1">2</span>
                </div>
              </td>
              <td>
                <div class="flex">
                  <span class="flex-1 border-r-2">100,000</span>
                  <span class="flex-1">2</span>
                </div>
              </td>
              <td>200,000</td>
            </tr>
            <tr>
              <td>지점 2</td>
              <td>
                <div class="flex">
                  <span class="flex-1 border-r-2">100,000</span>
                  <span class="flex-1">2</span>
                </div>
              </td>
              <td>
                <div class="flex">
                  <span class="flex-1 border-r-2">100,000</span>
                  <span class="flex-1">2</span>
                </div>
              </td>
              <td>200,000</td>
            </tr>
            <tr class="subtotal">
              <td>총계</td>
              <td>
                <div class="flex">
                  <span class="flex-1 border-r-2">200,000</span>
                  <span class="flex-1">4</span>
                </div>
              </td>
              <td>
                <div class="flex">
                  <span class="flex-1 border-r-2">200,000</span>
                  <span class="flex-1">4</span>
                </div>
              </td>
              <td>400,000</td>
            </tr>
          </tbody>
        </table>
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

    td:first-child {
      background-color: #f9fafb;
    }

    &.subtotal {
      td {
        background-color: #f9fafb;
      }
    }

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
