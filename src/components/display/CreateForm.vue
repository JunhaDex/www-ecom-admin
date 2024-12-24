<template>
  <div class="pt-8">
    <Card class="bg-white shadow-md">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
        <slot />
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/surfaces/Card.vue'

const props = defineProps<{
  title: string
}>()
</script>
