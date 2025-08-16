<template>
  <v-card>
    <v-card-title>Quản lý lệnh giao dịch</v-card-title>
    <v-card-text>
      <v-table :items="orders">
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'open' ? 'green' : 'grey'">{{ item.status }}</v-chip>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
const orders = [
  { id: 1, symbol: 'EURUSD', status: 'open', volume: 1 },
  { id: 2, symbol: 'GBPUSD', status: 'closed', volume: 2 },
];
</script>
