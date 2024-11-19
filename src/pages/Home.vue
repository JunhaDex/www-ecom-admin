<template>
  <AppBar />
  <!-- Sidebar Backdrop -->
  <div
    id="sidebarBackdrop"
    class="fixed inset-0 bg-black opacity-0 invisible transition-opacity z-30"
  ></div>

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
      <div class="w-full overflow-x-auto">
        <table class="table w-full whitespace-nowrap">
          <thead>
            <tr>
              <th>
                <input class="input-check" type="checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
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
        <div class="pagination bg-natural px-6 py-4">
          <div class="pagination-info">Showing 1 of 100 pages</div>
          <ul class="pagination-controls">
            <li>
              <button class="page-btn" disabled>Previous</button>
            </li>
            <li>
              <button class="page-btn page-btn-active">1</button>
            </li>
            <li>
              <button class="page-btn">2</button>
            </li>
            <li>
              <button class="page-btn">3</button>
            </li>
            <li>
              <span class="page-ellipsis">...</span>
            </li>
            <li>
              <button class="page-btn">100</button>
            </li>
            <li>
              <button class="page-btn">Next</button>
            </li>
          </ul>
        </div>
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
</script>
<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;

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
