# Tài Liệu Đặc Tả Tổng Thể Dự Án Website Xổ Số Việt Nam

Phiên bản: 1.0
Ngày lập: 08/10/2026
Trạng thái: Bản đặc tả định hướng để làm cơ sở phân tích, thiết kế và triển khai

1. TỔNG QUAN DỰ ÁN

1.1. Mục tiêu

Xây dựng một website tra cứu xổ số Việt Nam có kiến trúc module hóa, dễ mở rộng, dễ kiểm thử, dễ vận hành và có khả năng tích hợp nhiều nguồn dữ liệu. Hệ thống phục vụ tra cứu kết quả xổ số, lịch mở thưởng, dò vé, thống kê lịch sử, nội dung hướng dẫn và các chức năng cá nhân hóa tùy chọn.

Phạm vi mặc định là website thông tin và tra cứu kết quả. Không mặc định bao gồm bán vé, nhận tiền, đặt cược, ví tiền, thanh toán hoặc tổ chức hoạt động cờ bạc. Mọi tính năng thuộc phạm vi đó phải được xem xét riêng về pháp lý, giấy phép, an toàn và tuân thủ trước khi triển khai.

1.2. Mục tiêu chính

- Hiển thị kết quả xổ số theo ngày, miền, tỉnh/thành, đài và loại hình.
- Quản lý lịch mở thưởng và lịch sử kết quả.
- Hỗ trợ dò vé theo đúng quy tắc của từng loại xổ số.
- Cung cấp thống kê lịch sử có thể kiểm chứng và tái tính toán.
- Thu thập dữ liệu tự động từ nguồn được phép sử dụng, đồng thời hỗ trợ nhập liệu thủ công.
- Kiểm tra, đối soát và phê duyệt dữ liệu trước khi công bố.
- Cung cấp giao diện người dùng responsive và Admin Dashboard.
- Có logging, audit, cảnh báo, backup, bảo mật và quy trình triển khai.
- Cho phép bổ sung nguồn dữ liệu, loại hình xổ số và tính năng mới mà không phải viết lại toàn hệ thống.

1.3. Nguyên tắc kiến trúc

- Module hóa theo nghiệp vụ và ranh giới trách nhiệm.
- Ưu tiên Modular Monolith cho backend ban đầu; chỉ tách dịch vụ khi có lý do thực tế.
- Tách domain logic khỏi framework, database và nhà cung cấp bên ngoài.
- Dữ liệu kết quả gốc là nguồn dữ liệu chuẩn; thống kê là dữ liệu dẫn xuất.
- Không công bố dữ liệu chưa xác minh hoặc dữ liệu bất thường.
- Không ghi đè âm thầm kết quả đã công bố.
- Các tác vụ nền phải có retry, idempotency, quan sát trạng thái và khả năng chạy lại an toàn.
- Tất cả thao tác nhạy cảm phải có phân quyền và audit log.
- Kiểm thử, bảo mật, tài liệu và khả năng phục hồi là yêu cầu xuyên suốt.
- Không tối ưu hạ tầng quá sớm khi chưa có số liệu tải và benchmark.

2. NGƯỜI DÙNG VÀ VAI TRÒ

2.1. Khách truy cập
- Xem kết quả, lịch mở thưởng và lịch sử.
- Dò vé và xem thống kê công khai.
- Tìm kiếm, chia sẻ, sao chép hoặc in dữ liệu.
- Đọc bài viết, hướng dẫn và chính sách.

2.2. Thành viên
- Có tất cả chức năng công khai.
- Lưu tỉnh/thành, đài hoặc loại hình yêu thích.
- Lưu bộ lọc thống kê.
- Xem lịch sử dò vé nếu chủ động bật tính năng.
- Quản lý thông báo và tùy chọn cá nhân.

2.3. Nhân viên nhập liệu
- Nhập hoặc chỉnh sửa dữ liệu trong phạm vi được cấp quyền.
- Xem dữ liệu thô, trạng thái thu thập và lỗi xác thực.
- Không mặc nhiên có quyền phê duyệt hoặc công bố dữ liệu.

2.4. Nhân viên xác minh
- Xem các kết quả chờ xác minh.
- Đối chiếu nguồn, xử lý sai lệch và ghi lý do.
- Phê duyệt theo quyền được cấp.

2.5. Biên tập viên
- Quản lý bài viết, danh mục, thẻ, hình ảnh và nội dung SEO.
- Có thể cần quy trình duyệt trước khi xuất bản.

2.6. Quản trị viên
- Quản lý cấu hình, danh mục, người dùng, lịch, nguồn dữ liệu và vận hành theo quyền.
- Không được bỏ qua audit log.

2.7. Quản trị viên cấp cao
- Quản lý vai trò và quyền nhạy cảm.
- Quản lý cấu hình quan trọng, quy trình phục hồi và quyền truy cập hệ thống.
- Các hành động nhạy cảm cần xác thực bổ sung nếu phù hợp.

2.8. Tài khoản dịch vụ
- Dùng cho worker, pipeline và tích hợp.
- Quyền tối thiểu cần thiết; không dùng chung tài khoản cá nhân.
- Secret được quản lý an toàn và có thể xoay vòng.

3. DANH MỤC MODULE CHỨC NĂNG

NHÓM A — NGHIỆP VỤ XỔ SỐ

**MODULE 01: QUẢN LÝ LOẠI HÌNH XỔ SỐ**
- Quản lý XSMB, XSMT, XSMN và các loại hình xổ số điện toán trong phạm vi hỗ trợ.
- Quản lý mã định danh, tên hiển thị, slug, mô tả và trạng thái.
- Cấu hình quy tắc kỳ quay, số chữ số, số lượng số được chọn và cơ cấu giải.
- Hỗ trợ cấu hình khác nhau theo loại hình.
- Bật/tắt loại hình.
- Lưu lịch sử thay đổi cấu hình.
- Không hard-code danh mục hoặc quy tắc trong giao diện.

**MODULE 02: QUẢN LÝ MIỀN, TỈNH/THÀNH VÀ ĐÀI**
- Quản lý miền xổ số.
- Quản lý tỉnh/thành và mã định danh ổn định.
- Quản lý đài, đơn vị phát hành và thông tin hiển thị.
- Ánh xạ tên gọi từ nhiều nguồn về cùng định danh.
- Quản lý slug, thứ tự, trạng thái và thông tin SEO.
- Hỗ trợ thay đổi tên hoặc đơn vị hành chính mà không phá vỡ dữ liệu lịch sử.
- Phân biệt tỉnh/thành, đài, loại hình và kỳ quay.

**MODULE 03: LỊCH MỞ THƯỞNG**
- Quản lý lịch định kỳ theo thứ trong tuần.
- Quản lý kỳ quay cụ thể theo ngày.
- Hiển thị lịch hôm nay, ngày mai, tuần và tháng.
- Lọc theo miền, đài, tỉnh/thành và loại hình.
- Hỗ trợ lịch ngoại lệ, hoãn hoặc thay đổi lịch.
- Trạng thái: dự kiến, đang diễn ra nếu có dữ liệu trực tiếp, chờ kết quả, hoàn tất, hoãn hoặc hủy.
- Phát hiện xung đột lịch.
- Tách lịch dự kiến khỏi trạng thái kết quả thực tế.

