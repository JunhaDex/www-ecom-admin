<template>
  <header class="bg-white shadow-sm fixed w-full top-0 z-20">
    <div class="flex justify-between items-center p-4">
      <!-- Left side - Menu Button -->
      <div class="flex items-center">
        <IconButton :prefix-icon="MenuIcon" class="btn-ghost" @click="toggleSideMenu" />
        <h2 class="ml-4 text-xl font-bold">꽈백최선생 - 관리자</h2>
      </div>

      <!-- Right side - User Profile -->
      <Dropdown>
        <template #summary>
          <UserAvatar
            :user="{
              uid: '1',
              name: 'Admin',
              profileImage: '',
            }"
          />
        </template>
        <template #default>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
          </li>
          <hr class="my-1" />
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sign out</a>
          </li>
        </template>
      </Dropdown>
    </div>
  </header>
  <SideMenu :is-open="sideMenuOpen" @close-menu="toggleSideMenu" />
</template>
<script setup lang="ts">
import IconButton from '@/components/inputs/IconButton.vue'
import MenuIcon from '@/assets/icons/menu.svg'
import UserAvatar from '@/components/display/UserAvatar.vue'
import Dropdown from '@/components/inputs/Dropdown.vue'
import SideMenu from '@/components/navigations/SideMenu.vue'
import { ref } from 'vue'

const sideMenuOpen = ref(false)

function toggleSideMenu() {
  sideMenuOpen.value = !sideMenuOpen.value
}
</script>
<style scoped>
li {
  & a {
    display: block;
    padding: 0.5rem 1rem;
    color: theme('colors.gray.700');
    text-decoration: none;

    &:hover {
      background-color: theme('colors.gray.300');
    }
  }

  &:last-child a {
    color: theme('colors.danger');
  }
}

& .divider {
  height: 1px;
  margin: 0.5rem 0;
  background-color: theme('colors.gray.200');
}
</style>
