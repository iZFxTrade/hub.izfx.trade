<script setup lang="ts">
import { useTheme } from 'vuetify'
import { hexToRgb } from '@core/utils/colorConverter'

const vuetifyTheme = useTheme()

const series = [45, 80, 20, 40]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  const secondaryTextColor = `rgba(${hexToRgb(String(currentTheme['on-surface']))},${variableTheme['medium-emphasis-opacity']})`
  const primaryTextColor = `rgba(${hexToRgb(String(currentTheme['on-surface']))},${variableTheme['high-emphasis-opacity']})`

  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: {
      width: 6,
      colors: [currentTheme.surface],
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: ['KingFund', 'TradeKiemCom', 'KDFund', 'BlueFx'],
    colors: [
      currentTheme.success,
      currentTheme.primary,
      currentTheme.secondary,
      currentTheme.info,
    ],
    grid: {
      padding: {
        top: -7,
        bottom: 5,
      },
    },
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              offsetY: 17,
              fontSize: '13px',
              color: secondaryTextColor,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -17,
              fontSize: '18px',
              color: primaryTextColor,
              fontFamily: 'Public Sans',
              fontWeight: 500,
            },
            total: {
              show: true,
              label: 'Weekly',
              fontSize: '13px',
              lineHeight: '18px',
              formatter: () => '130.2%',
              color: secondaryTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
    },
  }
})

const orders = [
  {
    amount: '+1253.72%',
    title: 'TradeKiemCom',
    avatarColor: 'primary',
    subtitle: 'Gold & Forex Trading',
    avatarIcon: 'bx-bar-chart-alt-2',
  },
  {
    amount: '+196.61%',
    title: 'KingFund',
    avatarColor: 'success',
    subtitle: 'High Performance Fund',
    avatarIcon: ' bx-award',
  },
  {
    amount: '+127.26%',
    title: 'BlueFx',
    avatarColor: 'info',
    subtitle: 'Gold, Forex, Crypto',
    avatarIcon: 'bx-globe',
  },
  {
    amount: '+104.8%',
    title: 'KDFund',
    avatarColor: 'secondary',
    subtitle: 'Gold Trading Safety',
    avatarIcon: 'bx-anchor',
  },
]

const moreList = [
  { title: 'Share', value: 'Share' },
  { title: 'Refresh', value: 'Refresh' },
  { title: 'Update', value: 'Update' },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
      Strategy Statistics
      </VCardTitle>
      <VCardSubtitle>+27633.0% Grow Up</VCardSubtitle>

      <template #append>
        <MoreBtn :menu-list="moreList" />
      </template>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center justify-space-between mb-6">
        <div class="">
          <h3 class="text-h3 mb-1">
            8,258
          </h3>
          <div class="text-caption text-medium-emphasis">
            Total Orders
          </div>
        </div>

        <div>
          <VueApexCharts
            type="donut"
            :height="120"
            width="100"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>

      <VList class="card-list">
        <VListItem
          v-for="order in orders"
          :key="order.title"
        >
          <template #prepend>
            <VAvatar
              size="40"
              rounded
              variant="tonal"
              :color="order.avatarColor"
            >
              <VIcon :icon="order.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ order.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-body-2">
            {{ order.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <span>{{ order.amount }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.card-list {
  --v-card-list-gap: 1.25rem;
}
</style>