**MODULE 04: QUẢN LÝ KẾT QUẢ**
- Nhập kết quả thủ công hoặc nhận từ pipeline dữ liệu.
- Lưu kết quả theo kỳ quay, đài, loại hình và ngày.
- Quản lý cơ cấu giải và thứ tự giải.
- Bảo toàn số có số 0 ở đầu bằng kiểu dữ liệu chuỗi khi phù hợp.
- Trạng thái: bản nháp, chờ xác minh, đã xác minh, đã công bố, bị thu hồi hoặc đã đính chính.
- Kiểm tra dữ liệu trùng, thiếu hoặc sai định dạng.
- Ghi nguồn dữ liệu, thời điểm nhận, thời điểm xác minh và thời điểm công bố.
- Lưu phiên bản trước/sau khi chỉnh sửa.
- Không ghi đè âm thầm dữ liệu đã công bố.
- Yêu cầu lý do khi đính chính.
- Hỗ trợ tìm kiếm, lọc, phân trang và xuất dữ liệu theo quyền.

**MODULE 05: CẬP NHẬT KẾT QUẢ TRỰC TIẾP**
- Theo dõi kỳ quay đang diễn ra nếu nguồn hỗ trợ dữ liệu từng phần.
- Hiển thị trạng thái cập nhật từng giải.
- Làm mới bằng polling hoặc SSE/WebSocket khi cần.
- Hiển thị thời điểm cập nhật gần nhất.
- Phân biệt dữ liệu tạm thời với dữ liệu chính thức.
- Chống xử lý trùng sự kiện.
- Không tự tạo kết quả còn thiếu.
- Không tự công bố chỉ dựa vào giờ dự kiến.
- Cảnh báo khi dữ liệu đến chậm hoặc bất thường.

**MODULE 06: TRA CỨU KẾT QUẢ THEO NGÀY**
- Trang kết quả mới nhất.
- Tra cứu hôm nay, hôm qua và ngày tùy chọn.
- Lọc theo miền, đài, tỉnh/thành và loại hình.
- Điều hướng ngày trước/ngày sau.
- Hiển thị nhiều đài trong một ngày.
- URL ổn định theo ngày và thực thể.
- Responsive trên điện thoại, máy tính bảng và desktop.
- Sao chép, chia sẻ, in hoặc xuất dữ liệu phù hợp.
- Hiển thị nguồn và trạng thái xác minh.
- Có trạng thái loading, empty, error và dữ liệu chưa công bố.

**MODULE 07: ENGINE DÒ VÉ**
- Nhận số vé, ngày quay, đài và loại hình.
- Kiểm tra đầu vào và số lượng vé.
- Lấy kết quả đã công bố của đúng kỳ quay.
- Áp dụng quy tắc dò riêng cho từng loại xổ số.
- Trả danh sách giải khớp, số trúng và trạng thái kết quả.
- Hỗ trợ nhiều vé trong một yêu cầu với giới hạn phù hợp.
- Không phụ thuộc trực tiếp vào NestJS, ORM hoặc controller.
- Xử lý logic chính trong bộ nhớ sau khi nạp dữ liệu cần thiết.
- Dùng Map/Set hoặc cấu trúc phù hợp khi benchmark chứng minh lợi ích.
- Bảo toàn số 0 đầu chuỗi.
- Không khẳng định trúng thưởng chính thức nếu dữ liệu chưa được xác minh.
- Không thay thế quy tắc nghiệp vụ bằng một thuật toán chung không phù hợp.
- Có bộ test chuẩn cho từng loại hình và các trường hợp biên.

**MODULE 08: THỐNG KÊ CƠ BẢN**
- Tần suất xuất hiện theo khoảng ngày.
- Thống kê theo miền, đài, tỉnh/thành, loại hình và giải.
- Thống kê chẵn/lẻ, đầu/đuôi và tổng chữ số khi phù hợp.
- Thống kê số xuất hiện nhiều/ít trong khoảng dữ liệu xác định.
- Bảng, biểu đồ cột, đường và heatmap.
- So sánh các khoảng thời gian.
- Hiển thị phạm vi dữ liệu và số kỳ được tính.
- Xuất CSV/XLSX nếu được phép.
- Định nghĩa rõ công thức và mẫu số.
- Không diễn giải tần suất lịch sử thành bảo đảm dự đoán tương lai.

**MODULE 09: THỐNG KÊ CHUYÊN SÂU**
- Thống kê cặp số, bộ số và nhóm chữ số theo quy tắc được định nghĩa.
- Thống kê khoảng cách giữa các lần xuất hiện.
- Ma trận tần suất theo thời gian.
- So sánh giữa các đài hoặc giai đoạn.
- Bộ lọc và mẫu thống kê tùy chỉnh.
- Phiên bản hóa thuật toán.
- Cho phép tái tính toán từ dữ liệu gốc.
- Hiển thị phương pháp, phạm vi và giới hạn thống kê.

**MODULE 10: GIẢI ĐẶC BIỆT VÀ LÔ TÔ**
- Bảng giải đặc biệt theo ngày.
- Tra cứu các chữ số cuối theo quy tắc xác định.
- Bảng đầu/đuôi lô tô.
- Tổng hợp số xuất hiện trong một kỳ.
- Lịch sử theo tỉnh/thành, đài và thứ trong tuần.
- Tìm số cụ thể và điều hướng đến kết quả gốc.
- Không trộn lẫn quy tắc giữa các loại xổ số.

**MODULE 11: XỔ SỐ ĐIỆN TOÁN**
- Danh mục sản phẩm điện toán.
- Quản lý mã kỳ và thời gian quay.
- Lưu dãy số trúng thưởng.
- Quản lý các hạng giải và điều kiện trúng.
- Tra cứu theo kỳ và lịch sử.
- Dò vé theo quy tắc riêng từng sản phẩm.
- Lưu giá trị giải khi có nguồn đáng tin cậy.
- Quản lý trạng thái, đính chính và nguồn dữ liệu.
- Không ép mô hình dữ liệu điện toán vào mô hình giải truyền thống nếu không phù hợp.

**MODULE 12: KHO LỊCH SỬ**
- Lưu trữ kết quả nhiều năm.
- Nhập dữ liệu lịch sử hàng loạt.
- Kiểm tra dữ liệu thiếu, trùng và không nhất quán.
- Đối soát với nguồn tham chiếu.
- Tra cứu và phân trang theo khoảng thời gian.
- Lưu nguồn gốc của từng bản ghi.
- Hỗ trợ tái tạo thống kê.
- Có chính sách lưu trữ, backup và phục hồi.

NHÓM B — THU THẬP VÀ CHẤT LƯỢNG DỮ LIỆU

**MODULE 13: QUẢN LÝ NGUỒN DỮ LIỆU**
- Khai báo nhiều nguồn độc lập.
- Hỗ trợ API, HTML, JSON, CSV, webhook hoặc nhập thủ công tùy nguồn được phép.
- Mỗi nguồn có adapter riêng.
- Cấu hình endpoint, loại dữ liệu, lịch thu thập và ưu tiên.
- Quản lý trạng thái, giới hạn truy cập và xác thực.
- Theo dõi độ trễ, tỷ lệ thành công và lỗi.
- Quản lý phiên bản schema nguồn.
- Secret phải được lưu trong secret manager hoặc biến môi trường an toàn.
- Tuân thủ điều khoản sử dụng, quyền truy cập và giới hạn tốc độ của nguồn.
- Không mặc định mọi website đều cho phép scraping.

