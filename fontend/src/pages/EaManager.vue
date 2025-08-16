<template>
  <v-card>
    <v-card-title>Quản lý EA Robot</v-card-title>
    <v-card-text>
      <v-table :items="robots">
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'active' ? 'success' : 'error'">{{ item.status }}</v-chip>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { mockStrategies } from '@/mock/mockData'
const robots = mockStrategies.filter(s => s.type === 'EA').map(s => ({ id: s.id, name: s.name, status: s.status }))
</script>
