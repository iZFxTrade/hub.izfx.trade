
<script setup lang="ts">
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'
import AnalyticsProfitReport from '@/views/dashboard/AnalyticsProfitReport.vue'
import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'
import { mockTraderAccounts, mockStrategies, mockTradeOrders, mockReports } from '@/mock/mockData'
import { currentUser, isLoggedIn } from '@/mock/mockAuth'
import chart from '@images/cards/chart-success.png'
import card from '@images/cards/credit-card-primary.png'
import paypal from '@images/cards/paypal-error.png'
import wallet from '@images/cards/wallet-info.png'

// Lấy dữ liệu của user đang đăng nhập
const userAccounts = mockTraderAccounts.filter(acc => acc.userId === currentUser.id)
const userStrategies = mockStrategies.filter(strat => strat.ownerId === currentUser.id)
const userOrders = mockTradeOrders.filter(order => userAccounts.some(acc => acc.id === order.accountId))
const userReport = mockReports.find(r => r.userId === currentUser.id)
</script>

<template>
  <div v-if="isLoggedIn()">
    <VRow>
      <!-- 👉 Congratulations -->
      <VCol cols="12" md="8">
        <AnalyticsCongratulations />
      </VCol>

      <VCol cols="12" sm="4">
        <VRow>
          <!-- 👉 Profit (user) -->
          <VCol cols="12" md="6">
            <CardStatisticsVertical
              v-bind="{
                title: 'Profit',
                image: chart,
                stats: userReport?.profit ? `$${userReport.profit.toLocaleString()}` : '$0',
                change: 0,
              }"
            />
          </VCol>
          <!-- 👉 Sales (tổng số tài khoản) -->
          <VCol cols="12" md="6">
            <CardStatisticsVertical
              v-bind="{
                title: 'Accounts',
                image: wallet,
                stats: userAccounts.length,
                change: 0,
              }"
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Total Revenue (có thể custom lại cho user) -->
      <VCol cols="12" md="8" order="2" order-md="1">
        <AnalyticsTotalRevenue />
      </VCol>

      <VCol cols="12" sm="8" md="4" order="1" order-md="2">
        <VRow>
          <!-- 👉 Payments (số chiến lược) -->
          <VCol cols="12" sm="6">
            <CardStatisticsVertical
              v-bind="{
                title: 'Strategies',
                image: paypal,
                stats: userStrategies.length,
                change: 0,
              }"
            />
          </VCol>
          <!-- 👉 Revenue (số lệnh giao dịch) -->
          <VCol cols="12" sm="6">
            <CardStatisticsVertical
              v-bind="{
                title: 'Orders',
                image: card,
                stats: userOrders.length,
                change: 0,
              }"
            />
          </VCol>
        </VRow>
        <VRow>
          <!-- 👉 Profit Report -->
          <VCol cols="12" sm="12">
            <AnalyticsProfitReport />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Order Statistics -->
      <VCol cols="12" md="4" sm="6" order="3">
        <AnalyticsOrderStatistics />
      </VCol>

      <!-- 👉 Tabs chart -->
      <VCol cols="12" md="4" sm="6" order="3">
        <AnalyticsFinanceTabs />
      </VCol>

      <!-- 👉 Transactions -->
      <VCol cols="12" md="4" sm="6" order="3">
        <AnalyticsTransactions />
      </VCol>
    </VRow>
  </div>
  <div v-else class="d-flex flex-column align-center justify-center" style="height: 300px;">
    <h3>Bạn cần đăng nhập để xem trang này.</h3>
    <RouterLink to="/login">
      <v-btn color="primary">Đăng nhập</v-btn>
    </RouterLink>
  </div>
</template>