**MODULE 14: DATA INGESTION**
- Lập lịch thu thập định kỳ.
- Tiếp nhận dữ liệu qua adapter.
- Lưu dữ liệu thô trước khi chuẩn hóa.
- Parse HTML/JSON/CSV bằng parser riêng từng nguồn.
- Chuẩn hóa ngày, đài, kỳ quay, giải và số trúng.
- Kiểm tra schema và trường bắt buộc.
- Retry lỗi tạm thời với backoff và giới hạn.
- Idempotency để tránh ghi trùng.
- Giới hạn concurrency và tốc độ truy cập.
- Ghi log từng lần chạy.
- Có thể chạy lại job lỗi.
- Phân biệt lỗi kết nối, lỗi parser và dữ liệu không hợp lệ.
- Không coi kết quả rỗng là thành công nếu nguồn đáng lẽ phải có dữ liệu.
- Giữ raw payload/HTML theo chính sách lưu trữ và quyền sử dụng.

**MODULE 15: DATA VALIDATION VÀ RECONCILIATION**
- Kiểm tra cấu trúc, số lượng giải, độ dài và định dạng.
- Phát hiện bản ghi trùng hoặc kỳ quay không khớp.
- Phát hiện dữ liệu thiếu.
- So sánh các nguồn độc lập khi có.
- Tạo bản ghi sai lệch để xử lý.
- Có ngưỡng cảnh báo cấu hình được.
- Duyệt thủ công các trường hợp nghi vấn.
- Lưu người xác minh, thời điểm và lý do.
- Không tự chọn một nguồn làm đúng khi có mâu thuẫn chưa được giải quyết.
- Không công bố dữ liệu bất thường theo cơ chế fail-open.

**MODULE 16: QUY TRÌNH CÔNG BỐ**
- Tiếp nhận.
- Chuẩn hóa.
- Kiểm tra.
- Đối soát.
- Phê duyệt tự động hoặc thủ công theo chính sách.
- Công bố.
- Giám sát và đính chính.
- Các trạng thái phải được mô hình hóa rõ ràng.
- Mọi chuyển trạng thái phải kiểm tra quyền và điều kiện.
- Sự kiện công bố cần kích hoạt cập nhật cache và thống kê liên quan.
- Đính chính phải tạo phiên bản mới và audit log.

**MODULE 17: JOBS VÀ QUEUE**
- Quản lý job thu thập, xác minh, thống kê, thông báo và bảo trì.
- Trạng thái pending, running, success, failed, retry và dead-letter.
- Giới hạn concurrency.
- Retry với backoff.
- Idempotency key.
- Tạm dừng/hủy/chạy lại theo quyền.
- Theo dõi job tồn đọng và thời gian xử lý.
- Log theo job và correlation ID.
- Cảnh báo job thất bại liên tục.
- Không để tác vụ nặng chặn request người dùng.

**MODULE 18: TÍNH TOÁN THỐNG KÊ NỀN**
- Tính trước số liệu phổ biến.
- Cập nhật khi kết quả được công bố.
- Tái tính khi kết quả đính chính.
- Chạy batch cho dữ liệu lịch sử.
- Lưu phiên bản thuật toán và phạm vi dữ liệu.
- Chống xử lý trùng.
- Đối chiếu số liệu tổng hợp với dữ liệu gốc.
- Theo dõi tiến độ và thời gian xử lý.

NHÓM C — TÀI KHOẢN VÀ TRẢI NGHIỆM

**MODULE 19: TÀI KHOẢN**
- Đăng ký, đăng nhập, đăng xuất.
- Xác minh email nếu áp dụng.
- Quên và đặt lại mật khẩu.
- Đổi mật khẩu.
- Quản lý phiên và đăng xuất thiết bị khác.
- Quản lý thông tin cá nhân tối thiểu.
- Vô hiệu hóa hoặc xóa tài khoản theo chính sách.
- Giới hạn đăng nhập bất thường.
- Chống bot khi cần.
- Người dùng không bắt buộc đăng nhập để xem dữ liệu công khai.

**MODULE 20: RBAC VÀ PHÂN QUYỀN**
- Vai trò khách, thành viên, nhập liệu, xác minh, biên tập viên, admin và super admin.
- Quyền theo module, hành động và phạm vi dữ liệu.
- Tách quyền nhập liệu, phê duyệt và công bố.
- Kiểm tra quyền ở backend.
- Tài khoản dịch vụ có quyền tối thiểu.
- Ghi audit log cho hành động nhạy cảm.
- Không tin tưởng quyền được gửi từ frontend.

**MODULE 21: YÊU THÍCH VÀ CÁ NHÂN HÓA**
- Lưu đài, tỉnh/thành và loại hình yêu thích.
- Lưu trang truy cập nhanh.
- Lưu bộ lọc thống kê.
- Lưu lịch sử dò vé theo lựa chọn của người dùng.
- Đồng bộ tùy chọn giữa thiết bị khi đăng nhập.
- Xóa dữ liệu cá nhân hóa.

**MODULE 22: THÔNG BÁO**
- Thông báo kết quả mới.
- Thông báo công bố chính thức và đính chính.
- Theo dõi đài hoặc loại hình yêu thích.
- Trung tâm thông báo trên website.
- Đánh dấu đã đọc/chưa đọc.
- Email hoặc Web Push khi người dùng đồng ý.
- Chống gửi trùng.
- Theo dõi trạng thái gửi và lỗi.
- Quản lý đăng ký nhận và hủy đăng ký.

**MODULE 23: TÌM KIẾM**
- Tìm kết quả theo ngày, miền, đài và loại hình.
- Tìm bài viết và trang hướng dẫn.
- Tìm số trong phạm vi dữ liệu được hỗ trợ.
- Gợi ý từ khóa.
- Chuẩn hóa dấu tiếng Việt và hỗ trợ tìm không dấu khi phù hợp.
- Phân trang và giới hạn truy vấn.
- Lịch sử tìm kiếm là tùy chọn và phải cân nhắc quyền riêng tư.

**MODULE 24: CHIA SẺ, IN VÀ XUẤT**
- Sao chép kết quả.
- Chia sẻ URL.
- In bảng kết quả.
- Giao diện print-friendly.
- Xuất CSV/XLSX cho chức năng được cấp quyền.
- Gắn ngày, nguồn và trạng thái xác minh.
- Giới hạn kích thước và tần suất xuất.
- Không cho phép sửa dữ liệu gốc qua file xuất.

NHÓM D — CMS, SEO VÀ TĂNG TRƯỞNG

**MODULE 25: CMS**
- Tạo, sửa, lưu nháp, duyệt và xuất bản bài viết.
- Danh mục, thẻ, tác giả và ảnh.
- Lên lịch đăng.
- Phiên bản nội dung.
- Quản lý trang giới thiệu, liên hệ, điều khoản và quyền riêng tư.
- Bài hướng dẫn dò vé, đọc kết quả và hiểu thống kê.
- Kiểm duyệt nội dung và quyền xuất bản.

