
<template>
  <v-card>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px;">
      <v-select :items="[10, 20, 50]" v-model="rowsPerPage" style="width: 80px;" />
      <v-text-field v-model="search" placeholder="Search User" style="max-width: 220px;" />
      <div>
        <v-btn color="primary" class="mr-2">Export</v-btn>
        <v-btn color="primary" @click="addUser">+ Add New User</v-btn>
      </div>
    </div>
    <v-table>
      <thead>
        <tr>
          <th><v-checkbox v-model="selectAll" @change="toggleSelectAll" /></th>
          <th>USER</th>
          <th>ROLE</th>
          <th>PLAN</th>
          <th>BILLING</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in pagedUsers" :key="user.id">
          <td><v-checkbox v-model="user.selected" /></td>
          <td style="display: flex; align-items: center; gap: 12px;">
            <v-avatar size="36">
              <img :src="user.avatar" alt="avatar" />
            </v-avatar>
            <div>
              <div>{{ user.name }}</div>
              <div style="font-size: 13px; color: #888;">{{ user.email }}</div>
            </div>
          </td>
          <td>
            <v-icon :color="roleColor(user.role)" size="20">{{ roleIcon(user.role) }}</v-icon>
            <span style="margin-left: 6px;">{{ user.role }}</span>
          </td>
          <td>{{ user.plan }}</td>
          <td>{{ user.billing }}</td>
          <td>
            <v-chip :color="statusColor(user.status)" variant="outlined">{{ user.status }}</v-chip>
          </td>
          <td>
            <v-btn icon @click="viewUser(user)"><v-icon>mdi-eye</v-icon></v-btn>
            <v-btn icon @click="editUser(user)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon color="error" @click="deleteUser(user)"><v-icon>mdi-delete</v-icon></v-btn>
            <v-btn icon color="info" @click="toggleStatus(user)"><v-icon>mdi-refresh</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div style="display: flex; justify-content: flex-end; align-items: center; padding: 16px;">
      <v-pagination v-model="page" :length="pageCount" />
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
const rowsPerPage = ref(10)
const page = ref(1)
const search = ref('')
const selectAll = ref(false)
const users = ref([
  { id: 1, name: 'Beverlie Krabbe', email: 'bkrabbe1d@home.pl', role: 'Editor', plan: 'Company', billing: 'Manual-Cash', status: 'Active', avatar: '/src/assets/images/avatars/avatar-1.png', selected: false },
  { id: 2, name: 'Paulie Durber', email: 'pdurber1c@gov.uk', role: 'Subscriber', plan: 'Team', billing: 'Manual-PayPal', status: 'Inactive', avatar: '/src/assets/images/avatars/avatar-2.png', selected: false },
  { id: 3, name: 'Onfre Wind', email: 'owind1b@yandex.ru', role: 'Admin', plan: 'Basic', billing: 'Manual-PayPal', status: 'Pending', avatar: '/src/assets/images/avatars/avatar-3.png', selected: false },
  { id: 4, name: 'Karena Courtliff', email: 'kcourtliff1a@bbc.co.uk', role: 'Admin', plan: 'Basic', billing: 'Manual-Credit Card', status: 'Active', avatar: '/src/assets/images/avatars/avatar-4.png', selected: false },
  { id: 5, name: 'Saunder Offner', email: 'soffner19@mac.com', role: 'Maintainer', plan: 'Enterprise', billing: 'Manual-Credit Card', status: 'Pending', avatar: '/src/assets/images/avatars/avatar-5.png', selected: false },
])

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u => u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase()))
})
const pageCount = computed(() => Math.ceil(filteredUsers.value.length / rowsPerPage.value))
const pagedUsers = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value
  return filteredUsers.value.slice(start, start + rowsPerPage.value)
})

function toggleSelectAll() {
  filteredUsers.value.forEach(u => u.selected = selectAll.value)
}
function toggleStatus(user) {
  user.status = user.status === 'Active' ? 'Inactive' : 'Active'
}
function editUser(user) {
  alert('Edit user: ' + user.name)
}
function deleteUser(user) {
  users.value = users.value.filter(u => u.id !== user.id)
}
function addUser() {
  users.value.push({
    id: Date.now(),
    name: 'New User', email: 'new@trade.com', role: 'Subscriber', plan: 'Team', billing: 'Manual-Cash', status: 'Pending', avatar: '/src/assets/images/avatars/avatar-1.png', selected: false
  })
}
function viewUser(user) {
  alert('View user: ' + user.name)
}
const roleColor = role => {
  switch (role) {
    case 'Admin': return 'purple'
    case 'Mod': return 'orange'
    case 'Trader': return 'green'
    case 'Investor': return 'blue'
    case 'KOL': return 'red'
    default: return 'grey'
  }
}
const statusColor = status => {
  switch (status) {
    case 'Active': return 'light-green'
    case 'Inactive': return 'grey'
    case 'Pending': return 'yellow'
    default: return 'grey'
  }
}

const roleIcon = role => {
  switch (role) {
    case 'Admin': return 'mdi-crown'
    case 'Mod': return 'mdi-shield-account'
    case 'Trader': return 'mdi-cash'
    case 'Investor': return 'mdi-account-group'
    case 'KOL': return 'mdi-star'
    default: return 'mdi-account'
  }
}
</script>
