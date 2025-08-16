<template>
  <div>
    <v-card v-if="isLoggedIn() && hasRole('Admin')">
      <v-card-title>Connection Manager</v-card-title>
      <v-card-text>
        <v-table :items="connections">
          <template #item.type="{ item }">
            <v-chip :color="typeColor(item.type)">{{ item.type }}</v-chip>
          </template>
        </v-table>
      </v-card-text>
    </v-card>
    <div v-else class="d-flex flex-column align-center justify-center" style="height: 300px;">
      <h3>Bạn cần đăng nhập với vai trò Admin để xem trang này.</h3>
      <RouterLink to="/login">
        <v-btn color="primary">Đăng nhập</v-btn>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { mockConnections } from '@/mock/mockData'
import { isLoggedIn, hasRole } from '@/mock/mockAuth'

const connections = mockConnections
const typeColor = type => {
  if (type === 'Database') return 'green';
  if (type === 'Chatbot') return 'blue';
  if (type === 'AI') return 'purple';
  return 'grey';
};
</script>
