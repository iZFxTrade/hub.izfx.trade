<template>
  <div>
    <v-card v-if="isLoggedIn() && hasRole('Admin')">
      <v-card-title>Report tổng quan tài khoản</v-card-title>
      <v-card-text>
        <v-table :items="accounts">
          <template #item.role="{ item }">
            <v-chip :color="roleColor(item.role)">{{ item.role }}</v-chip>
          </template>
        </v-table>
      </v-card-text>
    </v-card>
    <div v-else class="d-flex flex-column align-center justify-center" style="height: 300px;">
      <h3>Bạn cần đăng nhập với vai trò Admin để xem báo cáo này.</h3>
      <RouterLink to="/login">
        <v-btn color="primary">Đăng nhập</v-btn>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { mockTraderAccounts, mockUsers } from '@/mock/mockData'
import { isLoggedIn, hasRole } from '@/mock/mockAuth'

const accounts = mockTraderAccounts.map(acc => {
  const user = mockUsers.find(u => u.id === acc.userId)
  return {
    ...acc,
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
  }
})
const roleColor = role => {
  if (role === 'Admin') return 'red';
  if (role === 'Mod') return 'orange';
  if (role === 'Trader') return 'blue';
  if (role === 'Investor') return 'green';
  if (role === 'KOL') return 'purple';
  return 'grey';
};
</script>
