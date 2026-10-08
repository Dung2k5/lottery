export default function ThongKePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Thống Kê Tần Suất</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow border">
          <h2 className="font-semibold mb-4">Bộ Lọc</h2>
          {/* TODO: Add filters (Station, Date range) */}
          <div className="animate-pulse flex flex-col gap-2">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow border min-h-[400px]">
          <h2 className="font-semibold mb-4">Biểu đồ / Bảng Thống Kê</h2>
          <div className="flex items-center justify-center h-full text-gray-400">
            Dữ liệu trống hoặc đang tải...
          </div>
        </div>
      </div>
    </div>
  );
}
