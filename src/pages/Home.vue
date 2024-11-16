<template>
<AppBar/>
<!--  &lt;!&ndash; Sidebar Backdrop &ndash;&gt;-->
<!--  <div-->
<!--    id="sidebarBackdrop"-->
<!--    class="fixed inset-0 bg-black opacity-0 invisible transition-opacity z-30"-->
<!--  ></div>-->

<!--  &lt;!&ndash; Sidebar &ndash;&gt;-->
<!--  <aside id="sidebar" class="fixed inset-y-0 left-0 z-40">-->
<!--    &lt;!&ndash; Back Button for Mobile &ndash;&gt;-->
<!--    <button-->
<!--      id="sidebarClose"-->
<!--      class="absolute top-4 left-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 hidden"-->
<!--    >-->
<!--      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />-->
<!--      </svg>-->
<!--    </button>-->

<!--    &lt;!&ndash; Sidebar Content &ndash;&gt;-->
<!--    <nav class="w-64 bg-white shadow-lg h-full pt-16">-->
<!--      <div class="px-4 py-2">-->
<!--        <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded">Dashboard</a>-->
<!--        <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded">Analytics</a>-->
<!--        <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded">Reports</a>-->
<!--        <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded">Settings</a>-->
<!--      </div>-->
<!--    </nav>-->
<!--  </aside>-->

  <!-- Main Content -->
  <main class="min-h-screen pt-16 pb-16 px-4 md:px-16">
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-4">Welcome, JunhaDex</h1>
      <p>This is your main content area.</p>
    </div>
  </main>

  <!-- Footer -->
  <footer class="fixed bottom-0 w-full bg-white shadow-sm">
    <div class="px-4 py-3 text-center text-sm text-gray-600">
      Copyright © 2024. All rights reserved.
    </div>
  </footer>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
</script>
<style scoped></style>
