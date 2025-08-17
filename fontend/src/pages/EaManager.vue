<!--
Trang Quản lý EA (Expert Advisor)

Chức năng:
- Chỉ admin mới có quyền thêm, sửa, xóa, bật/tắt các EA trên hệ thống.
- Người dùng có thể thuê các EA do admin cung cấp để sử dụng cho tài khoản giao dịch của mình.
- Mỗi EA đều có thống kê hiệu suất hoạt động (lời/lỗ, tỷ lệ thắng, số lệnh, v.v.) và danh sách các tài khoản đã liên kết/đang sử dụng EA đó.
- Hỗ trợ các nút chức năng: thêm/sửa/xóa/bật tắt EA (chỉ admin), thuê/dừng thuê EA (người dùng), xem thống kê, liên kết tài khoản.

Cách trình bày:
- Sử dụng layout thẻ card cho từng EA, hiển thị thông tin chi tiết, nút chức năng phù hợp với quyền (admin hoặc user).
- Bảng thống kê hiệu suất, danh sách tài khoản liên kết đặt trong từng card EA.
- Các nút chức năng đặt ở đầu hoặc cuối card, phân quyền rõ ràng.

Đề xuất trực quan hóa:
- Biểu đồ hiệu suất hoạt động của từng EA (line chart, bar chart).
- Biểu đồ số lượng tài khoản liên kết theo từng EA.
- Bảng tổng hợp trạng thái thuê EA của người dùng.
-->
<template>
  <v-card>
    <v-card-title>Quản lý EA Robot</v-card-title>
    <v-card-text>
      <v-table :items="robots">
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'active' ? 'success' : 'error'">{{ item.status }}</v-chip>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { mockStrategies } from '@/mock/mockData'
const robots = mockStrategies.filter(s => s.type === 'EA').map(s => ({ id: s.id, name: s.name, status: s.status }))
</script>
