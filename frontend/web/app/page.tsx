import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Kết Quả Xổ Số Hôm Nay</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/ket-qua/mien-bac" className="p-4 border rounded-lg shadow hover:bg-gray-50 flex justify-center text-lg font-medium text-red-600">
          Miền Bắc
        </Link>
        <Link href="/ket-qua/mien-trung" className="p-4 border rounded-lg shadow hover:bg-gray-50 flex justify-center text-lg font-medium text-green-600">
          Miền Trung
        </Link>
        <Link href="/ket-qua/mien-nam" className="p-4 border rounded-lg shadow hover:bg-gray-50 flex justify-center text-lg font-medium text-blue-600">
          Miền Nam
        </Link>
        <Link href="/ket-qua/dien-toan" className="p-4 border rounded-lg shadow hover:bg-gray-50 flex justify-center text-lg font-medium text-purple-600">
          Điện Toán
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/do-ve" className="p-8 bg-blue-50 border border-blue-200 rounded-xl flex flex-col items-center justify-center hover:bg-blue-100 transition-colors shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">Dò Vé Số</h2>
          <p className="text-gray-700 text-center text-lg">Nhập số vé của bạn để kiểm tra kết quả trúng thưởng nhanh chóng và chính xác.</p>
        </Link>
        <Link href="/thong-ke" className="p-8 bg-green-50 border border-green-200 rounded-xl flex flex-col items-center justify-center hover:bg-green-100 transition-colors shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-green-800">Thống Kê</h2>
          <p className="text-gray-700 text-center text-lg">Xem tần suất lô tô, biểu đồ kết quả các đài, dự đoán số liệu chuyên sâu.</p>
        </Link>
      </div>
    </main>
  );
}
