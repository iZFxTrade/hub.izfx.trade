<template>
  <VContainer fluid class="landing-bg py-8">
    <!-- Hero Section -->
    <VRow class="justify-center mb-12">
      <VCol cols="12" md="8" class="text-center">
        <h1 class="display-2 font-weight-bold mb-4 text-primary">Dịch vụ Đầu tư & Quản lý tài khoản chuyên nghiệp</h1>
        <p class="lead mb-6">Nền tảng quỹ đầu tư, copy trading, AI phân tích, cho thuê robot EA, quản lý tài khoản tối ưu hóa hiệu suất cho bạn.</p>
        <VBtn color="primary" size="large" class="elevation-2">Đăng ký ngay</VBtn>
      </VCol>
    </VRow>

    <!-- Investment Packages Table -->
    <VRow class="mb-12">
      <VCol cols="12" class="text-center mb-6">
        <h2 class="font-weight-bold text-primary mb-2">Bảng so sánh các gói Quỹ đầu tư</h2>
        <p class="subtitle-1">Chọn gói phù hợp với mục tiêu tài chính của bạn</p>
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
          <VCardTitle class="text-h5 font-weight-bold mb-2">Đăng ký dịch vụ</VCardTitle>
          <VCardText>
            <VForm @submit.prevent="submitForm">
              <VRow>
                <VCol cols="12" md="6">
                  <VSelect
                    v-model="form.serviceType"
                    :items="serviceSlides.map(s => s.title).concat(['Quỹ đầu tư'])"
                    label="Loại dịch vụ"
                    required
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VSelect
                    v-model="form.package"
                    :items="investmentPackages.map(p => p.name)"
                    label="Gói dịch vụ đầu tư"
                    required
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.amount" label="Số tiền đầu tư" type="number" required />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.name" label="Tên khách hàng" required />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.phone" label="Số điện thoại" required />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField v-model="form.email" label="Email" type="email" required />
                </VCol>
                <VCol cols="12">
                  <VTextarea v-model="form.note" label="Ghi chú" rows="2" />
                </VCol>
                <VCol cols="12">
                  <VBtn color="primary" type="submit" size="large">Đăng ký</VBtn>
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
    minFund: '2.000',
    monthlyProfit: '50%',
    maxDD: '50%',
    share: '50%',
    fee: '0%',
    minCommit: 'Không',
    profit1m: '1.000',
    profit3m: '3.000',
    profit6m: '6.000',
    profit1y: '12.000',
    share1m: '500',
    share3m: '1.500',
    share6m: '3.000',
    share1y: '6.000',
    balance1m: '2.500',
    balance3m: '3.500',
    balance6m: '5.000',
    balance1y: '8.000',
  },
  {
    name: 'Silver', color: '#2196F3',
    minFund: '5.000',
    monthlyProfit: '30%',
    maxDD: '30%',
    share: '30%',
    fee: '0%',
    minCommit: 'Không',
    profit1m: '1.500',
    profit3m: '4.500',
    profit6m: '9.000',
    profit1y: '18.000',
    share1m: '450',
    share3m: '1.350',
    share6m: '2.700',
    share1y: '5.400',
    balance1m: '6.050',
    balance3m: '8.150',
    balance6m: '11.300',
    balance1y: '17.600',
  },
  {
    name: 'Gold', color: '#FF9800',
    minFund: '10.000',
    monthlyProfit: '20%',
    maxDD: '20%',
    share: '20%',
    fee: '0,5%',
    minCommit: 'Không',
    profit1m: '2.000',
    profit3m: '6.000',
    profit6m: '12.000',
    profit1y: '24.000',
    share1m: '450',
    share3m: '1.350',
    share6m: '2.700',
    share1y: '5.400',
    balance1m: '11.550',
    balance3m: '14.650',
    balance6m: '19.300',
    balance1y: '28.600',
  },
  {
    name: 'Platinum', color: '#3F51B5',
    minFund: '20.000',
    monthlyProfit: '10%',
    maxDD: '10%',
    share: '10%',
    fee: '0,3%',
    minCommit: 'Không',
    profit1m: '2.000',
    profit3m: '6.000',
    profit6m: '12.000',
    profit1y: '24.000',
    share1m: '250',
    share3m: '750',
    share6m: '1.500',
    share1y: '3.000',
    balance1m: '21.750',
    balance3m: '25.250',
    balance6m: '30.500',
    balance1y: '41.000',
  },
  {
    name: 'Diamond', color: '#43A047',
    minFund: '50.000',
    monthlyProfit: '5%',
    maxDD: '5%',
    share: '5%',
    fee: '0,5%',
    minCommit: 'Không',
    profit1m: '2.500',
    profit3m: '7.500',
    profit6m: '15.000',
    profit1y: '30.000',
    share1m: '375',
    share3m: '1.125',
    share6m: '2.250',
    share1y: '4.500',
    balance1m: '52.125',
    balance3m: '56.375',
    balance6m: '62.750',
    balance1y: '75.500',
  },
]

