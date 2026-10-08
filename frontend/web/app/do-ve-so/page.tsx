export default function DoVeSoPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Dò Vé Số Trúng Thưởng</h1>
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chọn Đài</label>
          <select className="w-full border-gray-300 rounded-md shadow-sm p-2 border">
            <option>Miền Bắc</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Hà Nội</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày Quay</label>
          <input type="date" className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhập số vé (Ví dụ: 01234)</label>
          <input type="text" placeholder="Nhập dãy số trên vé" className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
          <p className="text-xs text-gray-500 mt-1">Lưu ý: Giữ nguyên số 0 ở đầu nếu có.</p>
        </div>
        <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition">
          Dò Kết Quả
        </button>
      </div>
    </div>
  );
}
