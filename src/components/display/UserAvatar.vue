<template>
  <div class="avatar flex items-center md:space-x-2">
    <!--<img :src="user.profileImage" :alt="user.name" class="w-8 h-8 rounded-full" />-->
    <span class="text-sm hidden md:inline">{{ user.name }}</span>
    <i class="icon hidden md:inline" :style="`--icon-url: url(${DownIcon})`"></i>
  </div>
</template>
<script setup lang="ts">
import type { AdminUser } from '@/types/user.type'
import DownIcon from '@/assets/icons/down.svg'

const props = defineProps<{
  user: AdminUser
}>()
</script>
<style scoped>
.avatar {
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

  &:active {
    background-color: var(--v-natural-lighter);
    border-color: var(--v-natural-lightest);
    transform: translateY(2px);
    box-shadow: 0 1px 2px theme('boxShadow.inner');
  }
}

.icon {
  width: 0.8rem;
  height: 0.8rem;
  mask-image: var(--icon-url);
  -webkit-mask-image: var(--icon-url);
  background-color: currentColor;
}
</style>