const tableRows = [
  { label: 'Vốn tối thiểu', key: 'minFund' },
  { label: 'Lợi nhuận hàng tháng', key: 'monthlyProfit' },
  { label: 'Drawdown tối đa', key: 'maxDD' },
  { label: 'Lợi nhuận chia sẻ', key: 'share' },
  { label: 'Phí quản lý tài khoản', key: 'fee' },
  { label: 'Thời gian cam kết tối thiểu', key: 'minCommit' },
  { label: 'Ước tính lợi nhuận sau 1 tháng', key: 'profit1m' },
  { label: 'Ước tính lợi nhuận sau 3 tháng', key: 'profit3m' },
  { label: 'Ước tính lợi nhuận sau 6 tháng', key: 'profit6m' },
  { label: 'Ước tính lợi nhuận sau 1 năm', key: 'profit1y' },
]

const serviceSlides = [
  {
    title: 'Quản lý tài khoản',
    desc: 'Dịch vụ quản lý tài khoản chuyên nghiệp, bảo mật và hiệu quả.',
    color: '#FFD600', // Kim
    bg: 'linear-gradient(135deg, #fffde4 0%, #ffd600 100%)',
    shadow: '0 0 0 6px #fffde4, 0 2px 12px rgba(0,0,0,0.07)',
  },
  {
    title: 'Tín hiệu giao dịch',
    desc: 'Nhận tín hiệu giao dịch chất lượng cao từ chuyên gia và AI.',
    color: '#388E3C', // Mộc
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #388e3c 100%)',
    shadow: '0 0 0 6px #e8f5e9, 0 2px 12px rgba(0,0,0,0.07)',
  },
  {
    title: 'Trợ lý phân tích A.I',
    desc: 'AI hỗ trợ phân tích xu hướng, dự báo và đề xuất chiến lược đầu tư tối ưu.',
    color: '#0288D1', // Thủy
    bg: 'linear-gradient(135deg, #e3f2fd 0%, #0288d1 100%)',
    shadow: '0 0 0 8px #e3f2fd, 0 4px 32px rgba(0,0,0,0.16)',
  },
  {
    title: 'Cho thuê EA Robot',
    desc: 'Thuê robot giao dịch tự động, tối ưu hóa hiệu suất và tiết kiệm thời gian quản lý.',
    color: '#D32F2F', // Hỏa
    bg: 'linear-gradient(135deg, #ffebee 0%, #d32f2f 100%)',
    shadow: '0 0 0 6px #ffebee, 0 2px 12px rgba(0,0,0,0.07)',
  },
  {
    title: 'Social Copy Trading',
    desc: 'Sao chép giao dịch chuyên gia, tự động hóa đầu tư và quản lý rủi ro hiệu quả.',
    color: '#8D6E63', // Thổ
    bg: 'linear-gradient(135deg, #efebe9 0%, #8d6e63 100%)',
    shadow: '0 0 0 6px #efebe9, 0 2px 12px rgba(0,0,0,0.07)',
  },
]

const activeService = ref(2) // hình tròn ở giữa mặc định là AI

const orderedServiceSlides = computed(() => {
  // Đảm bảo thứ tự: 2 hình nhỏ trái, hình lớn giữa, 2 hình nhỏ phải
  const arr = []
  for (let i = -2; i <= 2; i++) {
    let idx = (activeService.value + i + serviceSlides.length) % serviceSlides.length
    arr.push(serviceSlides[idx])
  }
  return arr
})

function circleClass(idx) {
  // 0,4 nhỏ nhất; 1,3 trung bình; 2 lớn nhất
  if (idx === 2) return 'circle-center'
  if (idx === 1 || idx === 3) return 'circle-mid'
  return 'circle-small'
}

function serviceCircleStyle(idx) {
  // Blend màu, kích thước, viền, bóng
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

// Tự động chuyển dịch vụ trung tâm sau 4 giây
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
  alert('Đăng ký thành công!')
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
.why-section {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 32px 0;
}
.service-card {
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  background: #fff;
  transition: box-shadow 0.2s;
  min-height: 320px;
  margin-bottom: 24px;
}
.service-card:hover {
  box-shadow: 0 4px 32px rgba(0,0,0,0.16);
}
</style>
