<template>
  <v-card>
    <v-card-title>Quản lý chiến lược đáng sao chép</v-card-title>
    <v-card-text>
      <v-table :items="copyStrategies">
        <template #item.admin="{ item }">
          <v-badge v-if="item.admin" color="error">Admin</v-badge>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { mockStrategies } from '@/mock/mockData'
const copyStrategies = mockStrategies
</script>
