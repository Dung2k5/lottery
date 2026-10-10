"use client";

import { useState, useEffect } from 'react';

interface PrizeResult {
  id: string;
  prizeName: string;
  winningNumbers: string[];
}

interface DrawData {
  id: string;
  drawDate: string;
  status: string;
  station?: { name: string };
  lotteryType?: { name: string };
  results: PrizeResult[];
}

export default function KetQuaPage() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [regionCode, setRegionCode] = useState<string>('MB');
  const [data, setData] = useState<DrawData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3001/api/v1/draws/by-date?date=${date}&regionCode=${regionCode}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [date, regionCode]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Tra Cứu Kết Quả Xổ Số</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div>
          <label className="mr-2 font-semibold">Chọn ngày:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        
        <div className="flex bg-gray-200 rounded p-1">
          {['MB', 'MT', 'MN'].map(region => (
            <button
              key={region}
              className={`px-4 py-2 rounded ${regionCode === region ? 'bg-red-500 text-white font-bold' : 'hover:bg-gray-300'}`}
              onClick={() => setRegionCode(region)}
            >
              Miền {region === 'MB' ? 'Bắc' : region === 'MT' ? 'Trung' : 'Nam'}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {loading && <p className="text-center text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {/* Results */}
      {!loading && !error && data.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow border text-center">
          <p className="text-gray-500">Chưa có kết quả hoặc không có lịch quay cho ngày này.</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(draw => (
            <div key={draw.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white p-3 text-center">
                <h2 className="text-xl font-bold">{draw.station?.name || draw.lotteryType?.name}</h2>
                <p className="text-sm">Ngày quay: {new Date(draw.drawDate).toLocaleDateString('vi-VN')}</p>
                {draw.status === 'REVISED' && (
                  <span className="inline-block mt-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded">Đã Đính Chính</span>
                )}
              </div>
              
              <table className="w-full text-center border-collapse">
                <tbody>
                  {draw.results.map((prize) => (
                    <tr key={prize.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-bold text-red-600 w-1/3 border-r">{prize.prizeName}</td>
                      <td className="p-2 w-2/3">
                        <div className="flex flex-wrap justify-center gap-2">
                          {prize.winningNumbers.map((num: string, idx: number) => (
                            <span key={idx} className="font-mono text-lg font-bold">{num}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