**MODULE 26: SEO**
- Slug duy nhất.
- Title, meta description, canonical.
- Sitemap XML và robots.txt.
- Open Graph và metadata chia sẻ.
- Structured data phù hợp với nội dung thực tế.
- Breadcrumb.
- Redirect 301.
- Xử lý 404/410.
- Quy tắc index/noindex.
- Kiểm tra liên kết nội bộ.
- Tránh tạo trang trùng lặp hoặc trang lọc mỏng hàng loạt.
- Không tạo structured data gây hiểu nhầm.

**MODULE 27: TRANG CHỦ VÀ TRANG CHUYÊN BIỆT**
- Kết quả mới nhất.
- Kết quả theo miền.
- Danh sách đài mở thưởng.
- Lịch mở thưởng.
- Truy cập nhanh đến dò vé và thống kê.
- Nội dung hướng dẫn.
- Các đài/tỉnh thường xem nếu có cơ sở dữ liệu hợp lệ.
- Khối giao diện bật/tắt từ Admin.
- Trạng thái loading, empty, error và dữ liệu chưa công bố.
- Tối ưu mobile và hiệu năng.

**MODULE 28: QUẢNG CÁO**
- Quản lý vị trí quảng cáo.
- Bật/tắt theo trang và thiết bị.
- Tích hợp nền tảng quảng cáo hoặc quảng cáo nội bộ.
- Theo dõi lượt hiển thị/nhấp ở mức phù hợp.
- Đánh dấu quảng cáo rõ ràng.
- Không che khuất hoặc gây nhầm lẫn với kết quả chính thức.
- Tuân thủ chính sách quảng cáo và quyền riêng tư.

**MODULE 29: PHÂN TÍCH HÀNH VI**
- Theo dõi lượt xem trang và hiệu năng.
- Phân tích tìm kiếm nội bộ.
- Theo dõi lỗi frontend.
- Báo cáo trang được truy cập nhiều.
- Phân tích nguồn truy cập khi được phép.
- Quản lý consent cookie nếu cần.
- Ẩn danh hóa và giới hạn thời gian lưu.
- Không gửi số vé hoặc dữ liệu nhạy cảm vào analytics nếu không cần thiết.

NHÓM E — QUẢN TRỊ, AN TOÀN VÀ VẬN HÀNH

**MODULE 30: ADMIN DASHBOARD**
- Tổng quan kỳ quay và kết quả.
- Kết quả chờ xác minh/công bố.
- Trạng thái nguồn dữ liệu.
- Job thất bại và queue lag.
- Bản ghi thiếu hoặc bất thường.
- Nội dung chờ duyệt.
- Hoạt động quản trị gần đây.
- Cảnh báo và liên kết xử lý nhanh.
- Dùng dữ liệu tổng hợp; tránh truy vấn toàn bộ lịch sử mỗi lần mở dashboard.

**MODULE 31: CẤU HÌNH**
- Múi giờ.
- Lịch chạy và ngưỡng cảnh báo.
- Rate limit.
- Feature flags.
- Cache TTL.
- Chính sách lưu trữ.
- Email/Telegram/Web Push.
- Nguồn dữ liệu.
- Cấu hình tách biệt DEV, TEST, STAGING và PRODUCTION.
- Thay đổi cấu hình quan trọng cần quyền và audit.
- Không lưu secret trong mã nguồn hoặc cấu hình công khai.

**MODULE 32: AUDIT LOG**
- Người thực hiện, thời điểm, hành động và đối tượng.
- Giá trị trước/sau đối với thay đổi quan trọng.
- Lý do sửa hoặc đính chính kết quả.
- Lịch sử công bố và thay đổi quyền.
- Lọc và tìm kiếm.
- Chính sách lưu trữ.
- Hạn chế sửa/xóa log.
- Không ghi mật khẩu, token hoặc secret.

**MODULE 33: MONITORING VÀ ALERTING**
- Uptime và health check.
- Thời gian phản hồi API.
- Lỗi HTTP và lỗi ứng dụng.
- Truy vấn database chậm.
- Nguồn dữ liệu không truy cập được.
- Parser lỗi hoặc cấu trúc nguồn thay đổi.
- Kết quả cập nhật quá hạn.
- Queue lag, job thất bại và retry bất thường.
- Dung lượng ổ đĩa, bộ nhớ và CPU.
- Cảnh báo qua Telegram/Email có thể cấu hình.
- Có runbook xử lý sự cố.

**MODULE 34: BACKUP VÀ RECOVERY**
- Backup database định kỳ.
- Backup cấu hình và dữ liệu cần thiết.
- Mã hóa và lưu bản sao độc lập với máy chủ chính.
- Kiểm tra tính toàn vẹn.
- Thử phục hồi định kỳ.
- Xác định RPO/RTO.
- Phục hồi theo thời điểm nếu hạ tầng hỗ trợ.
- Lưu lịch sử backup/restore.
- Không coi backup thành công là đủ nếu chưa thử restore.

**MODULE 35: BẢO MẬT**
- HTTPS và security headers.
- Xác thực và quản lý phiên an toàn.
- RBAC ở backend.
- Chống SQL injection, XSS, CSRF theo mô hình ứng dụng.
- CORS có cấu hình rõ ràng.
- Rate limiting và chống brute force.
- Kiểm soát upload.
- Quản lý secret.
- Bảo vệ API quản trị.
- Theo dõi đăng nhập bất thường.
- Quét lỗ hổng dependency.
- Cập nhật thư viện và xử lý sự cố.
- Hạn chế scraping/lạm dụng API theo chính sách hợp lý.

**MODULE 36: QUYỀN RIÊNG TƯ VÀ TUÂN THỦ**
- Chính sách quyền riêng tư và điều khoản.
- Quản lý consent khi cần.
- Quy trình yêu cầu truy cập, xuất hoặc xóa dữ liệu cá nhân.
- Thời hạn lưu trữ.
- Kiểm soát truy cập dữ liệu cá nhân.
- Lưu lịch sử xử lý yêu cầu.
- Đánh giá pháp luật Việt Nam áp dụng cho website.
- Rà soát điều khoản sử dụng của nguồn dữ liệu.
- Không triển khai tính năng giao dịch/đặt cược nếu chưa được đánh giá pháp lý riêng.

NHÓM F — API VÀ NỀN TẢNG KỸ THUẬT

**MODULE 37: API**
- API kết quả mới nhất.
- API kết quả theo ngày/miền/đài/loại hình.
- API lịch mở thưởng và lịch sử.
- API dò vé.
- API thống kê.
- API xổ số điện toán.
- API tìm kiếm.
- API quản trị riêng.
- Versioning, ví dụ /api/v1.
- OpenAPI/Swagger.
- Phân trang, lọc và giới hạn truy vấn.
- Chuẩn lỗi và status code nhất quán.
- Authentication, authorization và rate limit.
- API công khai chỉ đọc không được truy cập thao tác công bố/đính chính.
- Theo dõi mức sử dụng và độ trễ.

