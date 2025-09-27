import { useState, useEffect } from 'react';
import { getStats } from '../api/books';

const Stats = () => {
  const [booksRead, setBooksRead] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchStats();
  }, [month, year]);

  const fetchStats = async () => {
    const { data } = await getStats({ month, year });
    setBooksRead(data.booksRead);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Thống kê</h1>
      <div>
        <label>Tháng: <input type="number" value={month} onChange={e => setMonth(e.target.value)} min="1" max="12" /></label>
        <label>Năm: <input type="number" value={year} onChange={e => setYear(e.target.value)} /></label>
        <button onClick={fetchStats}>Áp dụng</button>
      </div>
      <p>Số sách đã đọc trong tháng: {booksRead}</p>
      {/* Thêm biểu đồ nếu cần */}
    </div>
  );
};

export default Stats;