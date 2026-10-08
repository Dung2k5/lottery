export default function KetQuaPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Tra Cứu Kết Quả Xổ Số</h1>
      <div className="bg-white p-6 rounded-lg shadow border">
        <p className="text-gray-500">Đang chờ kết quả / Chưa đến giờ quay</p>
        {/* TODO: Add filter component and results table */}
      </div>
    </div>
  );
}