**MODULE 38: CACHE VÀ HIỆU NĂNG**
- Cache kết quả mới nhất, lịch và thống kê phổ biến.
- TTL theo loại dữ liệu.
- Cache invalidation khi công bố/đính chính.
- CDN cho tài nguyên tĩnh.
- Tối ưu truy vấn và index database.
- Chống cache dữ liệu chưa xác minh.
- Không dùng chung cache chứa dữ liệu riêng tư giữa người dùng.
- Benchmark trước khi chọn tối ưu phức tạp.
- Theo dõi hit/miss và thời gian phản hồi.

**MODULE 39: DATABASE VÀ SCHEMA**
- Database quan hệ PostgreSQL.
- Quản lý migration có phiên bản.
- Khóa ngoại, unique constraint và check constraint phù hợp.
- Index theo truy vấn thực tế.
- Tách dữ liệu gốc và dữ liệu tổng hợp.
- Transaction cho thay đổi liên quan.
- Chính sách lưu trữ lịch sử.
- Kiểm tra tính toàn vẹn.
- Quy trình migration/rollback an toàn.
- Seed dữ liệu chỉ dành cho môi trường phù hợp.
- Phân tách dữ liệu DEV/TEST/PRODUCTION.
- Chọn Prisma hoặc TypeORM sau khi đánh giá; tránh sử dụng đồng thời hai ORM trong cùng phạm vi nếu không có lý do rõ ràng.

**MODULE 40: TESTING VÀ QUALITY GATES**
- Unit test cho domain logic.
- Integration test cho database và API.
- Contract test cho adapter nguồn dữ liệu.
- Fixture test cho HTML/JSON parser.
- Test quy tắc dò vé.
- Test số có số 0 đầu.
- Test dữ liệu thiếu, trùng, sai thứ tự hoặc sai định dạng.
- Test đính chính và audit.
- Test RBAC.
- Test retry/idempotency.
- Test cache invalidation.
- End-to-end test cho luồng chính.
- Performance/load test.
- Security test.
- CI chạy lint, typecheck, test và build.
- Không phát hành nếu quality gate bắt buộc thất bại.

**MODULE 41: DEPLOYMENT VÀ RELEASE**
- Cấu hình theo môi trường.
- Docker hóa khi phù hợp.
- CI/CD.
- Staging trước production.
- Migration database có kiểm soát.
- Health check sau deploy.
- Rollback ứng dụng.
- Feature flags.
- Quản lý secret.
- Theo dõi lỗi sau phát hành.
- Quy trình release và phê duyệt.
- Tài liệu cài đặt, vận hành và phục hồi.

**MODULE 42: TÀI LIỆU VÀ QUẢN LÝ PHÁT TRIỂN**
- Tài liệu kiến trúc.
- Đặc tả module.
- ERD và data dictionary.
- API contracts.
- Quy tắc nghiệp vụ.
- Hướng dẫn local development.
- Hướng dẫn kiểm thử.
- Runbook.
- ADR ghi lại quyết định kiến trúc.
- Changelog và version.
- Checklist code review và release.

4. YÊU CẦU CHUYÊN SÂU CHO DATA INGESTION

4.1. Bối cảnh

Không giả định tồn tại một API công khai, miễn phí, chuẩn hóa và được phép sử dụng cho mọi loại xổ số. Nguồn thực tế có thể là API được cấp quyền, dữ liệu đối tác, HTML, JSON, CSV hoặc nhập thủ công. Trước khi tích hợp phải xác minh độ tin cậy, điều khoản, quyền truy cập và giới hạn sử dụng của nguồn.

4.2. Pipeline chuẩn

Source Adapter
    -> Raw Payload Storage
    -> Parser
    -> Normalizer
    -> Schema Validation
    -> Business Validation
    -> Reconciliation
    -> Approval
    -> Publisher
    -> Cache/Statistics Invalidation
    -> Monitoring/Audit

4.3. Source Adapter
- Mỗi nguồn có adapter riêng.
- Adapter chỉ chịu trách nhiệm giao tiếp và trả dữ liệu thô/chuẩn trung gian.
- Không để logic nghiệp vụ phụ thuộc selector của một website cụ thể.
- Có timeout, rate limit và xử lý lỗi mạng.
- Hỗ trợ tắt nguồn nhanh bằng cấu hình.
- Có phiên bản adapter/parser.

4.4. HTML Parsing và phát hiện thay đổi
- Dùng parser HTML phù hợp, tránh regex làm bộ phân tích HTML chính.
- Selector và quy tắc parse phải được kiểm thử.
- Lưu fixture HTML/JSON đại diện để regression test.
- Kiểm tra selector có tồn tại và trường bắt buộc có dữ liệu.
- Kiểm tra số lượng giải, kiểu dữ liệu và cấu trúc mong đợi.
- Phát hiện response rỗng, trang chặn bot, CAPTCHA, trang lỗi hoặc trang đăng nhập.
- Khi cấu trúc nguồn thay đổi, đánh dấu parser failure hoặc needs_review.
- Giữ raw payload theo chính sách lưu trữ.
- Gửi cảnh báo Admin; không công bố dữ liệu không hợp lệ.
- Không tìm cách vượt cơ chế bảo vệ hoặc điều khoản của nguồn.

4.5. Cron và queue
- Lập lịch phù hợp lịch mở thưởng.
- Không tạo nhiều job trùng cho cùng nguồn/kỳ quay.
- Dùng distributed lock hoặc cơ chế tương đương khi chạy nhiều worker.
- Retry có giới hạn và exponential backoff.
- Tách lỗi tạm thời khỏi lỗi dữ liệu.
- Có dead-letter queue hoặc bảng lỗi tương đương.
- Có thao tác chạy lại an toàn.
- Đo thời gian, số lần retry và tỷ lệ thành công.

4.6. Dữ liệu thô và khả năng tái xử lý
- Lưu payload gốc, source ID, fetched_at, content hash và metadata cần thiết.
- Có thể parse lại dữ liệu cũ khi parser được sửa, nếu quyền lưu trữ cho phép.
- Không dùng raw payload làm dữ liệu công khai trực tiếp.
- Có chính sách retention để tránh lưu vô hạn.

4.7. Cảnh báo
- Nguồn không truy cập được quá ngưỡng.
- Parser thất bại.
- Selector bắt buộc không tồn tại.
- Thiếu giải hoặc sai định dạng.
- Dữ liệu giữa các nguồn không khớp.
- Kết quả cập nhật quá hạn.
- Job retry quá số lần.
- Queue lag vượt ngưỡng.
- Gửi Telegram/Email qua module notification; không nhúng token trong code.
- Chống spam cảnh báo bằng grouping, cooldown và deduplication.

5. YÊU CẦU CHUYÊN SÂU CHO TICKET CHECKER

5.1. Nguyên tắc

Engine dò vé là domain logic thuần, không phụ thuộc NestJS, Prisma/TypeORM, HTTP hoặc cache provider. Lớp application lấy dữ liệu kỳ quay; infrastructure quản lý repository/cache; domain engine áp dụng quy tắc.

5.2. Luồng xử lý
1. Validate đầu vào.
2. Xác định loại hình, ngày/kỳ quay và đài.
3. Lấy đúng kết quả đã công bố.
4. Nếu không có dữ liệu hoặc dữ liệu chưa chính thức, trả trạng thái phù hợp.
5. Chuẩn hóa số vé và dữ liệu kết quả.
6. Chọn rule set tương ứng.
7. Đối chiếu trong bộ nhớ.
8. Trả chi tiết kết quả và trạng thái nguồn.
9. Ghi metric; chỉ lưu lịch sử cá nhân nếu người dùng đồng ý.

