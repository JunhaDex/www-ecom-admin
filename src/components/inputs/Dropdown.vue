<template>
  <div
    class="input-dropdown"
    :class="{ show: isOpen }"
    tabindex="0"
    @click="() => (isOpen = !isOpen)"
    @blur="() => (isOpen = false)"
  >
    <slot name="summary" />
    <ul>
      <slot name="default" />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>
<style scoped>
.input-dropdown {
  position: relative;

  & ul {
    position: absolute;
    display: none;
    right: 0;
    top: calc(100% + 0.5rem);
    width: 12rem;
    padding: 0.5rem 0.75rem;
    z-index: 50;
    opacity: 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: theme('boxShadow.md');
  }

  &.show {
    & ul {
      opacity: 1;
      display: block;
    }
  }
}
</style>
