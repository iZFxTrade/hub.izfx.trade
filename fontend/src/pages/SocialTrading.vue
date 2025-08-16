<template>
  <v-card>
    <v-card-title>SocialTrading - Quản lý danh sách chiến lược</v-card-title>
    <v-card-text>
      <v-table :items="strategies">
        <template #item.pro="{ item }">
          <v-badge v-if="item.pro" color="primary">Pro</v-badge>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { mockStrategies } from '@/mock/mockData'
const strategies = mockStrategies
</script>
