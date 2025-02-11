<template>
  <aside class="side-menu z-40" :class="{ open: isOpen }">
    <!-- Back Button for Mobile -->
    <IconButton
      class="btn-ghost absolute top-4 left-4"
      :prefix-icon="BackIcon"
      @click="closeMenu"
    />

    <!-- Sidebar Content -->
    <nav class="w-64 bg-white shadow-lg h-full pt-16">
      <div class="px-4 py-2">
        <router-link :to="{ name: 'home' }" class="menu-item">대시보드</router-link>
        <router-link :to="{ name: 'user-list' }" class="menu-item">가맹점 계정관리</router-link>
        <router-link :to="{ name: 'product-list' }" class="menu-item">판매 상품관리</router-link>
        <router-link :to="{ name: 'notice-list' }" class="menu-item">공지사항 관리</router-link>
        <router-link :to="{ name: 'order-list' }" class="menu-item">주문 관리</router-link>
        <router-link :to="{ name: 'shipment-list' }" class="menu-item">배송 관리</router-link>
        <router-link :to="{ name: 'carrier-list' }" class="menu-item">배송사 관리</router-link>
        <router-link :to="{ name: 'admin-list' }" class="menu-item">관리자 목록</router-link>
      </div>
    </nav>
  </aside>
  <Backdrop v-if="isOpen" @backdrop-click="closeMenu" />
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
import BackIcon from '@/assets/icons/back.svg'
import Backdrop from '@/components/feedbacks/Backdrop.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emits = defineEmits(['closeMenu'])

function closeMenu() {
  emits('closeMenu')
}
</script>
<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateX(0);
  }
}

.menu-item {
  display: block;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--v-natural-darker);
    border-color: var(--v-natural-darkest);
    box-shadow: 0 4px 6px theme('boxShadow.md');
  }
}
</style>
