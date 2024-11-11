# Seller Flow

### 1. Đăng Ký Seller

- **Bắt đầu**: Người dùng nhấn vào nút **"Register to Seller"**.
- **Điền thông tin**: Người dùng nhập thông tin cần thiết để trở thành seller, bao gồm:
  - **Thông tin thẻ tín dụng (Credit Card)**.
  - **Thông tin shop (Shop Info)**.
- **Chuyển hướng**: Sau khi đăng ký thành công, người dùng được chuyển đến **Dashboard** của Seller.

### 2. Seller Layout - Thanh Điều Hướng Chính

Gồm 5 trang chính, hỗ trợ seller quản lý hiệu quả các hoạt động kinh doanh:

#### a. Dashboard

- Trang tổng quan cung cấp cái nhìn nhanh về hoạt động kinh doanh và các thông số chính của shop.

#### b. Order Management (Quản lý Đơn hàng)

- **Xem chi tiết đơn hàng (Order Detail)**: Cho phép xem chi tiết đơn hàng.
- **Xóa đơn hàng**: Chỉ có thể xóa đơn khi trạng thái là **isCancel**.
- **Tìm kiếm đơn hàng**:
  - Theo **Customer Name**.
  - Theo **Product Name**.

#### c. Shop Management (Quản lý Shop)

- **Quản lý giao diện Shop**: Seller tùy chỉnh giao diện shop để phù hợp phong cách kinh doanh.
- **Preview ShopOwnerDetail**: Giao diện xem trước layout hiển thị cho khách hàng khi xem **ShopOwnerDetail** từ phía buyer.
- **Bảng nhập thông tin bên phải**: Cho phép seller nhập và chỉnh sửa:
  - **Shop Info**: Thông tin về shop.
  - **Product**: Sản phẩm bán tại shop.
  - **Event**: Các sự kiện mà shop tham gia hoặc tổ chức.

#### d. Product Management (Quản lý Sản phẩm)

- **CRUD sản phẩm**: Tạo mới, chỉnh sửa, xóa và xem sản phẩm.
- **Chuyển trạng thái**: Chỉnh **status** của sản phẩm từ **active** sang **inactive** để ẩn khỏi shop.
- **Live Preview sản phẩm**: Xem trước sản phẩm ở chế độ của người mua với tùy chọn xem **productDetail**.
- **Tìm kiếm sản phẩm**:
  - Theo **Product Name**.

#### e. Post Management (Quản lý Bài đăng)

- **Quản lý sự kiện**: Hiển thị danh sách sự kiện.
- **Đính kèm sản phẩm**: Đính kèm sản phẩm vào sự kiện để tạo bài đăng hoàn chỉnh.

### 3. Profile Setting (Cài đặt Hồ Sơ)

- Cập nhật lại thông tin seller khi cần.
