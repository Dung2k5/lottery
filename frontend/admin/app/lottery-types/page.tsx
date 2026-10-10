'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Plus, Edit } from 'lucide-react';

interface LotteryType {
  id: string;
  code: string;
  name: string;
  category: string;
  isActive: boolean;
}

const API_URL = 'http://localhost:3001/api/v1';

export default function LotteryTypesPage() {
  const [types, setTypes] = useState<LotteryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/lottery-types`);
      setTypes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      await axios.patch(`${API_URL}/lottery-types/${id}`, { isActive: !current });
      fetchTypes();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-4">Đang tải...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý loại hình xổ số</h1>
        <Link href="/lottery-types/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
          <Plus size={16} /> Thêm mới
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Mã</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Nhóm</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {types.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">Chưa có dữ liệu</td>
              </tr>
            ) : (
              types.map(type => (
                <tr key={type.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{type.code}</td>
                  <td className="p-4">{type.name}</td>
                  <td className="p-4">{type.category}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(type.id, type.isActive)}
                      className={`px-3 py-1 rounded-full text-sm ${type.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {type.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </button>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/lottery-types/${type.id}`} className="text-blue-600 hover:underline flex items-center gap-1">
                      <Edit size={16} /> Sửa
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