5.3. Interface minh họa

interface PrizeRule {
  prizeCode: string;
  match(ticketNumber: string, winningNumber: string): boolean;
}

interface TicketCheckResult {
  drawId: string;
  status: "official" | "pending" | "unavailable";
  matchedPrizes: Array<{
    prizeCode: string;
    winningNumber: string;
  }>;
}

Đây là minh họa; thiết kế cuối cùng phải thể hiện được các rule khác nhau giữa loại hình xổ số. Không dùng một hàm match duy nhất cho mọi sản phẩm nếu quy tắc nghiệp vụ khác nhau.

5.4. Tối ưu
- Query đúng kỳ quay/đài, tránh tải toàn bộ lịch sử.
- Chỉ truy vấn một lần cho mỗi bộ dữ liệu cần dò.
- Cache kết quả đã công bố theo khóa ổn định.
- Chuẩn hóa dữ liệu khi nạp cache.
- Dùng string để bảo toàn số 0 đầu.
- Dùng Map/Set khi phù hợp với khối lượng và mẫu truy cập.
- Batch nhiều vé nhưng giới hạn kích thước request.
- Không thực hiện truy vấn DB trong vòng lặp từng số.
- Cache phải có version hoặc invalidation khi kết quả đính chính.
- Không trả dữ liệu cache cũ như kết quả chính thức nếu đã bị thu hồi/đính chính.
- Benchmark với dữ liệu thực tế trước khi tối ưu vi mô.

5.5. Kiểm thử
- Mỗi loại hình có fixture và expected output đã xác minh.
- Kiểm tra số 0 đầu, độ dài không hợp lệ và ký tự lạ.
- Kiểm tra ngày/đài không khớp.
- Kiểm tra kỳ chưa có kết quả.
- Kiểm tra kết quả một phần và chưa công bố.
- Kiểm tra nhiều vé trong một request.
- Kiểm tra kết quả sau khi đính chính.
- Kiểm tra hiệu năng và mức sử dụng bộ nhớ.

6. THIẾT KẾ DỮ LIỆU CẤP CAO

Các bảng dưới đây là đề xuất khởi đầu; cần hoàn thiện ERD, quan hệ và constraint trước khi migration production.

Danh mục:
- lottery_types
- regions
- provinces
- lottery_stations
- prize_definitions
- draw_schedules
- draw_sessions

Kết quả:
- lottery_results
- result_prizes
- result_revisions
- result_publication_events

Nguồn dữ liệu:
- data_sources
- source_adapter_versions
- raw_data_records
- ingestion_jobs
- ingestion_job_attempts
- data_validation_runs
- data_discrepancies
- reconciliation_records

Thống kê:
- statistic_snapshots
- statistic_algorithm_versions
- statistic_jobs

Người dùng:
- users
- roles
- permissions
- user_roles
- role_permissions
- user_favorites
- user_notifications
- notification_preferences
- user_sessions

CMS:
- articles
- article_categories
- tags
- article_tags
- media_assets
- redirects

Vận hành:
- audit_logs
- system_settings
- feature_flags
- outbox_events nếu cần
- api_usage_logs hoặc bảng metric phù hợp

Yêu cầu dữ liệu:
- Dùng ID ổn định.
- Có khóa ngoại và unique constraint theo nghiệp vụ.
- Lưu thời gian theo quy ước UTC trong hệ thống và hiển thị theo Asia/Ho_Chi_Minh.
- Dùng kiểu chuỗi cho số trúng thưởng khi cần bảo toàn số 0 đầu.
- Lưu draw_date dưới dạng ngày nghiệp vụ phù hợp, không nhầm với thời điểm ghi nhận.
- Phân biệt fetched_at, validated_at, published_at và updated_at khi cần.
- Dùng transaction cho các thay đổi nhiều bảng.
- Kết quả đã công bố phải có lịch sử phiên bản.
- Dữ liệu thống kê phải truy ngược được về dữ liệu gốc và phiên bản thuật toán.
- Index dựa trên truy vấn thật; không tạo index tràn lan.
- Chỉ partition khi dung lượng và benchmark cho thấy cần thiết.

7. TECH STACK ĐỀ XUẤT

Frontend:
- Next.js.
- TypeScript.
- UI component library được chọn thống nhất.
- Form validation và API client theo contract.
- Responsive design và accessibility cơ bản.

Backend:
- NestJS.
- TypeScript.
- REST API có versioning.
- Validation DTO/schema tại ranh giới API.
- Domain/application/infrastructure tách theo mức độ phức tạp.

Database:
- PostgreSQL.
- Chọn một ORM chính: Prisma hoặc TypeORM.
- Quản lý migration trong CI/CD.
- Không để domain logic phụ thuộc ORM.

Jobs/Queue:
- NestJS Schedule cho lịch đơn giản.
- BullMQ và Redis nếu cần queue, retry và worker phân tán.
- Có idempotency và giám sát.

Cache:
- Redis khi có nhu cầu và lợi ích đo được.
- Cache HTTP/CDN cho tài nguyên phù hợp.
- Có chiến lược invalidation rõ ràng.

Monitoring:
- Structured logging.
- Error tracking và metrics.
- Health/readiness endpoints.
- Telegram/Email qua notification adapter.

Testing:
- Unit, integration, contract, E2E và performance test.
- Fixture cho parser và bộ dữ liệu chuẩn cho dò vé.

Deployment:
- Monorepo.
- Docker khi phù hợp.
- CI/CD, staging và production tách biệt.
- Backup độc lập và kiểm thử phục hồi.

Không bắt buộc sử dụng tất cả công nghệ ngay từ đầu. Chốt công nghệ sau khi xem xét năng lực vận hành, lưu lượng dự kiến và yêu cầu thực tế.

8. CẤU TRÚC MONOREPO THAM KHẢO

lottery-platform/
  apps/
    web/                  # Website công khai Next.js
    admin/                # Admin Dashboard
    api/                  # NestJS API
    worker/               # Worker tác vụ nền
  packages/
    shared-types/
    api-contracts/
    lottery-domain/
    validation/
    ui/
    config/
  infrastructure/
    docker/
    database/
    monitoring/
    deployment/
  docs/
    architecture/
    modules/
    api/
    database/
    operations/
  tests/
    integration/
    e2e/
    contract/
    fixtures/
  package.json
  README.md

Cấu trúc module API tham khảo:

apps/api/src/
  modules/
    lottery-types/
    stations/
    schedules/
    draw-sessions/
    results/
    ticket-checker/
    statistics/
    data-sources/
    data-ingestion/
    data-validation/
    notifications/
    users/
    roles/
    content/
    admin/
  shared/
    auth/
    database/
    cache/
    queue/
    logging/
    errors/
  main.ts

Quy tắc:
- Không để module nghiệp vụ import trực tiếp database nội bộ của module khác.
- Giao tiếp qua application service, interface hoặc event contract đã định nghĩa.
- Hạn chế vòng phụ thuộc.
- Dùng shared package cho kiểu dữ liệu thực sự dùng chung, không biến nó thành nơi chứa toàn bộ logic.
- Có README/contract cho mỗi module lớn.
- Không tạo microservice riêng cho từng module khi chưa cần.

