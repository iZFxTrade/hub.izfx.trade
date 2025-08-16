<template>
  <VContainer fluid class="landing-bg py-8">
    <!-- Hero Section -->
    <VRow class="justify-center mb-12">
      <VCol cols="12" md="8" class="text-center">
        <h1 class="display-2 font-weight-bold mb-4 text-primary">Professional Investment & Account Management Services</h1>
        <p class="lead mb-6">A platform for investment funds, copy trading, AI analytics, EA robot rental, and optimal account management for your performance.</p>
        <VBtn color="primary" size="large" class="elevation-2">Get Started</VBtn>
      </VCol>
    </VRow>

    <!-- Investment Packages Table -->
    <VRow class="mb-12">
      <VCol cols="12" class="text-center mb-6">
        <h2 class="font-weight-bold text-primary mb-2">Investment Fund Packages Comparison</h2>
        <p class="subtitle-1">Choose the package that fits your financial goals</p>
      </VCol>
      <VCol cols="12">
        <div class="compare-table-wrapper">
          <table class="compare-table">
            <thead>
              <tr>
                <th class="label-col"></th>
                <th v-for="pack in investmentPackages" :key="pack.name" :style="{color: pack.color}" class="package-header">
                  <div class="package-title">{{ pack.name }}</div>
                  <VBtn color="primary" size="small">Try Now</VBtn>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableRows" :key="row.label">
                <td class="label-cell">{{ row.label }}</td>
                <td v-for="pack in investmentPackages" :key="pack.name" class="package-cell">
                  <span v-html="pack[row.key]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </VCol>
    </VRow>

    <!-- Service Slide Section -->
    <div class="service-slide-wrapper mb-12">
      <div class="service-slide">
        <div
          v-for="(service, idx) in orderedServiceSlides"
          :key="service.title"
          :class="['service-circle', circleClass(idx)]"
          :style="serviceCircleStyle(idx)"
          @click="activeService = idx"
        >
          <div v-if="idx === 2" class="service-center-content">
            <div class="service-center-title">{{ service.title }}</div>
            <div class="service-center-desc">{{ service.desc }}</div>
            <VBtn :color="service.btnColor" size="small" class="glow-btn">Get Now</VBtn>
          </div>
          <div v-else class="service-side-content">
            <div class="service-title-small">{{ service.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Form Section -->
    <VRow class="justify-center">
      <VCol cols="12" md="6">
        <VCard class="elevation-2 py-6 px-4">
          <VCardTitle class="text-h5 font-weight-bold mb-2">Service Registration</VCardTitle>
          <VCardText>
            <VForm @submit.prevent="submitForm">
              <VRow>
                <VCol cols="12" md="6">
                  <VSelect
                    v-model="form.serviceType"
                    :items="serviceSlides.map(s => s.title).concat(['Investment Fund'])"
                    label="Service Type"
                    required
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VSelect
                    v-model="form.package"
                    :items="investmentPackages.map(p => p.name)"
                    label="Investment Package"
                    required
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.amount" label="Investment Amount" type="number" required />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.name" label="Full Name" required />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.phone" label="Phone Number" required />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.email" label="Email" type="email" required />
                </VCol>
                <VCol cols="12">
                  <VTextarea v-model="form.note" label="Note" rows="2" />
                </VCol>
                <VCol cols="12">
                  <VBtn color="primary" type="submit" size="large">Register</VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const investmentPackages = [
  {
    name: 'Pro', color: '#4CAF50',
    minFund: '2.000 $',
    monthlyProfit: '50%',
    maxDD: '50%',
    share: '50%',
    fee: '0%',
    minCommit: '1 month',
    profit1m: '1.000 $',
    profit3m: '3.000 $',
    profit6m: '6.000 $',
    profit1y: '12.000 $',
  },
  {
    name: 'Silver', color: '#2196F3',
    minFund: '5.000 $',
    monthlyProfit: '30%',
    maxDD: '30%',
    share: '30%',
    fee: '0%',
    minCommit: '2 months',
    profit1m: '1.500 $',
    profit3m: '4.500 $',
    profit6m: '9.000 $',
    profit1y: '18.000 $',
  },
  {
    name: 'Gold', color: '#FF9800',
    minFund: '10.000 $',
    monthlyProfit: '20%',
    maxDD: '20%',
    share: '20%',
    fee: '0.5%',
    minCommit: '3 months',
    profit1m: '2.000 $',
    profit3m: '6.000 $',
    profit6m: '12.000 $',
    profit1y: '24.000 $',
  },
  {
    name: 'Platinum', color: '#3F51B5',
    minFund: '20.000 $',
    monthlyProfit: '10%',
    maxDD: '10%',
    share: '10%',
    fee: '0.3%',
    minCommit: '6 months',
    profit1m: '2.000 $',
    profit3m: '6.000 $',
    profit6m: '12.000 $',
    profit1y: '24.000 $',
  },
  {
    name: 'Diamond', color: '#43A047',
    minFund: '50.000 $',
    monthlyProfit: '5%',
    maxDD: '5%',
    share: '5%',
    fee: '0.5%',
    minCommit: '12 months',
    profit1m: '2.500 $',
    profit3m: '7.500 $',
    profit6m: '15.000 $',
    profit1y: '30.000 $',
  },
]

const tableRows = [
  { label: 'Minimum Fund', key: 'minFund' },
  { label: 'Monthly Profit', key: 'monthlyProfit' },
  { label: 'Max Drawdown', key: 'maxDD' },
  { label: 'Profit Share', key: 'share' },
  { label: 'Management Fee', key: 'fee' },
  { label: 'Minimum Time', key: 'minCommit' },
  { label: 'Profit 1 Month', key: 'profit1m' },
  { label: 'Profit 3 Months', key: 'profit3m' },
  { label: 'Profit 6 Months', key: 'profit6m' },
  { label: 'Profit 1 Year', key: 'profit1y' },
]

const serviceSlides = [
  {
    title: 'Account Management',
    desc: 'Professional account management service, secure and efficient.',
    btnText: 'Manage Now',
    btnColor: 'warning',
    color: '#FFD600', // Metal
    bg: 'radial-gradient(circle at 60% 40%, #fffde4 0%, #ffd600 100%)',
    shadow: '0 0 32px 8px #ffd600, 0 0 0 6px #fffde4, 0 2px 12px rgba(0,0,0,0.07)',
  },
  {
    title: 'Trading Signals',
    desc: 'Receive high-quality trading signals from experts and AI.',
    btnText: 'Get Signals',
    btnColor: 'success',
    color: '#388E3C', // Wood
    bg: 'radial-gradient(circle at 60% 40%, #e8f5e9 0%, #388e3c 100%)',
    shadow: '0 0 32px 8px #388e3c, 0 0 0 6px #e8f5e9, 0 2px 12px rgba(0,0,0,0.07)',
  },
  {
    title: 'AI Analysis',
    desc: 'AI assistant for market trend analysis, forecasting, and strategy suggestions.',
    btnText: 'Try AI Analysis',
    btnColor: 'info',
    color: '#0288D1', // Water
    bg: 'radial-gradient(circle at 60% 40%, #e3f2fd 0%, #0288d1 100%)',
    shadow: '0 0 48px 16px #0288d1, 0 0 0 8px #e3f2fd, 0 4px 32px rgba(0,0,0,0.16)',
  },
  {
    title: 'EA Rental',
    desc: 'Rent automated trading robots, optimize performance and save management time.',
    btnText: 'Rent EA Robot',
    btnColor: 'deep-orange',
    color: '#FF7043', // Earthy Orange
    bg: 'radial-gradient(circle at 60% 40%, #ffe0b2 0%, #ff7043 100%)',
    shadow: '0 0 32px 12px #ff7043, 0 0 0 6px #ffe0b2, 0 2px 12px rgba(0,0,0,0.07)',
  },
  {
    title: 'Copy Trading',
    desc: 'Copy expert trades, automate investing and manage risk effectively.',
    btnText: 'Start Copy Trading',
    btnColor: 'brown',
    color: '#8D6E63', // Earth
    bg: 'radial-gradient(circle at 60% 40%, #efebe9 0%, #8d6e63 100%)',
    shadow: '0 0 32px 8px #8d6e63, 0 0 0 6px #efebe9, 0 2px 12px rgba(0,0,0,0.07)',
  },
]

const activeService = ref(2)

const orderedServiceSlides = computed(() => {
  const arr = []
  for (let i = -2; i <= 2; i++) {
    let idx = (activeService.value + i + serviceSlides.length) % serviceSlides.length
    arr.push(serviceSlides[idx])
  }
  return arr
})

function circleClass(idx) {
  if (idx === 2) return 'circle-center'
  if (idx === 1 || idx === 3) return 'circle-mid'
  return 'circle-small'
}

function serviceCircleStyle(idx) {
  const sizes = [100, 160, 260, 160, 100]
  const border = idx === 2 ? '4px solid #fff' : '2px solid #fff'
  return {
    background: orderedServiceSlides.value[idx].bg,
    width: sizes[idx] + 'px',
    height: sizes[idx] + 'px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 12px',
    boxShadow: orderedServiceSlides.value[idx].shadow,
    border,
    cursor: 'pointer',
    zIndex: idx === 2 ? 10 : 5 - Math.abs(idx - 2),
    transition: 'all 0.3s',
  }
}

let intervalId
onMounted(() => {
  intervalId = setInterval(() => {
    activeService.value = (activeService.value + 1) % serviceSlides.length
  }, 4000)
})
onUnmounted(() => {
  clearInterval(intervalId)
})

const form = ref({
  serviceType: '',
  package: '',
  amount: '',
  name: '',
  phone: '',
  email: '',
  note: '',
})

function submitForm() {
  alert('Registration successful!')
  form.value = { serviceType: '', package: '', amount: '', name: '', phone: '', email: '', note: '' }
}
</script>

<style scoped>
.landing-bg {
  background: linear-gradient(135deg, #e3e8f0 0%, #c3cfe2 100%);
}
.display-2 {
  font-size: 2.8rem;
}
.lead {
  font-size: 1.25rem;
  color: #555;
}
.compare-table-wrapper {
  overflow-x: auto;
  width: 100%;
}
.compare-table {
  border-collapse: collapse;
  width: 100%;
  min-width: 900px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.compare-table th, .compare-table td {
  border: 1px solid #eee;
  padding: 12px 8px;
  text-align: center;
  vertical-align: middle;
}
.compare-table th.label-col, .compare-table td.label-cell {
  background: #FFEB3B;
  font-weight: bold;
  color: #333;
  min-width: 160px;
}
.package-header {
  font-size: 1.1rem;
  font-weight: bold;
}
.package-title {
  margin-bottom: 8px;
}
.package-cell {
  min-width: 160px;
}
.service-slide-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  margin-bottom: 32px;
}
.service-slide {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}
.service-circle {
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  border: 2px solid #fff;
  font-weight: bold;
  color: #263238;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-center {
  font-size: 1.5rem;
  font-weight: bold;
  color: #263238;
  box-shadow: 0 0 48px 16px #fff, 0 0 32px 8px #ffd600, 0 0 0 8px #fffde4, 0 4px 32px rgba(0,0,0,0.16);
  animation: glow 2s infinite alternate;
}
@keyframes glow {
  0% { box-shadow: 0 0 48px 16px #fff, 0 0 32px 8px #ffd600, 0 0 0 8px #fffde4, 0 4px 32px rgba(0,0,0,0.16); }
  100% { box-shadow: 0 0 64px 32px #fff, 0 0 48px 16px #ffd600, 0 0 0 12px #fffde4, 0 8px 48px rgba(0,0,0,0.22); }
}
.circle-mid {
  font-size: 1.15rem;
  font-weight: bold;
  color: #263238;
}
.circle-small {
  font-size: 1rem;
  font-weight: bold;
  color: #263238;
}
.service-center-content {
  text-align: center;
  padding: 12px 8px;
}
.service-center-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}
.service-center-desc {
  font-size: 1.1rem;
  color: #263238;
  margin-bottom: 16px;
}
.glow-btn {
  box-shadow: 0 0 16px 4px #fff, 0 0 8px 2px #ffd600;
  font-weight: bold;
  animation: btn-glow 1.5s infinite alternate;
}
@keyframes btn-glow {
  0% { box-shadow: 0 0 16px 4px #fff, 0 0 8px 2px #ffd600; }
  100% { box-shadow: 0 0 32px 8px #fff, 0 0 16px 4px #ffd600; }
}
.service-side-content {
  text-align: center;
  padding: 8px 0;
}
.service-title-small {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 4px;
}
</style>
