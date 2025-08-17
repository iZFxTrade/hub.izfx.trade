<!--
+Trang Quản lý Chiến lược Đáng Sao Chép
+
+Chức năng:
+- Hiển thị các chiến lược giao dịch của người dùng (bao gồm chiến lược do họ tạo ra hoặc đang sao chép từ người khác).
+- Cung cấp thông tin: tên chiến lược, mô tả, hiệu suất, số lượng người sao chép, trạng thái, quyền admin.
+- Có nút Add để thêm chiến lược mới (chỉ admin/mod/kol được phép).
+- Investor được phép thêm tài khoản giao dịch mới để quản lý lệnh hoặc sao chép một chiến lược.
+- Trader chỉ được thêm tài khoản giao dịch để quản lý lệnh, không được phép copy hoặc tạo chiến lược mới.
+
+Cách trình bày:
+- Sử dụng layout dạng thẻ (card) để tạo sự tập trung và nổi bật.
+- Bảng dữ liệu gồm các cột: Tên | Mô tả | Hiệu suất | Người sao chép | Trạng thái | Admin.
+- Bảng nằm trong thẻ card, dễ nhìn, dễ thao tác.
+- Các nút chức năng (Add, Copy, Quản lý lệnh, ...) hiển thị tùy theo quyền của từng loại người dùng.
+
+Đề xuất trực quan hóa:
+- Thêm biểu đồ đường (line chart) thể hiện lịch sử hiệu suất của các chiến lược.
+- Biểu đồ cột so sánh số lượng người sao chép giữa các chiến lược.
+- Biểu đồ tròn thể hiện tỷ lệ trạng thái (active/inactive).
-->
<template>
  <v-card>
    <v-card-title>Quản lý chiến lược đáng sao chép</v-card-title>
    <v-card-text>
      <v-table :items="copyStrategies">
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
        <template #item.admin="{ item }">
          <v-badge v-if="item.admin" color="error">Admin</v-badge>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { mockStrategies } from '@/mock/mockData'
const copyStrategies = mockStrategies.map(s => ({
  ...s,
  description: s.description ?? 'Chiến lược nổi bật nên sao chép.',
  performance: s.performance ?? (Math.random()*20+5).toFixed(2),
  copiers: s.copiers ?? Math.floor(Math.random()*100),
  status: s.status ?? (Math.random() > 0.2 ? 'active' : 'inactive'),
  admin: s.admin ?? (Math.random() > 0.7),
}))
</script>