9. API CONTRACT CẤP CAO

Các endpoint dưới đây là ví dụ định hướng, cần chốt schema cụ thể bằng OpenAPI.

Public read-only:
- GET /api/v1/lottery-types
- GET /api/v1/stations
- GET /api/v1/schedules
- GET /api/v1/draws/latest
- GET /api/v1/draws?date=YYYY-MM-DD&stationId=...
- GET /api/v1/draws/{drawId}
- POST /api/v1/ticket-checker/check
- GET /api/v1/statistics/frequency
- GET /api/v1/statistics/special-prize
- GET /api/v1/articles
- GET /api/v1/articles/{slug}

Authenticated user:
- GET /api/v1/me
- GET/POST/DELETE /api/v1/me/favorites
- GET /api/v1/me/notifications
- PATCH /api/v1/me/notification-preferences

Admin:
- /api/v1/admin/lottery-types
- /api/v1/admin/stations
- /api/v1/admin/schedules
- /api/v1/admin/results
- /api/v1/admin/data-sources
- /api/v1/admin/ingestion-jobs
- /api/v1/admin/validation
- /api/v1/admin/users
- /api/v1/admin/roles
- /api/v1/admin/audit-logs
- /api/v1/admin/settings

Yêu cầu API:
- Schema request/response được version hóa và kiểm thử.
- Validation đầu vào phía server.
- Phân trang thống nhất.
- Lỗi có mã và thông điệp an toàn.
- Không trả stack trace hoặc secret.
- Rate limit cho endpoint dễ bị lạm dụng.
- Quyền Admin kiểm tra ở backend.
- Endpoint ghi dữ liệu phải có audit và transaction phù hợp.
- Dùng idempotency cho thao tác có thể retry.
- Không thiết kế endpoint để cho phép người dùng công khai công bố kết quả.

10. GIAO DIỆN VÀ TRANG CẦN CÓ

Website công khai:
- Trang chủ.
- Kết quả mới nhất.
- Kết quả miền Bắc.
- Kết quả miền Trung.
- Kết quả miền Nam.
- Trang từng đài/tỉnh thành.
- Trang kết quả theo ngày.
- Trang lịch mở thưởng.
- Trang xổ số điện toán.
- Trang dò vé.
- Trang thống kê cơ bản.
- Trang thống kê chuyên sâu.
- Trang lịch sử giải đặc biệt/lô tô.
- Trang tìm kiếm.
- Trang bài viết và danh mục.
- Trang đăng nhập/đăng ký.
- Trang hồ sơ.
- Trang yêu thích.
- Trung tâm thông báo.
- Trang liên hệ, điều khoản và quyền riêng tư.
- Trang 404/500 và trạng thái lỗi dữ liệu.

Admin:
- Dashboard.
- Danh mục loại hình, miền, tỉnh/thành và đài.
- Lịch mở thưởng.
- Kết quả.
- Dữ liệu chờ xác minh.
- Lịch sử đính chính.
- Nguồn dữ liệu.
- Dữ liệu thô.
- Ingestion jobs.
- Parser health.
- Validation và reconciliation.
- Queue và job lỗi.
- Thống kê và tác vụ tính toán.
- Người dùng, vai trò và quyền.
- CMS và SEO.
- Quảng cáo.
- Cấu hình.
- Audit log.
- Monitoring.
- Backup/restore status.

Mọi màn hình cần có trạng thái loading, empty, error, permission denied và xác nhận cho hành động nguy hiểm.

11. BẢO MẬT, RIÊNG TƯ VÀ PHÁP LÝ

- HTTPS trong môi trường triển khai.
- Không commit secret vào Git.
- Không ghi token/mật khẩu vào log.
- Dùng quyền tối thiểu.
- Bảo vệ endpoint quản trị.
- Validate tất cả dữ liệu đầu vào.
- Áp dụng biện pháp chống XSS, SQL injection, CSRF phù hợp kiến trúc.
- CORS chỉ cho origin cần thiết.
- Rate limit và chống brute force.
- Có quy trình cập nhật dependency.
- Có chính sách lưu trữ dữ liệu cá nhân.
- Hạn chế thu thập dữ liệu không cần thiết.
- Tôn trọng quyền và điều khoản của nguồn dữ liệu.
- Không vượt cơ chế bảo vệ của website nguồn.
- Rà soát quy định pháp luật Việt Nam áp dụng cho dịch vụ.
- Không mặc định các tính năng cá cược, bán vé hoặc giao dịch tiền thật thuộc phạm vi dự án.
- Có quy trình xử lý sự cố bảo mật.

12. HIỆU NĂNG VÀ ĐỘ TIN CẬY

- Các endpoint tra cứu phổ biến phải có giới hạn thời gian phản hồi được đặt ra sau khi xác định mục tiêu tải.
- Không truy vấn toàn bộ lịch sử cho một thao tác dò vé.
- Dùng pagination và index phù hợp.
- Dùng cache có invalidation rõ ràng.
- Tách tác vụ nền khỏi request-response.
- Có timeout cho nguồn bên ngoài.
- Có retry giới hạn, backoff và circuit breaker khi phù hợp.
- Có metric về độ trễ, lỗi và throughput.
- Load test các luồng tra cứu, dò vé và thống kê.
- Kiểm tra query plan khi truy vấn chậm.
- Không tuyên bố hiệu năng đạt yêu cầu nếu chưa đo bằng benchmark.
- Dữ liệu kết quả đã công bố phải còn khả dụng khi nguồn ngoài tạm ngừng.
- Hệ thống phải có trạng thái degraded rõ ràng nếu dữ liệu mới không cập nhật được.

13. LỘ TRÌNH PHÁT TRIỂN

**GIAI ĐOẠN 0 — PHÂN TÍCH VÀ THIẾT KẾ**
- Chốt phạm vi MVP.
- Xác minh nguồn dữ liệu và điều khoản sử dụng.
- Chốt mô hình loại hình/đài/kỳ quay/giải.
- Thiết kế ERD.
- Định nghĩa trạng thái kết quả.
- Định nghĩa API contracts.
- Chốt stack, quy ước code, CI và môi trường.
- Viết test cases chuẩn cho dò vé.

**GIAI ĐOẠN 1 — NỀN TẢNG**
- Monorepo, lint, typecheck, test và build.
- PostgreSQL và migration.
- Danh mục loại hình, miền, tỉnh/thành và đài.
- Lịch mở thưởng.
- Quản lý kỳ quay và kết quả.
- Admin nhập liệu.
- Audit log cơ bản.
- Website tra cứu theo ngày.
- Backup cơ bản.

**GIAI ĐOẠN 2 — PIPELINE DỮ LIỆU**
- Source adapters.
- Raw data storage.
- Parser và normalizer.
- Validation.
- Reconciliation.
- Cron/queue.
- Retry/idempotency.
- Cảnh báo Telegram/Email.
- Fixture regression tests.
- Quy trình phê duyệt/công bố.

**GIAI ĐOẠN 3 — DÒ VÉ VÀ THỐNG KÊ**
- Engine dò vé thuần domain.
- Bộ rule theo loại hình.
- Test dữ liệu chuẩn.
- Cache kết quả.
- Thống kê cơ bản.
- Tính toán nền.
- Invalidation và tái tính khi đính chính.
- Benchmark.

