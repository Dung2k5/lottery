import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Quản Trị</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Trạng thái hệ thống</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">Bình thường</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Job cào dữ liệu</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">Đang chạy (3 jobs)</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Kết quả chờ xác minh</h3>
          <p className="text-2xl font-bold text-orange-600 mt-2">5 kết quả</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Lối tắt</h2>
        <Link href="/results" className="text-blue-600 hover:underline">
          Quản lý kết quả & Nhập liệu thủ công &rarr;
        </Link>
      </div>
    </div>
  );
}
