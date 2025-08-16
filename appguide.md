Tuyệt vời, để AI Agent của Cursor có thể hiểu và thực hiện dự án một cách hiệu quả, tôi sẽ tổng hợp toàn bộ thông tin đã thảo luận thành một file `README.md` hoàn chỉnh. File này sẽ cung cấp một cái nhìn tổng quan, hướng dẫn chi tiết và cấu trúc dự án rõ ràng.

-----

# TradeHub - Nền tảng quản lý giao dịch tài chính đa nền tảng

TradeHub là một nền tảng web hiện đại cho phép người dùng quản lý và tự động hóa các tài khoản giao dịch trên nhiều nền tảng (MT4, MT5, Ctrader) từ một giao diện duy nhất. Dự án này được thiết kế với kiến trúc serverless, sử dụng các công nghệ tiên tiến để đảm bảo hiệu suất, khả năng mở rộng và tính đồng bộ theo thời gian thực.

## 1\. Tính năng cốt lõi

  * **Dashboard toàn diện**: Hiển thị các chỉ số hiệu suất, số dư và lịch sử giao dịch.
  * **Hệ thống phân quyền**: Hỗ trợ 5 vai trò (Admin, Mod, Strategist, Trader, Investor) với các quyền hạn riêng biệt.
  * **Quản lý lệnh tập trung**: Thực hiện các lệnh **(mở/đóng/sửa/xóa)** trên nhiều tài khoản cùng lúc.
  * **Copy Trading**: Cho phép sao chép tín hiệu giao dịch từ các chiến lược được tạo bởi **Strategist**.
  * **Đồng bộ Realtime**: Cập nhật dữ liệu từ các nền tảng giao dịch một cách tức thì.
  * **Cảnh báo Telegram**: Gửi thông báo tự động về các sự kiện giao dịch qua Telegram.
  * **Chat AI**: Tích hợp AI để hỗ trợ phân tích thị trường và dữ liệu.

## 2\. Kiến trúc hệ thống

TradeHub được xây dựng trên một kiến trúc ba lớp:

| Lớp | Công Nghệ | Vai Trò |
| :--- | :--- | :--- |
| **Frontend** | **VueJS**, **Sneat Vuetify Admin Template** | Giao diện người dùng tương tác, được triển khai trên **Firebase Hosting**. |
| **Backend** | **Supabase** (PostgreSQL, Auth, Edge Functions) | Database chính, hệ thống xác thực, và logic serverless. |
| **Middleware** | **Supabase Edge Functions**\<br\>**MT4/MT5 Expert Advisors (EA)** | Cầu nối giữa Supabase và các nền tảng giao dịch (Ctrader API, MT4/MT5). |

## 3\. Hướng dẫn triển khai cho AI Agent

### Giai đoạn 1: Chuẩn bị môi trường

1.  **Thiết lập Supabase**:

      * Tạo dự án mới trên Supabase.
      * Ghi lại **Project URL** và **anon key**.
      * Sử dụng Supabase CLI để tạo schema database với các bảng: `users`, `trading_accounts`, `strategies`, `copy_signals`, `trading_signals`.
      * Kích hoạt tính năng **Realtime** cho các bảng chính.

2.  **Cấu hình Firebase**:

      * Tạo dự án mới trên Firebase.
      * Cài đặt Firebase CLI và đăng nhập.

3.  **Chuẩn bị API**:

      * Lấy **API Key của OpenAI/Google Gemini** cho tính năng chat AI.
      * Lấy **Bot Token của Telegram** cho tính năng cảnh báo.

### Giai đoạn 2: Phát triển Frontend

1.  **Clone Frontend Template**:
    ```bash
    git clone https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free.git tradehub-frontend
    cd tradehub-frontend
    npm install
    ```
2.  **Cấu hình kết nối**:
      * Tạo file `.env` và thêm các biến môi trường sau:
        ```env
        VITE_SUPABASE_URL="[YOUR_SUPABASE_URL]"
        VITE_SUPABASE_ANON_KEY="[YOUR_SUPABASE_ANON_KEY]"
        ```
3.  **Phát triển giao diện**:
      * Sử dụng VueJS để xây dựng các trang tương ứng với các tính năng đã mô tả. Tích hợp SDK Supabase để xử lý xác thực và truy vấn dữ liệu.

### Giai đoạn 3: Phát triển Backend và Middleware

1.  **Phát triển Edge Functions (Supabase)**:

      * Sử dụng Supabase CLI để tạo và triển khai các hàm Edge Functions (bằng TypeScript).
      * Các hàm chính cần phát triển: `execute-order`, `ctrader-webhook-listener`, `copy-trade-processor`, `telegram-alert-sender`, `ai-chat-handler`.
      * Lưu các API Key nhạy cảm **(Ctrader, Telegram, OpenAI/Gemini)** dưới dạng **Secrets** trong Supabase.

2.  **Triển khai EA cho MT4/MT5**:

      * Viết EA bằng MQL4/MQL5 có khả năng kết nối và đồng bộ dữ liệu với Supabase.
      * Cài đặt và chạy EA trên các VPS đã có các tài khoản MT4/MT5.

### Giai đoạn 4: Triển khai và Vận hành

1.  **Triển khai Frontend**:

      * Build dự án VueJS: `npm run build`.
      * Deploy lên Firebase Hosting: `firebase deploy`.

2.  **Triển khai Edge Functions**:

      * Sử dụng Supabase CLI để triển khai các hàm đã viết.
      * Cấu hình Webhooks trên Supabase để kích hoạt các hàm Edge Functions khi có sự kiện database.

3.  **Hoàn thiện tích hợp**:

      * Cấu hình Webhooks trên Ctrader để gửi thông báo đến các Edge Function tương ứng.

## 4\. Lưu trữ thông tin nhạy cảm

| Loại thông tin | Vị trí lưu trữ | Lý do |
| :--- | :--- | :--- |
| **Supabase URL/Anon Key** | `.env` trên frontend | Cần thiết để frontend kết nối, không quá nhạy cảm. |
| **API Keys (Ctrader, Telegram, AI)** | **Supabase Edge Functions Secrets** | Thông tin tuyệt mật, cần được lưu ở backend. |
| **Credentials MT4/MT5** | **Bảng `trading_accounts`** (đã mã hóa) | Cần thiết để EA kết nối, phải được bảo mật. |

Firebase App 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAACqwHGgdC2MnsLp7jpqppQe87V1zkIWY",
  authDomain: "izfx-trade.firebaseapp.com",
  projectId: "izfx-trade",
  storageBucket: "izfx-trade.firebasestorage.app",
  messagingSenderId: "465840607288",
  appId: "1:465840607288:web:2ef08b8d8a992e04f816cd",
  measurementId: "G-E49EDL5ZG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);