**GIAI ĐOẠN 4 — TRẢI NGHIỆM NGƯỜI DÙNG**
- Responsive và accessibility.
- Tìm kiếm.
- Chia sẻ/in.
- Tài khoản và yêu thích nếu cần.
- Thông báo có consent.
- Trang điện toán.
- CMS và SEO cơ bản.

**GIAI ĐOẠN 5 — VẬN HÀNH VÀ MỞ RỘNG**
- Monitoring/alerting đầy đủ.
- Kiểm thử tải và bảo mật.
- Backup/restore drill.
- CI/CD và staging.
- API public có kiểm soát.
- Tối ưu theo số liệu thực tế.
- Mở rộng thống kê và chức năng cá nhân hóa.

Bảo mật, test, logging và tài liệu phải làm xuyên suốt, không chờ đến giai đoạn cuối.

14. ƯU TIÊN MVP

**P0 — BẮT BUỘC**
- Danh mục xổ số.
- Danh mục đài và lịch quay.
- Quản lý kỳ quay/kết quả.
- Nhập dữ liệu và xác minh.
- Tra cứu kết quả theo ngày.
- Admin cơ bản.
- Database/migration.
- API cơ bản.
- Audit log cho chỉnh sửa kết quả.
- Kiểm thử quy tắc dữ liệu.
- Bảo mật cơ bản.
- Backup và logging.

**P1 — GIÁ TRỊ CỐT LÕI**
- Data ingestion tự động.
- Parser health check.
- Validation/reconciliation.
- Cảnh báo lỗi nguồn.
- Dò vé.
- Thống kê cơ bản.
- Kho lịch sử.
- Cache.
- Monitoring và dashboard vận hành.
- SEO cơ bản.

**P2 — MỞ RỘNG**
- Thống kê chuyên sâu.
- Xổ số điện toán đầy đủ.
- Tài khoản và yêu thích.
- Web Push/email.
- CMS nâng cao.
- Quảng cáo.
- API public nâng cao.
- Phân tích hành vi.
- Tối ưu hiệu năng theo tải.

15. TIÊU CHÍ NGHIỆM THU

DỮ LIỆU
- Kết quả không bị công bố khi thiếu trường bắt buộc.
- Không có bản ghi trùng theo khóa nghiệp vụ.
- Mọi kết quả đã công bố truy vết được nguồn và phiên bản.
- Đính chính không xóa lịch sử cũ.
- Dữ liệu bất thường được chuyển sang xác minh.
- Dữ liệu gốc và dữ liệu thống kê được phân biệt.

DATA INGESTION
- Parser có fixture regression test.
- Phát hiện được cấu trúc nguồn thay đổi.
- Có timeout, retry và giới hạn.
- Job chạy lại không tạo dữ liệu trùng.
- Có cảnh báo cho lỗi nghiêm trọng.
- Raw data được lưu theo chính sách.
- Không công bố khi parser thất bại hoặc validation không đạt.

TICKET CHECKER
- Kết quả đúng với bộ test đã xác minh.
- Hỗ trợ số 0 ở đầu.
- Xử lý đúng loại hình, ngày và đài.
- Không truy vấn database trong vòng lặp từng số.
- Không nhầm kết quả tạm thời với kết quả chính thức.
- Cache được cập nhật khi đính chính.
- Có benchmark cho một vé và nhiều vé.

THỐNG KÊ
- Công thức được định nghĩa và tài liệu hóa.
- Số liệu có thể tái tạo từ dữ liệu gốc.
- Đính chính kích hoạt tính lại dữ liệu liên quan.
- Kết quả hiển thị rõ phạm vi thời gian và số kỳ.

BẢO MẬT
- Kiểm tra quyền tại backend.
- Secret không xuất hiện trong log.
- API có validation và rate limit phù hợp.
- Endpoint quản trị không công khai trái phép.
- Có quy trình cập nhật dependency và xử lý lỗ hổng.

VẬN HÀNH
- Có health check và cảnh báo.
- Có backup định kỳ.
- Đã thử phục hồi backup.
- Có runbook xử lý nguồn lỗi, parser lỗi và job thất bại.
- CI chạy các quality gate bắt buộc.
- Có tài liệu deploy và rollback.

GIAO DIỆN
- Hoạt động trên mobile và desktop.
- Có loading/empty/error states.
- Kết quả có nguồn và trạng thái xác minh.
- URL ổn định, metadata SEO phù hợp.
- Không trình bày dữ liệu chưa xác minh như dữ liệu chính thức.

16. CÁC QUYẾT ĐỊNH CẦN CHỐT TRƯỚC KHI CODE

1. Danh sách loại hình xổ số và phạm vi kết quả sẽ hỗ trợ khi ra mắt.
2. Nguồn dữ liệu cụ thể, quyền sử dụng, điều khoản và phương án dự phòng.
3. Quy trình tự động công bố hay bắt buộc người duyệt.
4. ORM chính: Prisma hoặc TypeORM.
5. Công cụ queue/cache có cần ngay trong MVP hay bổ sung theo tải.
6. Có cần tách Admin thành ứng dụng Next.js riêng hay dùng chung ứng dụng web.
7. Chính sách tài khoản: tra cứu hoàn toàn công khai hay có tính năng thành viên.
8. Quy mô dữ liệu lịch sử ban đầu.
9. Mục tiêu hiệu năng và lưu lượng dự kiến.
10. Mục tiêu RPO/RTO và chính sách backup.
11. Nhà cung cấp triển khai và môi trường vận hành.
12. Kênh cảnh báo: Telegram, Email hay cả hai.
13. Chính sách lưu raw payload và dữ liệu cá nhân.
14. Bộ dữ liệu kiểm thử chuẩn và người chịu trách nhiệm xác minh.
15. Quy tắc SEO và URL chính thức.

Không nên bắt đầu scraping hàng loạt hoặc công bố dữ liệu tự động trước khi chốt nguồn và quy trình xác minh.

17. KẾT LUẬN

Dự án được định hướng là một nền tảng tra cứu xổ số Việt Nam theo kiến trúc module hóa, với độ tin cậy dữ liệu là ưu tiên hàng đầu. Nền tảng gồm website người dùng, Admin Dashboard, API, pipeline thu thập dữ liệu, hệ thống xác minh/công bố, engine dò vé, thống kê và nền tảng vận hành.

Thứ tự đúng là:
1. Chốt phạm vi và nguồn dữ liệu.
2. Thiết kế domain model, ERD và API contracts.
3. Xây nền tảng và quy trình quản lý kết quả.
4. Xây ingestion/validation có cảnh báo.
5. Xây dò vé và thống kê dựa trên dữ liệu đã xác minh.
6. Hoàn thiện trải nghiệm người dùng.
7. Kiểm thử, giám sát, backup và phát hành.
8. Mở rộng theo số liệu sử dụng thực tế.

Tài liệu này là đặc tả tổng thể cấp dự án, không thay thế đặc tả chi tiết của từng module. Trước khi triển khai mỗi module, cần bổ sung user stories, schema dữ liệu, API contract, quyền truy cập, luồng lỗi, test cases và tiêu chí nghiệm thu riêng.
