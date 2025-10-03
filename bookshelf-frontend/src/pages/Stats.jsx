import { useState, useEffect } from 'react';
import { getStats } from '../api/books'; // nhớ map getStats -> gọi /yearlyStats
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Stats = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    fetchStats();
  }, [year]);

  const fetchStats = async () => {
    try {
      const { data } = await getStats({ year }); // gọi API getYearlyStats
      // data = [{month:1, books:3}, {month:2, books:5}, ...]

      // đảm bảo đủ 12 tháng (nếu tháng nào chưa có thì books = 0)
      const months = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        books: 0,
      }));

      data.forEach(item => {
        const idx = item.month - 1;
        if (months[idx]) {
          months[idx].books = item.books;
        }
      });

      // format lại cho Recharts
      const formatted = months.map(m => ({
        name: `Tháng ${m.month}`,
        books: m.books,
      }));

      setChartData(formatted);
      setTotalBooks(data.reduce((sum, m) => sum + m.books, 0));
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Thống kê đọc sách theo năm
      </h1>

      {/* Bộ lọc */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Chọn năm</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="year">Năm</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={fetchStats}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Áp dụng
        </Button>
      </div>

      {/* Kết quả */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4 text-lg">
          📚 Tổng số sách đã đọc trong năm {year}:
          <span className="font-semibold text-indigo-600"> {totalBooks}</span>
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="books" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
