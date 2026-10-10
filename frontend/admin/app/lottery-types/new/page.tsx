'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export default function NewLotteryTypePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'MIEN_BAC',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/lottery-types`, formData);
      router.push('/lottery-types');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Có lỗi xảy ra');
      } else {
        alert('Có lỗi xảy ra');
      }
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/lottery-types" className="text-gray-500 hover:underline">← Quay lại</Link>
        <h1 className="text-2xl font-bold mt-2">Thêm loại hình xổ số</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Mã loại hình *</label>
          <input required type="text" className="w-full border p-2 rounded" 
            value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} 
            placeholder="VD: XSMB" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Tên loại hình *</label>
          <input required type="text" className="w-full border p-2 rounded" 
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="VD: Xổ số miền Bắc" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nhóm *</label>
          <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="MIEN_BAC">Miền Bắc</option>
            <option value="MIEN_TRUNG">Miền Trung</option>
            <option value="MIEN_NAM">Miền Nam</option>
            <option value="DIEN_TOAN">Điện toán</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea className="w-full border p-2 rounded" rows={3}
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700">
          Lưu
        </button>
      </form>
    </div>
  );
}
