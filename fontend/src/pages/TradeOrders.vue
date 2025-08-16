<!--
Trade Order Management Page

Features:
- Display list of trading accounts and their status (balance, equity, profit, position, order). Users can add, delete, enable/disable accounts.
- Display list of orders with details: account id, ticket, order type, symbol, volume, open price, SL, TP, EA, comment.
- Users can sort, filter, display by account, order type, symbol, profit.
- Select one or multiple orders for batch actions.
- Action buttons: Open Order, Close Order (Profit/Loss/Buy/Sell/All), Edit Order, Delete Order, Delete Pending.

Layout:
- Use card layout, detailed tables for accounts and orders.
- Order columns: Account ID | Ticket | Type | Symbol | Volume | Open Price | SL | TP | EA | Comment | Profit | Status | Actions.
- Table supports search, filter, sort, multi-select for batch actions.
- Action buttons at top or end of each row for batch operations.

Visualization suggestions:
- Account status chart (balance/equity/profit/position/order).
- Timeline chart for order history.
- Bar chart for buy/sell volume.
- Summary chart for order status (open/closed).
- Profit/loss performance chart over time.
-->
<template>
  <v-container fluid>
    <!-- 1. Biểu đồ tổng quan hiệu suất -->
    <v-row class="mb-8">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Biểu đồ trạng thái tài khoản</v-card-title>
          <v-card-text>
            <BarChart :chart-data="accountChartData" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Biểu đồ khối lượng Buy/Sell</v-card-title>
          <v-card-text>
            <BarChart :chart-data="orderVolumeChartData" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Biểu đồ hiệu suất lời/lỗ</v-card-title>
          <v-card-text>
            <LineChart :chart-data="profitChartData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 2. Danh sách các tài khoản trade -->
    <v-card class="mb-8">
      <v-card-title class="d-flex justify-space-between align-center">
  <span>Trading Account Management</span>
  <v-btn color="primary" size="small">Add Account</v-btn>
      </v-card-title>
      <v-card-text>
        <v-table :items="accounts">
          <template #item.name="{ item }">{{ item.name }}</template>
          <template #item.status="{ item }">
            <v-chip :color="item.status === 'active' ? 'success' : 'grey'">{{ item.status }}</v-chip>
          </template>
          <template #item.balance="{ item }">{{ item.balance }}</template>
          <template #item.equity="{ item }">{{ item.equity }}</template>
          <template #item.profit="{ item }">{{ item.profit }}</template>
          <template #item.position="{ item }">{{ item.position }}</template>
          <template #item.orderCount="{ item }">{{ item.orderCount }}</template>
          <template #item.actions="{ item }">
            <v-btn icon size="small" color="success"><v-icon>mdi-toggle-switch</v-icon></v-btn>
            <v-btn icon size="small" color="error"><v-icon>mdi-delete</v-icon></v-btn>
          </template>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- 3. Danh sách các lệnh giao dịch -->
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
  <span>Trade Orders Management</span>
        <div class="d-flex flex-wrap">
          <v-btn color="primary" size="small" class="mr-2">Open Order</v-btn>
          <v-btn color="info" size="small" class="mr-2" :disabled="!selectedOrders.length">Close Profit</v-btn>
          <v-btn color="info" size="small" class="mr-2" :disabled="!selectedOrders.length">Close Lost</v-btn>
          <v-btn color="info" size="small" class="mr-2" :disabled="!selectedOrders.length">Close All</v-btn>
          <v-btn color="info" size="small" class="mr-2" :disabled="!selectedOrders.length">Delete Pending</v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-select v-model="filterAccount" :items="accounts.map(a => ({ title: a.name, value: a.id }))" label="Lọc theo tài khoản" dense style="max-width: 200px" class="mb-4" />
        <v-table :items="filteredOrders" item-key="ticket" show-select @update:selected="val => selectedOrders = val">
          <template #item.accountId="{ item }">{{ item.accountId }}</template>
          <template #item.ticket="{ item }">{{ item.ticket }}</template>
          <template #item.type="{ item }">
            <v-chip :color="item.type === 'buy' ? 'blue' : 'red'">{{ item.type }}</v-chip>
          </template>
          <template #item.symbol="{ item }">{{ item.symbol }}</template>
          <template #item.volume="{ item }">{{ item.volume }}</template>
          <template #item.openPrice="{ item }">{{ item.openPrice }}</template>
          <template #item.sl="{ item }">{{ item.sl ?? '-' }}</template>
          <template #item.tp="{ item }">{{ item.tp ?? '-' }}</template>
          <template #item.ea="{ item }">{{ item.ea ?? '-' }}</template>
          <template #item.comment="{ item }">{{ item.comment ?? '-' }}</template>
          <template #item.profit="{ item }">{{ item.profit ?? '-' }}</template>
          <template #item.status="{ item }">
            <v-chip :color="item.status === 'open' ? 'green' : 'grey'">{{ item.status }}</v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn icon size="small" color="error" title="Close Order"><v-icon>mdi-close-box</v-icon></v-btn>
            <v-btn icon size="small" color="warning" title="Delete Pending"><v-icon>mdi-clock-remove-outline</v-icon></v-btn>
            <v-btn icon size="small" color="info" title="Close Buy" v-if="item.type === 'buy'"><v-icon>mdi-arrow-up-bold-box</v-icon></v-btn>
            <v-btn icon size="small" color="info" title="Close Lost" v-if="item.profit < 0"><v-icon>mdi-cash-minus</v-icon></v-btn>
          </template>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Bar, Line } from 'vue-chartjs'

