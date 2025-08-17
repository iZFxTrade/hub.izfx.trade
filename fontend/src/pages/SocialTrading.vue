<!--
+Trang SocialTrading - Quản lý danh sách chiến lược giao dịch xã hội
+
+Chức năng:
+- Hiển thị tất cả các chiến lược giao dịch của toàn bộ người dùng trên hệ thống, cho phép người dùng khác sao chép tự động.
+- Cung cấp thông tin: tên chiến lược, mô tả, hiệu suất, số lượng người sao chép, trạng thái, nhãn Pro.
+
+Cách trình bày:
+- Sử dụng layout dạng thẻ card, bảng dữ liệu rõ ràng.
+- Các cột: Tên | Mô tả | Hiệu suất | Người sao chép | Trạng thái | Pro.
+
+Đề xuất trực quan hóa:
+- Biểu đồ leaderboard (bar ngang) cho các chiến lược hiệu suất cao nhất.
+- Biểu đồ donut thể hiện tỷ lệ chiến lược Pro.
+- Thêm sparkline nhỏ trong bảng cho hiệu suất gần đây của từng chiến lược.
-->
<template>
  <v-card>
    <v-card-title>SocialTrading - Quản lý danh sách chiến lược</v-card-title>
    <v-card-text>
      <v-table :items="strategies">
        <template #item.name="{ item }">
          {{ item.name }}
        </template>
        <template #item.description="{ item }">
          {{ item.description }}
        </template>
        <template #item.performance="{ item }">
          <v-chip color="success">{{ item.performance }}%</v-chip>
        </template>
        <template #item.copiers="{ item }">
          {{ item.copiers }}
        </template>
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'active' ? 'green' : 'grey'">{{ item.status }}</v-chip>
        </template>
        <template #item.pro="{ item }">
          <v-badge v-if="item.pro" color="primary">Pro</v-badge>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { mockStrategies } from '@/mock/mockData'
const strategies = mockStrategies.map(s => ({
  ...s,
  description: s.description ?? 'Chiến lược giao dịch hiệu quả.',
  performance: s.performance ?? (Math.random()*20+5).toFixed(2),
  copiers: s.copiers ?? Math.floor(Math.random()*100),
  status: s.status ?? (Math.random() > 0.2 ? 'active' : 'inactive'),
}))
</script>
