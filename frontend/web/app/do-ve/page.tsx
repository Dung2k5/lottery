"use client";

import { useState } from 'react';

interface PrizeMatch {
  prizeCode: string;
  prizeName: string;
  winningNumber: string;
}

interface TicketResult {
  ticketNumber: string;
  isWinner: boolean;
  matches: PrizeMatch[];
}

interface CheckResponse {
  status: string;
  message?: string;
  drawInfo?: {
    lotteryName: string;
    stationName?: string;
    drawDate: string;
    status: string;
  };
  results?: TicketResult[];
}

export default function DoVeSoPage() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [regionCode, setRegionCode] = useState<string>('MB');
  const [ticketsInput, setTicketsInput] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<CheckResponse | null>(null);

  const handleCheck = async () => {
    // Validate tickets
    const tickets = ticketsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    if (tickets.length === 0) {
      setError('Vui lòng nhập ít nhất 1 số vé để dò.');
      return;
    }

    const invalidTickets = tickets.filter(t => !/^\d{2,6}$/.test(t));
    if (invalidTickets.length > 0) {
      setError(`Các vé sau không hợp lệ: ${invalidTickets.join(', ')}. Vé phải là chuỗi số từ 2 đến 6 chữ số.`);
      return;
    }

    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      // For simplicity, we are passing lotteryTypeCode mapping to regions.
      // E.g. MB -> XSMB, MT -> XSMT, MN -> XSMN
      // A full implementation would fetch stations/lotteryTypes, but for MVP we assume:
      const lotteryTypeCode = regionCode === 'MB' ? 'XSMB' : regionCode === 'MN' ? 'XSMN-HCM' : 'XSMT-DN';

      const res = await fetch('http://localhost:3001/api/v1/ticket-checker/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketNumbers: tickets,
          drawDate: date,
          lotteryTypeCode: lotteryTypeCode,
        })
      });

      if (!res.ok) {
        throw new Error('Lỗi kết nối tới máy chủ');
      }

      const data: CheckResponse = await res.json();
      setResponse(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Dò Vé Số Trúng Thưởng</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột Form Nhập Liệu */}
        <div className="bg-white p-6 rounded-xl shadow-lg border space-y-4 h-fit">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Miền / Đài</label>
            <select 
              value={regionCode}
              onChange={(e) => setRegionCode(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-2 focus:ring-blue-500"
            >
              <option value="MB">Miền Bắc (XSMB)</option>
              <option value="MN">TP. Hồ Chí Minh (XSMN)</option>
              <option value="MT">Đà Nẵng (XSMT)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Đang chọn loại hình mẫu cho MVP.</p>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ngày Quay</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nhập số vé</label>
            <textarea 
              value={ticketsInput}
              onChange={(e) => setTicketsInput(e.target.value)}
              placeholder="Nhập 1 số vé, hoặc nhiều vé cách nhau bằng dấu phẩy (VD: 01234, 56789)" 
              className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 h-24" 
            />
            <p className="text-xs text-gray-500 mt-1">Lưu ý: Giữ nguyên số 0 ở đầu nếu có (độ dài 2-6 số).</p>
          </div>
          
          <button 
            onClick={handleCheck}
            disabled={loading}
            className={`w-full text-white font-bold py-3 px-4 rounded-md transition text-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Đang tra cứu...' : 'Dò Kết Quả'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Cột Hiển Thị Kết Quả */}
        <div className="bg-gray-50 p-6 rounded-xl shadow border min-h-[400px]">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Kết Quả Tra Cứu</h2>
          
          {!response && !loading && (
            <div className="text-center text-gray-500 mt-10">
              <p>Hãy nhập thông tin và bấm &quot;Dò Kết Quả&quot; để tra cứu.</p>
            </div>
          )}

          {response && response.status !== 'SUCCESS' && (
            <div className="text-center mt-10 p-4 bg-yellow-100 text-yellow-800 rounded border border-yellow-200">
              <p className="font-bold">Chưa có kết quả chính thức</p>
              <p>{response.message}</p>
            </div>
          )}

          {response && response.status === 'SUCCESS' && response.results && (
            <div className="space-y-4">
              {response.results.map((ticket, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-2 shadow-sm ${ticket.isWinner ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-mono font-bold tracking-widest">{ticket.ticketNumber}</span>
                    {ticket.isWinner ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">TRÚNG GIẢI 🎉</span>
                    ) : (
                      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">Không trúng</span>
                    )}
                  </div>
                  
                  {ticket.isWinner && (
                    <ul className="mt-2 space-y-1">
                      {ticket.matches.map((match, i) => (
                        <li key={i} className="text-sm font-medium text-green-800">
                          🎯 Trúng {match.prizeName} (khớp {match.winningNumber})
                        </li>
                      ))}
                    </ul>
                  )}
                  {!ticket.isWinner && (
                    <p className="text-sm text-gray-500 italic mt-1">Chúc bạn may mắn lần sau!</p>
                  )}
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t text-sm text-gray-600 text-center">
                Dữ liệu thuộc kỳ quay: {response.drawInfo?.lotteryName} {response.drawInfo?.stationName ? `(${response.drawInfo.stationName})` : ''} - {response.drawInfo?.drawDate}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