// Chart components
const BarChart = {
  props: ['chartData'],
  extends: Bar,
  mounted() {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false })
  }
}
const LineChart = {
  props: ['chartData'],
  extends: Line,
  mounted() {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false })
  }
}

// Mock data
const accounts = [
  { id: 101, name: 'Account 101', status: 'active', balance: 10000, equity: 10200, profit: 200, position: 2, orderCount: 5 },
  { id: 102, name: 'Account 102', status: 'active', balance: 5000, equity: 4800, profit: -200, position: 1, orderCount: 2 },
  { id: 103, name: 'Account 103', status: 'inactive', balance: 2000, equity: 2000, profit: 0, position: 0, orderCount: 0 },
  { id: 104, name: 'Account 104', status: 'active', balance: 15000, equity: 15500, profit: 500, position: 3, orderCount: 7 },
]

const orders = [
  { ticket: 1001, accountId: 101, type: 'buy', symbol: 'EURUSD', volume: 1, openPrice: 1.0850, sl: 1.0800, tp: 1.0900, ea: 'EA Pro', comment: 'Scalping', profit: 120, status: 'open' },
  { ticket: 1002, accountId: 101, type: 'sell', symbol: 'GBPUSD', volume: 2, openPrice: 1.2750, sl: 1.2800, tp: 1.2700, ea: 'EA Basic', comment: 'Swing', profit: -50, status: 'closed' },
  { ticket: 1003, accountId: 102, type: 'buy', symbol: 'USDJPY', volume: 0.5, openPrice: 156.20, sl: 155.50, tp: 157.00, ea: 'EA Pro', comment: 'Trend', profit: 30, status: 'open' },
  { ticket: 1004, accountId: 102, type: 'sell', symbol: 'AUDUSD', volume: 1, openPrice: 0.6850, sl: 0.6900, tp: 0.6800, ea: 'EA Basic', comment: 'Breakout', profit: 10, status: 'open' },
  { ticket: 1005, accountId: 104, type: 'buy', symbol: 'USDCHF', volume: 1.5, openPrice: 0.9050, sl: 0.9000, tp: 0.9100, ea: 'EA Pro', comment: 'Reversal', profit: 80, status: 'open' },
  { ticket: 1006, accountId: 104, type: 'sell', symbol: 'EURGBP', volume: 2, openPrice: 0.8550, sl: 0.8600, tp: 0.8500, ea: 'EA Basic', comment: 'Range', profit: -20, status: 'open' },
]

const filterAccount = ref(null)
const selectedOrders = ref([])

const filteredOrders = computed(() => {
  if (!filterAccount.value) return orders.filter(o => o.status === 'open')
  return orders.filter(o => o.accountId === filterAccount.value && o.status === 'open')
})

// Mock chart data
const accountChartData = {
  labels: accounts.map(a => a.name),
  datasets: [
    { label: 'Balance', backgroundColor: '#42a5f5', data: accounts.map(a => a.balance) },
    { label: 'Equity', backgroundColor: '#66bb6a', data: accounts.map(a => a.equity) },
    { label: 'Profit', backgroundColor: '#ffa726', data: accounts.map(a => a.profit) },
  ]
}

const orderVolumeChartData = {
  labels: ['Buy', 'Sell'],
  datasets: [
    {
      label: 'Volume',
      backgroundColor: ['#42a5f5', '#ef5350'],
      data: [orders.filter(o => o.type === 'buy').reduce((sum, o) => sum + o.volume, 0), orders.filter(o => o.type === 'sell').reduce((sum, o) => sum + o.volume, 0)]
    }
  ]
}

const profitChartData = {
  labels: orders.filter(o => o.status === 'open').map(o => o.symbol),
  datasets: [
    {
      label: 'Profit',
      borderColor: '#ffa726',
      backgroundColor: 'rgba(255,167,38,0.2)',
      fill: true,
      data: orders.filter(o => o.status === 'open').map(o => o.profit)
    }
  ]
}
</script>
